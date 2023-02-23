import React, { useEffect, useState, useRef } from 'react';
import './responses.scss';
import { Jeff } from 'assets';
import EllipsesAnimation from 'components/animations/EllipsesAnimation';
import { readyForInput } from 'sounds/sounds';

const JeffResponse = ({
  response = "Maybe we've got an error here?",
  dialogLength = null,
}) => {
  const [typing, setTyping] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    if (dialogLength) {
      setTimeout(() => {
        setTyping(false);
        readyForInput.play();
      }, dialogLength * 40);
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return typing ? (
    <div className="typing">
      Typing
      <EllipsesAnimation />
    </div>
  ) : (
    <>
      <div className="jeff-response">
        <img src={Jeff} alt="jeff" className="jeff-avatar" />
        <div className="message-bubble">
          <div className="message-arrow"></div>
          <p className="message">{response}</p>
        </div>
      </div>
      <div ref={messagesEndRef} />
    </>
  );
};

export default JeffResponse;
