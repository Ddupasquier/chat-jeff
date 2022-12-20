import React, { useContext, useRef, useEffect } from 'react';
import 'App.scss';

import { GameContext } from 'contexts/GameContext';
import Input from 'components/MainForm';
import Connecting from 'components/Connecting';

function App() {
  const { gameState, setGameState, glitching, game } =
    useContext(GameContext);

  const handleSubmit = (inputValue) => {
    setGameState({
      ...gameState,
      playerInput: inputValue,
      lastInput: inputValue,
    });
  };

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [game]);

  return (
    <div className="App">
      <div className={glitching ? 'game glitch' : 'game'}>
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '5rem',
              paddingLeft: '2rem',
            }}
          >
            {game &&
              !gameState.gameEnded &&
              game.map((view, index) => <div key={index}>{view}</div>)}
            <div ref={messagesEndRef} />
          </div>
          {!gameState.gameEnded && <Input handleSubmit={handleSubmit} />}
        </>
      </div>
    </div>
  );
}

export default App;
