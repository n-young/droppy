import React, { useState, useEffect } from "react";
import { API_URL } from "../constants/API_URL";
import { APP_URL } from "../constants/APP_URL";
const axios = require("axios");

const ViewComponent = props => {
    const id = props.match.params.id;
    const [filename, setFilename] = useState("Loading...");
    const [note, setNote] = useState("");

    const handleDownload = () => {
        fetch(`${API_URL}/download/${id}`).then(response => {
            response.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement("a");
                a.href = url;
                a.download = filename.substring(1, filename.length - 1);
                a.click();
            });
        });
    };

    useEffect(() => {
        axios
            .get(`${API_URL}/view/${id}`)
            .then(e => {
                console.log("A");
                setFilename(e.data.filename);
                setNote(e.data.note);
            })
            .catch(e => {
                setFilename("File not found.");
            });
    });

    return (
        <div className="view">
            <h2>File: {filename}</h2>
            <h3>
                Share this link to your file!{" "}
                <a href={`${APP_URL}/view/${id}`}>
                    {APP_URL}/view/{id}
                </a>
            </h3>
            <br />
            <p>Note: {note}</p>
            <button onClick={handleDownload}>Download {filename}</button>
        </div>
    );
};

export default ViewComponent;
