import React, { useContext } from 'react';
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

  return (
    <form>
      <input
        className="main-input"
        type="text"
        placeholder="> Type Here"
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
