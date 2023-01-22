import React, { useState, useEffect } from 'react';
import './head.scss';

const Head = () => {
  const [current, setCurrent] = useState(' ');

  useEffect(() => {
    const text = [
      'Connecting...',
      'Connected!',
      'You Are Now Speaking With Jeff',
    ];

    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        setCurrent(text[i]);
      }, 1500 * i);
    }
  }, []);

  return (
    <div className="head">
      <div className="connecting">
        <h1>{current}</h1>
      </div>
    </div>
  );
};

export default Head;
