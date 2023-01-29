import React from 'react';
import './responses.scss';

const SystemResponse = ({ response = 'user input' }) => {
  return <div className="system-response">{response}</div>;
};

export default SystemResponse;
