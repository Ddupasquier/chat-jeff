import React, { useState, useEffect, useRef, useContext } from 'react';
import { GameContext } from 'contexts/GameContext';
import 'App.scss';
import UserResponse from './response/UserResponse';
import JeffResponse from './response/JeffResponse';

function Dialog({ response }) {
  const { gameHidden, setInputAllowed } = useContext(GameContext);
  const [dialog, setDialog] = useState([]);
  const [rendered, setRendered] = useState([]);

  useEffect(() => {
    setDialog(response);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const splitResponse = (response) => {
    const split = response.split(': ');
    return split[1];
  };

  useEffect(() => {
    let lineCount = 0;
    setInputAllowed(false);
    if (dialog.length > 0) {
      for (let i = 0; i < dialog.length; i++) {
        setTimeout(() => {
          if (dialog[i].includes('Jeff: ')) {
            setRendered((prev) => [
              ...prev,
              <JeffResponse key={i} response={splitResponse(dialog[i])} />,
            ]);
          } else if (dialog[i].includes('User: ')) {
            setRendered((prev) => [
              ...prev,
              <UserResponse key={i} response={splitResponse(dialog[i])} />,
            ]);
          }
        }, 1000 * i);
        lineCount = i * 1000;
      }
    }
    if (dialog.length > 0) {
      setTimeout(() => {
        setInputAllowed(true);
      }, lineCount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialog]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [rendered]);

  return (
    <>
      <div style={{ opacity: gameHidden ? '0' : '1' }}>{rendered}</div>
      <div ref={messagesEndRef} />
    </>
  );
}

export default Dialog;
