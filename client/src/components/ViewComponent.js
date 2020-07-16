import React, { useState, useEffect } from "react";
const axios = require("axios");

const ViewComponent = props => {
    const id = props.match.params.id;
    const [filename, setFilename] = useState("Loading...");
    const [note, setNote] = useState("");

    const handleDownload = () => {
        fetch(`http://localhost:8000/download/${id}`).then(response => {
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
        axios.get(`http://localhost:8000/view/${id}`).then(e => {
            setFilename(e.data.filename);
            setNote(e.data.note);
        });
    });

    return (
        <div className="view">
            <h2>File: {filename}</h2>
            <br />
            <p>Note: {note}</p>
            <button onClick={handleDownload}>Download {filename}</button>
        </div>
    );
};

export default ViewComponent;
