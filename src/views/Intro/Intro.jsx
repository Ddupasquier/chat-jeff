import React, { useState, useEffect } from 'react';
import 'App.scss';
import JeffResponse from 'components/response/JeffResponse';

const Intro = () => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShown(true);
    }, 4000);
    return;
  }, []);
  return (
    <>
      {shown && (
        <JeffResponse
          response="Hello, I am Jeff. Who do I have the pleasure of speaking with today?"
          reponseLength={3}
          dialogLength={68}
        />
      )}
    </>
  );
};

export default Intro;
