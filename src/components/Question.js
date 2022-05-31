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
                disabled={props.checkAnswersClicked}
            />
            <label 
                htmlFor={answer} 
                style={props.checkAnswersClicked && answer == props.correctAnswer ? {backgroundColor: "#94D7A2", border: "1px solid #94D7A2"} : {}}
            >
                {he.decode(answer)}
            </label> 
        </React.Fragment>
    )
    });
 
    return (
        <div className={props.checkAnswersClicked ? "question-check" : "question"}>
            <h3>{he.decode(props.question)}</h3>
            {answerElements}
            <hr />
        </div>
    )
}