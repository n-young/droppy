use rocket::http::ContentType;
use rocket::response::Stream;
use rocket::Data;
use rocket_contrib::json::Json;
use rocket_multipart_form_data::{
    mime, MultipartFormData, MultipartFormDataField, MultipartFormDataOptions,
};
use std::io::Cursor;

use crate::buckets;
use crate::db;
use crate::tokenize;

#[rocket::get("/")]
fn health() -> &'static str {
    "Backend api is up!"
}

#[rocket::get("/view/<id>")]
fn view(id: String) -> Json<db::FileStruct> {
    let res = db::get_file_metadata(&id);
    Json(res)
}

#[rocket::get("/download/<id>")]
fn download(id: String) -> Stream<Cursor<Vec<u8>>> {
    let (data, _) = buckets::get_file(&id);
    Stream::from(Cursor::new(data))
}

#[rocket::post("/create", data = "<data>")]
fn create(content_type: &ContentType, data: Data) -> Json<db::FileStruct> {
    // Set the form format
    let options = MultipartFormDataOptions::with_multipart_form_data_fields(vec![
        MultipartFormDataField::file("file")
            .content_type_by_string(Some(mime::STAR_STAR))
            .unwrap(),
        MultipartFormDataField::text("note"),
    ]);

    // Get data from the form
    let mut multipart_form_data = MultipartFormData::parse(content_type, data, options).unwrap();
    let file = multipart_form_data.files.get("file");
    let note = multipart_form_data.texts.remove("note");

    // Extracting data
    let file_field = &file.unwrap()[0];
    let filetype = file_field.content_type.as_ref().unwrap();
    let filename = file_field.file_name.as_ref().unwrap();
    let a = format!("{:?}", &file_field.path);
    let path = &a[1..a.len() - 1];

    let note_field = note.unwrap().remove(0);
    let notetext = note_field.text;

    // Create an id and put file in s3, then db
    let id = tokenize::create_unique_id(30);
    buckets::put_file(&path, &id, &format!("{:?}", &filetype));
    let res = db::insert_file(&id, &filename, &notetext);
    Json(res)
}

#[rocket::post("/delete/<id>")]
fn delete(id: String) -> Json<db::FileStruct> {
    buckets::delete_file(&id);
    let res = db::delete_file(&id);
    Json(res)
}

pub fn start_server() -> rocket::Rocket {
    rocket::ignite().mount("/", rocket::routes![health, view, create, download, delete])
}
