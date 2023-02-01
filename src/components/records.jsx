import React from "react";
import { useState, useEffect } from "react";


function Records() {

    const [recordList, setRecordList] = useState([]);

    // Request to the backend API.
    useEffect(() => {
        //fetch('http://localhost:3001/API/get-records')
        fetch('/API/get-records')
        .then((response) => response.json())
        .then(data => {
            // Top 5 records.
            setRecordList(data)
        });       
    }, [recordList]);

    return(
        <div className="records-area">
            <h3>Records</h3>
            {recordList.map((record) => {
                return(
                    <div key={record._id}>
                        <p>{record.name} </p>
                        <p> {record.score}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Records;