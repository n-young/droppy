#![feature(decl_macro)]

#[macro_use]
extern crate bson;
extern crate mongodb;

use dotenv;

mod app;
mod buckets;
mod db;
mod tokenize;

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();
    app::start_server().launch();
}
