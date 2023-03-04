import React, { useContext, useRef, useEffect } from 'react';
import 'App.scss';

import { GameContext } from 'contexts/GameContext';
import Input from 'components/MainForm';
import Head from 'components/head/Head';

function App() {
  const { gameState, setGameState, game } = useContext(GameContext);

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
      <Head />
      <div className="game">
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '7rem 0 7rem 2rem',
              overflowY: 'auto'
            }}
          >
            {game &&
              !gameState.gameEnded &&
              game.map((view, index) => <div key={index}>{view}</div>)}
            <div ref={messagesEndRef} className="red-div"/>
          </div>
        </>
      </div>
      {!gameState.gameEnded && <Input handleSubmit={handleSubmit} />}
    </div>
  );
}

export default App;
