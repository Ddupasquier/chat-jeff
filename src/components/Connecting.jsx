import React, { useState, useEffect } from 'react';

const Connecting = () => {
  const [connecting, setConnecting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setConnecting(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return connecting ? (
    <div className="connecting">
      <div className="connecting__text">Connecting...</div>
      <div className="connecting__dots">
        <div className="connecting__dot"></div>
        <div className="connecting__dot"></div>
        <div className="connecting__dot"></div>
      </div>
    </div>
  ) : (
    'Connected to ChatRoom 15-68370223-23'
  );
};

export default Connecting;
