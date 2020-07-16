import React from "react";
import { API_URL } from "../constants/API_URL";

const HomeComponent = props => {
    const handleSubmit = e => {
        e.preventDefault();
        var data = new FormData();
        var filedata = document.querySelector('input[type="file"]').files[0];
        var note = document.querySelector("textarea").value;
        data.append("file", filedata, filedata.name);
        data.append("note", note);

        fetch(`${API_URL}/create`, {
            method: "POST",
            body: data,
            headers: {
                Accept: "application/json",
            },
        }).then(res => {
            res.json().then(data => {
                let id = data.id.substring(1, data.id.length - 1);
                props.history.push(`/view/${id}`);
            });
        });
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
            <form className="form" onSubmit={handleSubmit}>
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
