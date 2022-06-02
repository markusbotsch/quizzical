import React from 'react';

import blueBlob from './images/blob-blue.svg';
import yellowBlob from './images/blob-yellow.svg';

import Start from './components/Start';
import Quiz from './components/Quiz';

function App() {

  const [gameStarted, setGameStarted] = React.useState(false);
  const [difficulty, setDifficulty]  = React.useState("medium")

  function startGame() {
    setGameStarted(true);
  }

  function changeDifficulty(newDifficulty) {
    setDifficulty(newDifficulty);
  }

  return (
    <div className="App">
      {gameStarted ? 
        <Quiz gameStarted={gameStarted} difficulty={difficulty} setGameStarted={setGameStarted} /> : 
        <Start difficulty={difficulty} startGame={startGame} changeDifficulty={changeDifficulty}/>}
      <div className="yellowBlob">
        <img src={yellowBlob} alt=""/>
      </div>
      <div className="blueBlob">
        <img src={blueBlob} alt=""/>
      </div>
    </div>
  );
}

export default App;
