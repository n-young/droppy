import React from "react";

const HomeComponent = props => {
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
            <form action="/hello" method="POST" className="form">
                <input type="file" name="label" />
                <label for="note">Note: </label>
                <textarea rows="4" name="note" />
                <button>Upload</button>
            </form>
        </div>
    );
};

export default HomeComponent;
