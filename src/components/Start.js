import React from 'react';

export default function Start(props) {

    return (
        <div className="start-screen">
            <h1>Quizzical</h1>
            <p>Select difficulty</p>
            <div className="difficulty-section">
                <input 
                    type="radio"
                    name="difficulty"
                    id="easy"
                    value="easy"
                    checked={props.difficulty === "easy"}
                    onChange={() => props.changeDifficulty("easy")}
                />
                <label htmlFor='easy'>easy</label>
                <input 
                    type="radio"
                    name="difficulty"
                    id="medium"
                    value="medium"
                    checked={props.difficulty === "medium"}
                    onChange={() => props.changeDifficulty("medium")}
                />
                <label htmlFor='medium'>medium</label>
                <input 
                    type="radio"
                    name="difficulty"
                    id="hard"
                    value="hard"
                    checked={props.difficulty === "hard"}
                    onChange={() => props.changeDifficulty("hard")}
                />
                <label htmlFor='hard'>hard</label>
            </div>
            
            <button className="button-start" onClick={props.startGame}>Start quiz</button>
        </div>
    )
    
}