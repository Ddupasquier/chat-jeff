import React, { useState, useEffect } from 'react';
import 'App.scss';

const Connecting = ({text}) => {
  const [connecting, setConnecting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setConnecting(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    connecting && (
      <div className="connecting">
        <div>{text}</div>
        <div className="loading-elips" />
      </div>
    )
  );
};

export default Connecting;
