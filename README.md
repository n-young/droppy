# 📦 Droppy

Author: Nick Young

## What is Droppy?

Droppy is an online service that makes file sharing simple again. Simply upload a file, and we generate a unique link to download your file that you can share to others! Moreover, you can password protect your file, set an expiration date, and attach a note to the recipient!

Frontend is powered by React and deployed on Netlify. Backend is written in Rust and deployed on GCP Cloud Run. Files are stored in AWS S3.

## Getting Started (Client)

First, ensure that you have the latest versions of Node.js, Yarn, and React installed on your machine. This project uses Yarn as a package manager instead of npm. After installing dependencies by running `yarn`, you can serve an instance of the app from your device by running `yarn start`. To build the project, just run `yarn build` in the root directory.

## Getting Started (Server)

First, install Rust. Next, ensure you have the Nightly version of Rust enabled using `rustup override set nightly`. Then, run `cargo run` will start a webserver on port 8080 that you can test using Graphiql.

## Contributing

Feel free to submit a pull request introducing or fixing features!
