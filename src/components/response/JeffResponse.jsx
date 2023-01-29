import React, { useEffect, useState } from 'react';
import './responses.scss';
import { Jeff } from 'assets';

const JeffResponse = ({
  response = "Maybe we've got an error here?",
  dialogLength = null,
}) => {
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    if (dialogLength) {
      setTimeout(() => {
        setTyping(false);
      }, dialogLength * 40);
    }
    return;
  }, []);

  return typing ? (
    'Typing...'
  ) : (
    <div className="jeff-response">
      <img src={Jeff} alt="jeff" className="jeff-avatar" />
      <div className="message-bubble">
        <div className="message-arrow"></div>
        <p className="message">{response}</p>
      </div>
    </div>
  );
};

export default JeffResponse;
