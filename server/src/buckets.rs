use s3::bucket::Bucket;
use s3::credentials::Credentials;
use std::fs;

pub fn put_file(path: &str, filename: &str, filetype: &str) {
    // Set up config
    let bucket_name = "n-young-droppy";
    let aws_access = "AKIAINQNB6HMBIRCCQHQ";
    let aws_secret = "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";
    let region = "us-east-2".parse().unwrap();
    let credentials: Credentials = Credentials::new(
        Some(aws_access.to_string()),
        Some(aws_secret.to_string()),
        None,
        None,
    );
    let bucket = Bucket::new(bucket_name, region, credentials);

    // Read and put file
    let file: Vec<u8> = fs::read(path).unwrap();
    bucket.put(filename, &file, filetype).unwrap();
}

pub fn get_file(key: &str) -> (std::vec::Vec<u8>, u32) {
    // Set up config
    let bucket_name = "n-young-droppy";
    let aws_access = "AKIAINQNB6HMBIRCCQHQ";
    let aws_secret = "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";
    let region = "us-east-2".parse().unwrap();
    let credentials: Credentials = Credentials::new(
        Some(aws_access.to_string()),
        Some(aws_secret.to_string()),
        None,
        None,
    );
    let bucket = Bucket::new(bucket_name, region, credentials);
    bucket.get(key).unwrap()
}

pub fn delete_file(key: &str) {
    // Set up config
    let bucket_name = "n-young-droppy";
    let aws_access = "AKIAINQNB6HMBIRCCQHQ";
    let aws_secret = "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";
    let region = "us-east-2".parse().unwrap();
    let credentials: Credentials = Credentials::new(
        Some(aws_access.to_string()),
        Some(aws_secret.to_string()),
        None,
        None,
    );
    let bucket = Bucket::new(bucket_name, region, credentials);
    bucket.delete(key).unwrap();
}
