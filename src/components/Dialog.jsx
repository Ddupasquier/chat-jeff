import React, { useState, useEffect, useRef, useContext } from 'react';
import { GameContext } from 'contexts/GameContext';
import 'App.scss';
import UserResponse from './response/UserResponse';
import JeffResponse from './response/JeffResponse';
import SystemResponse from './response/SystemResponse';

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

  const isJeff = (response) => {
    return response.includes('Jeff: ');
  };

  const isUser = (response) => {
    return response.includes('User: ');
  };

  const isSystem = (response) => {
    return response.includes('System: ');
  };

  useEffect(() => {
    let lineCount = 0;
    setInputAllowed(false);
    if (dialog.length > 0) {
      for (let i = 0; i < dialog.length; i++) {
        
                                                      const lastDialog = dialog[i - 1];
                                                      let lastDialogLength
                                                      const currentDialog = dialog[i];
                                                      const currentDialogLength = dialog[i].length;

                                                      if (lastDialog && isJeff(lastDialog)) {
                                                        lastDialogLength = lastDialog.length;
                                                      } else {
                                                        lastDialogLength = 0;
                                                      }

                                                      const delay = (lastDialogLength + 1000) * i;
                                                      console.log(delay)

        setTimeout(() => {
          if (isJeff(dialog[i])) {

                                                    setTimeout(() => {
                                                      setRendered((prev) => [
                                                        ...prev,
                                                        <JeffResponse
                                                          key={i}
                                                          response={splitResponse(dialog[i])}
                                                          dialogLength={currentDialogLength}
                                                        />,
                                                      ]);
                                                    }, delay);

          } else if (isUser(dialog[i])) {
            setRendered((prev) => [
              ...prev,
              <UserResponse key={i} response={splitResponse(dialog[i])} />,
            ]);
          } else if (isSystem(dialog[i])) {

                                                    setTimeout(() => {
                                                      setRendered((prev) => [
                                                        ...prev,
                                                        <SystemResponse key={i} response={splitResponse(dialog[i])} />,
                                                      ]);
                                                    }, delay);

          }
        }, 1000 * i);

        // * This is a hacky way to force no input during dialog output
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
