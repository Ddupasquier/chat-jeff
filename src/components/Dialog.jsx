import React, { useState, useEffect, useRef, useContext } from 'react';
import { GameContext } from 'contexts/GameContext';
import 'App.scss';
import Connecting from './Connecting';

function Dialog({ response }) {
  const { gameHidden, setInputAllowed } = useContext(GameContext);
  const [dialog, setDialog] = useState([]);
  const [rendered, setRendered] = useState([]);

  useEffect(() => {
    setDialog(response);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let lineCount = 0;
    setInputAllowed(false);
    if (dialog.length > 0) {
      for (let i = 0; i < dialog.length; i++) {
        setTimeout(() => {
          if (dialog[i] === 'connecting') {
            setRendered((prev) => [
              ...prev,
              <Connecting key={i} text={'Connecting'} />,
            ]);
          } else if (dialog[i] === 'locating') {
            setRendered((prev) => [
              ...prev,
              <Connecting key={i} text={'Locating Chatroom'} />,
            ]);
          } else if (dialog[i] === 'typing') {
            setRendered((prev) => [
              ...prev,
              <Connecting key={i} text={'Typing'} />,
            ]);
          } else {
            setRendered((prev) => [
              ...prev,
              <div key={i} className="text-line">
                {dialog[i]}
              </div>,
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
