import React from 'react';
import './responses.scss';
import { Jeff } from 'assets';

const JeffResponse = ({ response = "Maybe we've got an error here?" }) => {
  return (
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
