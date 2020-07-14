use mongodb::sync::Client;
use serde::Serialize;

#[derive(Serialize)]
pub struct FileStruct {
    pub id: String,
    pub filename: String,
    pub note: String,
}

pub fn insert_file(id: &str, filename: &str, note: &str) -> FileStruct {
    let client = Client::with_uri_str("mongodb+srv://nyoung:adCwurizymP7Ljg7@droppy.5ko1h.mongodb.net/droppy?retryWrites=true&w=majority").unwrap();
    let collection = client.database("droppy").collection("files");
    let object = doc! {
        "_id": id,
        "filename": filename,
        "note": note,
    };
    collection.insert_one(object, None).unwrap();
    let metadata = get_file_metadata(id);
    metadata
}

pub fn delete_file(id: &str) -> FileStruct {
    let client = Client::with_uri_str("mongodb+srv://nyoung:adCwurizymP7Ljg7@droppy.5ko1h.mongodb.net/droppy?retryWrites=true&w=majority").unwrap();
    let collection = client.database("droppy").collection("files");
    let object = doc! {"_id": id};
    let metadata = get_file_metadata(id);
    collection.delete_one(object, None).unwrap();
    metadata
}

pub fn get_file_metadata(id: &str) -> FileStruct {
    let client = Client::with_uri_str("mongodb+srv://nyoung:adCwurizymP7Ljg7@droppy.5ko1h.mongodb.net/droppy?retryWrites=true&w=majority").unwrap();
    let collection = client.database("droppy").collection("files");
    let object = doc! {"_id": id};
    let result = collection.find_one(object, None).unwrap().unwrap();
    FileStruct {
        id: result.get("_id").unwrap().to_string(),
        filename: result.get("filename").unwrap().to_string(),
        note: result.get("note").unwrap().to_string(),
    }
}
