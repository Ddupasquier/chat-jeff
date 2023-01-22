import React from 'react';
import './responses.scss';
import { User } from 'assets';

const UserResponse = ({ response = 'user input' }) => {
  return (
    <div className="user-response">
      <div className="message-bubble">
        <div className="message-arrow"></div>
        <p className="message">{response}</p>
      </div>
      <img src={User} alt="user" className="user-avatar" />
    </div>
  );
};

export default UserResponse;
