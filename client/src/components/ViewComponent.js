import React from "react";
const axios = require("axios");

const ViewComponent = props => {
    const data = axios
        .get(`http://localhost:8000/view/${props.match.params.id}`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        })
        .then(console.log);
    const { id, filename, note } = data;

    return (
        <div className="view">
            <h2>File: {filename}</h2>
            <br />
            <p>Note: {note}</p>
            <button>Download {filename}</button>
        </div>
    );
};

export default ViewComponent;
