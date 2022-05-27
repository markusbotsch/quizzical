import React from 'react';

import blueBlob from './images/blob-blue.svg';
import yellowBlob from './images/blob-yellow.svg';

import Start from './components/Start';
import Quiz from './components/Quiz';

function App() {

  const [gameStarted, setGameStarted] = React.useState(false);

  function startGame() {
    setGameStarted(true);
  }

  return (
    <div className="App">
      <div className="yellowBlob">
        <img src={yellowBlob} />
      </div>
      <div className="blueBlob">
        <img src={blueBlob} />
      </div>
      {gameStarted ? <Quiz /> : <Start handleInput={startGame}/>}
      <div className="yellowBlob">
        <img src={yellowBlob} />
      </div>
      <div className="blueBlob">
        <img src={blueBlob} />
      </div>
    </div>
  );
}

export default App;
