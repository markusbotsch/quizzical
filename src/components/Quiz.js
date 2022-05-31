import React from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';

import Question from './Question';


export default function Quiz(props) {

    const [isLoaded, setIsLoaded] = React.useState(false);
    const [quizData, setQuizData] = React.useState([]);
    const [checkAnswersClicked, setCheckAnswersClicked] = React.useState(false);
    const [numberOfAnswers, setNumberOfAnswers] = React.useState(0);
    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = React.useState(0);


    // get questions and answers from Open Trivia Database
    React.useEffect(() => {
        if(!props.gameStarted) return;

        axios.get(`https://opentdb.com/api.php?amount=5&difficulty=${props.difficulty}&type=multiple`)
            .then(response => setupData(response.data.results))
            .then(data => setQuizData(data))
            .then(setTimeout(() => setIsLoaded(true), 500))
            .catch((e) => console.error(e))
    },[props.gameStarted])
    
    // keep track of number of given and correct answers
    React.useEffect(() => {
            // determine number of given answers to active "Check answers"-button
            const currentAnswers = quizData.filter(question => question.selectedAnswer != "");
            setNumberOfAnswers(currentAnswers.length);

            // determine number of correct answers 
            let currentCorrectAnswers = 0;
            quizData.forEach(question => {
                if(question.selectedAnswer == question.correctAnswer) currentCorrectAnswers += 1;
            })
            setNumberOfCorrectAnswers(currentCorrectAnswers)
    }, [quizData])


    // setup game data
    function setupData(fetchedData) {
        return fetchedData.map(item => {
            // create array with all answers and correct answer and shuffle it
            const allAnswers = item.incorrect_answers.concat(item.correct_answer).sort(() => Math.random() - 0.5);

            return ({ 
                id: nanoid(),
                question: item.question,
                correctAnswer: item.correct_answer,
                allAnswers: allAnswers,
                selectedAnswer: ""
            })
        })
    }

    // store selected answer in quizData
    function answerSelected(event) {
        const { name, value } = event.target;

        setQuizData(prevQuizData => prevQuizData.map(question => question.id == name ? {...question, selectedAnswer: value } : question))
    }

    // Check answers rsp. start new game
    function handleSubmit(event) {
        event.preventDefault();
        if (checkAnswersClicked) {
            setCheckAnswersClicked(false)
            setNumberOfAnswers(0);
            props.setGameStarted(false);
            return
        }
        setCheckAnswersClicked(true);
    }

    // create question elements
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

    if (!isLoaded) return <p>Loading...</p>

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