import React, { useState, useEffect, useRef, useContext } from 'react';
import { GameContext } from 'contexts/GameContext';
import 'App.scss';
import UserResponse from './response/UserResponse';
import JeffResponse from './response/JeffResponse';
import SystemResponse from './response/SystemResponse';

import { failSound, readyForInput } from 'sounds/sounds';

function Dialog({ response }) {
  const { gameHidden, setInputAllowed } = useContext(GameContext);
  const [dialog, setDialog] = useState([]);
  const [rendered, setRendered] = useState([]);

  useEffect(() => {
    setDialog(response);
  }, [response]);

  const splitResponse = (response) => {
    const split = response.split(': ');
    return split[1];
  };

  const isJeff = (response) => {
    return response && response.includes('Jeff: ');
  };

  const isUser = (response) => {
    return response && response.includes('User: ');
  };

  const isSystem = (response) => {
    return response && response.includes('System: ');
  };

  const containsLink = (response) => {
    return response && response.includes('http');
  };

  useEffect(() => {
    let totalDelay = 0;

    setInputAllowed(false);
    if (dialog.length > 0) {
      for (let i = 0; i < dialog.length; i++) {
        const lastDialog = dialog[i - 1] ? dialog[i - 1] : '';
        let lastDialogLength;
        const currentDialogLength = dialog[i] ? dialog[i].length : 0;

        if (lastDialog && isJeff(lastDialog)) {
          lastDialogLength = lastDialog.length * 40;
        } else {
          lastDialogLength = 0;
        }

        totalDelay += lastDialogLength + 1500;

        if (isJeff(dialog[i])) {
          setTimeout(() => {
            if (containsLink(dialog[i])) {
              setRendered((prev) => [
                ...prev,
                <JeffResponse
                  key={i}
                  response={
                    <a
                      href={splitResponse(dialog[i])}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Link
                    </a>
                  }
                  dialogLength={currentDialogLength}
                />,
              ]);
            } else {
              setRendered((prev) => [
                ...prev,
                <JeffResponse
                  key={i}
                  response={splitResponse(dialog[i])}
                  dialogLength={currentDialogLength}
                />,
              ]);
            }
          }, totalDelay);
        } else if (isUser(dialog[i])) {
          setRendered((prev) => [
            ...prev,
            <UserResponse key={i} response={splitResponse(dialog[i])} />,
          ]);
          readyForInput.play();
        } else if (isSystem(dialog[i])) {
          setTimeout(() => {
            setRendered((prev) => [
              ...prev,
              <SystemResponse key={i} response={splitResponse(dialog[i])} />,
            ]);
            failSound.play();
          }, totalDelay);
        }
      }
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialog]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [rendered]);

  return (
    <>
      <div style={{ opacity: gameHidden ? '0' : '1' }}>{rendered}</div>
      <div ref={messagesEndRef} />
    </>
  );
}

export default Dialog;
