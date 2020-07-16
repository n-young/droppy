use dotenv;
use s3::bucket::Bucket;
use s3::credentials::Credentials;
use std::fs;

struct S3Config {
    bucket_name: String,
    aws_access: String,
    aws_secret: String,
    region: s3::region::Region,
}

fn get_bucket() -> s3::bucket::Bucket {
    let config = S3Config {
        bucket_name: "n-young-droppy".to_string(),
        aws_access: dotenv::var("AWS_ACCESS").unwrap(),
        aws_secret: dotenv::var("AWS_SECRET").unwrap(),
        region: "us-east-2".parse().unwrap(),
    };
    let credentials: Credentials =
        Credentials::new(Some(config.aws_access), Some(config.aws_secret), None, None);
    Bucket::new(&config.bucket_name, config.region, credentials)
}

pub fn put_file(path: &str, filename: &str, filetype: &str) {
    let bucket = get_bucket();
    let file: Vec<u8> = fs::read(path).unwrap();
    bucket.put(filename, &file, filetype).unwrap();
}

pub fn get_file(key: &str) -> (std::vec::Vec<u8>, u32) {
    let bucket = get_bucket();
    bucket.get(key).unwrap()
}

pub fn delete_file(key: &str) {
    let bucket = get_bucket();
    bucket.delete(key).unwrap();
}
