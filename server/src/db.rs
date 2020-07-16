use dotenv;
use mongodb::sync::Client;
use serde::Serialize;

#[derive(Serialize)]
pub struct FileStruct {
    pub id: String,
    pub filename: String,
    pub filetype: String,
    pub note: String,
}

fn get_collection() -> mongodb::sync::Collection {
    let client = Client::with_uri_str(&dotenv::var("MONGO_URI").unwrap()).unwrap();
    client.database("droppy").collection("files")
}

pub fn get_file_metadata(id: &str) -> FileStruct {
    let collection = get_collection();
    let object = doc! {"_id": id};
    let result = collection.find_one(object, None).unwrap().unwrap();
    FileStruct {
        id: result.get("_id").unwrap().to_string(),
        filename: result.get("filename").unwrap().to_string(),
        filetype: result.get("filetype").unwrap().to_string(),
        note: result.get("note").unwrap().to_string(),
    }
}

pub fn insert_file(id: &str, filename: &str, filetype: &str, note: &str) -> FileStruct {
    let collection = get_collection();
    let object = doc! {
        "_id": id,
        "filename": filename,
        "filetype": filetype,
        "note": note,
    };
    collection.insert_one(object, None).unwrap();
    let metadata = get_file_metadata(id);
    metadata
}

pub fn delete_file(id: &str) -> FileStruct {
    let collection = get_collection();
    let object = doc! {"_id": id};
    let metadata = get_file_metadata(id);
    collection.delete_one(object, None).unwrap();
    metadata
}
