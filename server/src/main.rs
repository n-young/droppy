#![feature(decl_macro)]

#[macro_use]
extern crate bson;
extern crate mongodb;

mod app;
mod buckets;
mod db;
mod tokenize;

#[tokio::main]
async fn main() {
    app::start_server().launch();
}
