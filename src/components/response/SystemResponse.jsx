import React from 'react';
import './responses.scss';

const RussianResponse = ({ response = 'user input' }) => {
  return <div className="russian-response">{response}</div>;
};

export default RussianResponse;
