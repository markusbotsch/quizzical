import React from 'react';

export default function Start(props) {

    return (
        <div className="start-screen">
            <h1>Quizzical</h1>
            <p>Select difficulty</p>
            <button className="button-start" onClick={props.handleInput}>Start quiz</button>
        </div>
    )
    
}