import React, {useState, useEffect} from "react";

function GameOver(score) {

    const [beatRecord, setBeatRecord] = useState(false);
    const [record, setRecord] = useState(0);
    const [username, setUsername] = useState('');


    // Request to the backend API.
    useEffect(() => {
        //fetch('http://localhost:3001/API/get-records')
        fetch('/API/get-records')
        
        .then((response) => response.json())
        .then(recordList => {
        
            if (recordList.length >= 5) {
                // More than 5 users, check if any record has been beated. 
                const lowestRecord = recordList.slice(-1)[0];

                if (score.score > lowestRecord.score) {
                    setBeatRecord(true);
                    setRecord(score.score);
                }

            } else {
                // Less than 5 users, store in db.
                setBeatRecord(true);
                setRecord(score.score);
            }
        })
        .catch(error => {
            console.log(error);
        });       
    }, [score.score]);

    // Save button click. Save record to DB.
    const onFormSubmit = event => {
        event.preventDefault();
        saveToDB(username, record);
        score.onClick();
    }
    // Send POST to API to save in DB.
    function saveToDB(username, score) {
    
        const bodyParameters = {
            name: username,
            score: score,
        }
            
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyParameters)
        };
        // Sending request to backend.
        //fetch('http://localhost:3001/API/post-record', requestOptions)
        fetch('/API/post-record', requestOptions)

        .catch((error) => {
            console.error(error);
        });
    }


    return(
        <div className="game-over">
            {beatRecord && (
                <div>
                    <h2>New Record!</h2>
                    <p className="score" >Score: {score.score} </p>
                    <form onSubmit={onFormSubmit}>
                        <input placeholder="Enter Name..." maxLength="12" onChange={(e)=> {
                            setUsername(e.target.value)
                        }}></input>
                        
                        {beatRecord && username && (
                            <button type="submit">Save Record</button>
                        )}
                    </form>

                </div>
            )}
            {!beatRecord && (
                <div>
                    <p className="score">Score: {score.score} </p>
                    <button onClick={score.onClick}>Play Again</button>
                </div>
            )}
        </div>
    )
}

export default GameOver;