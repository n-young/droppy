import React from "react";

const ViewComponent = props => {
    const id = props.match.params.id;

    //TODO: Get data of thing from ID
    const { note, create_date, expire_date, filename } = {
        note: "this is a note",
        create_date: new Date(Date.now()),
        expire_date: new Date(Date.now()),
        filename: "filename.png",
    };

    return (
        <div className="view">
            <h2>File: {filename}</h2>
            <p>Created: {create_date.toDateString()}</p>
            <p>Will Expire: {expire_date.toDateString()}</p>
            <br />
            <p>Note: {note}</p>
            <button>Download {filename}</button>
        </div>
    );
};

export default ViewComponent;
