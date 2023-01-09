import React, { useEffect, useContext } from 'react';
import { GameContext } from 'contexts/GameContext';

const MainForm = ({ handleSubmit }) => {
  const { inputValue, setInputValue, inputAllowed } = useContext(GameContext);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputAllowed) {
      e.preventDefault();
      handleSubmit(inputValue);
      setInputValue('');
    } else if (e.key === 'Enter' && !inputAllowed) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const audio = new Audio(
      'https://cia-9d562a98.s3.us-west-1.amazonaws.com/GameAssets/SoundFX/Daffodil362KeyPress.wav'
    );
    audio.volume = 0.6;
    audio.play();
  }, [inputValue]);

  return (
    <form>
      <input
        className="main-input"
        type="text"
        placeholder=" > Type Here"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        aria-label="response-input"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
};

export default MainForm;
