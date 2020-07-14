import React from "react";
const axios = require("axios");

const HomeComponent = props => {
    const handleSubmit = e => {
        axios.post("http://localhost:8000/create");
    };

    return (
        <div className="home">
            <h2>What is Droppy?</h2>
            <p>
                Droppy is a tool that helps you share files with ease. Simply
                drop your file into the form below, tweak a few settings, and
                then have a unique link to your file generated for you!
            </p>
            <hr />
            <h2>Upload a File</h2>
            <form
                className="form"
                action="http://localhost:8000/create"
                method="POST"
                enctype="multipart/form-data"
            >
                <input type="file" name="file" />
                <label for="note">Note: </label>
                <textarea rows="10" name="note" />
                <button>Upload</button>
            </form>
            <hr />
        </div>
    );
};

export default HomeComponent;
