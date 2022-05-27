import React from 'react';
import he from 'he';
export default function Question(props) {

    const answerElements = props.allAnswers.map((answer, index) =>  {
        return (
        <React.Fragment key={index}>
            <input 
                type="radio" 
                name={props.id} 
                id={answer} 
                value={answer}
                onChange={props.handleInput}
            />
            <label htmlFor={answer}>{he.decode(answer)}</label> 
        </React.Fragment>
    )
    });
 
    return (
        <div className="question">
            <h3>{he.decode(props.question)}</h3>
            {answerElements}
            <hr />
        </div>
    )
}