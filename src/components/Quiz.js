import React from 'react';
import { nanoid } from 'nanoid';

import data from '../data';
import Question from './Question';


export default function Quiz() {

    const setup = data.map(item => {
        
        // create array with all answers and correct answer at random position
        const allAnswers = item.incorrect_answers.concat(item.correct_answer).sort(() => Math.random() - 0.5);
        
        return ({ 
            id: nanoid(),
            question: item.question,
            correctAnswer: item.correct_answer,
            allAnswers: allAnswers,
            selectedAnswer: ""
    })});

    const [quizData, setQuizData] = React.useState(setup);
    const [checkAnswersClicked, setCheckAnswersClicked] = React.useState(false);
    const [numberOfAnswers, setNumberOfAnswers] = React.useState(0);
    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = React.useState(0);

    const questionElements = quizData.map(item => 
        <Question 
            key={item.id} 
            id={item.id} 
            question={item.question} 
            allAnswers={item.allAnswers}
            correctAnswer={item.correctAnswer}
            handleInput={answerSelected}
            checkAnswersClicked={checkAnswersClicked}
        />);


    function answerSelected(event) {
        const { name, value } = event.target;

        setQuizData(prevQuizData => prevQuizData.map(question => question.id == name ? {...question, selectedAnswer: value } : question))
    }

    React.useEffect(() => {
        const currentAnswers = quizData.filter(question => question.selectedAnswer != "");
        setNumberOfAnswers(currentAnswers.length);

        let currentCorrectAnswers = 0;

        quizData.forEach(question => {
            if(question.selectedAnswer == question.correctAnswer) currentCorrectAnswers += 1;
        })
        
        setNumberOfCorrectAnswers(currentCorrectAnswers)
    }, [quizData])


    function handleSubmit(event) {
        event.preventDefault();
        if (checkAnswersClicked) {
            setCheckAnswersClicked(false)
            setQuizData(setup);
            setNumberOfAnswers(0);
            return
        }
        setCheckAnswersClicked(true);
    }


    return(
        <div className="question-section">
            <form onSubmit={handleSubmit}>
            {questionElements}
            <div className="question-submit">
                {checkAnswersClicked ? <span>{`You scored ${numberOfCorrectAnswers}/5 correct answers`}</span> : ""}
                <button className="button-check" disabled={numberOfAnswers < 5}>
                    {checkAnswersClicked ? "Play again" : "Check answers"}
                </button>
            </div>
            </form>
        </div>
        
    )
}