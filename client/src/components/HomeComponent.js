import React, { useState } from "react";
import { API_URL } from "../constants/API_URL";

const HomeComponent = props => {
    const [filename, setFilename] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
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
        })
            .then(res => {
                res.json().then(data => {
                    let id = data.id.substring(1, data.id.length - 1);
                    props.history.push(`/view/${id}`);
                    setLoading(false);
                });
            })
            .catch(e => {
                alert("File upload failed. Please try again,");
                setLoading(false);
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
                <label class="custom-date">Choose a file</label>
                <br />
                <label for="file" class="custom-file">
                    {filename || "Upload File"}
                    <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={e => setFilename(e.target.value)}
                        required
                    />
                </label>

                {/* <label>Set a password (optional)</label>
                <br />
                <input
                    type="password"
                    name="password"
                    placeholder="Password protect your file (optional)"
                />
                <label>Set an expiration date (optional)</label>
                <br />
                <input type="datetime-local" id="date" name="date" /> */}

                <label>Write a note (optional)</label>
                <br />
                <textarea
                    rows="15"
                    name="note"
                    placeholder="Write a note (optional)"
                />
                <button disabled={loading}>
                    {loading && (
                        <i
                            className="fa fa-refresh fa-spin"
                            style={{ marginRight: "5px" }}
                        />
                    )}
                    {loading && <span>Loading...</span>}
                    {!loading && <span>Upload File</span>}
                </button>
            </form>
        </div>
    );
};

export default HomeComponent;
