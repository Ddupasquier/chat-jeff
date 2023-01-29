import React, { createContext, useState, useEffect, useMemo } from 'react';
import 'App.scss';

import { failSound, readyForInput, successSound } from 'sounds/sounds';

import { puzzle1 } from 'puzzles/puzzle1';
import Intro from 'views/Intro/Intro';
import Dialog from 'components/Dialog';

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}

export const GameContext = createContext({});

export const GameProvider = ({ children }) => {
  const [inputAllowed, setInputAllowed] = useState(true); // used to determine if the user can input
  const [inputValue, setInputValue] = useState(''); // player input
  const [game, setGame] = useState([<Intro />]); // game is an array of views
  const [firstLogin, setFirstLogin] = useState(true); // used to determine if the user has logged in for the first time
  const [startTime, setStartTime] = useState(0); // used to determine the start time of the game
  const [gameState, setGameState] = useState({
    // used to store the state of the game
    currentExpectedInput: '',
    lastInput: '',
    gameStarted: false,
    gameEnded: false,
    currentPuzzle: 0,
    currentPuzzleIndex: 16,
    musicPlaying: false,
  });

  useEffect(() => {
    setStartTime(Date.now());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.gameStarted]);

  const timeline = useMemo(
    () => [
      {
        id: 1,
        puzzle: puzzle1(
          gameState.lastInput,
          failSound,
          successSound,
          readyForInput
        ),
      },
    ],
    [gameState]
  );

  useEffect(() => {
    if (gameState.currentExpectedInput === 'username' && firstLogin) {
      localStorage.setItem('Jeffusername', gameState.lastInput);
      setGameState({
        ...gameState,
        playerInput: 'username',
      });
      setFirstLogin(false);
    } else if (gameState.currentExpectedInput === '') {
      setGameState({
        ...gameState,
        gameStarted: true,
        currentExpectedInput: 'username',
      });
    }

    if (gameState.currentExpectedInput === 'anything') {
      setGameState({
        ...gameState,
        playerInput: 'anything',
      });
    }

    if (gameState.currentExpectedInput === 'between') {
      if (range(19, 27).includes(parseInt(gameState.lastInput.split(' ')[0]))) {
        setGameState({
          ...gameState,
          playerInput: 'between',
        });
      }
    }

    // * THIS IS THE FUNCTION THAT GENERATES THE SUCCESS RESPONSE
    const successResponse = () =>
      timeline[gameState.currentPuzzle].puzzle[
        gameState.currentPuzzleIndex
      ].dialog.responses.successResponse?.map((resp, i) => {
        if (typeof resp === 'string') return resp;
        setTimeout(() => {
          if (typeof resp === 'function') resp();
          if (typeof resp === 'object') return resp;
        }, 1000 * i);
        return null;
      });

    // * THIS IS THE FUNCTION THAT GENERATES THE FAILURE RESPONSE
    const failureResponse = () =>
      timeline[gameState.currentPuzzle].puzzle[
        gameState.currentPuzzleIndex
      ].dialog.responses.failureResponse?.map((resp, i) => {
        if (typeof resp === 'string') return resp;
        setTimeout(() => {
          if (typeof resp === 'function') resp();
          if (typeof resp === 'object') return resp;
        }, 1000 * i);
        return null;
      });

    // * THIS IS THE FUNCTION THAT RUNS WHEN THE PLAYER INPUT EQUALS SUCCESS
    if (
      gameState.gameStarted &&
      gameState.playerInput === gameState.currentExpectedInput
    ) {
      if (successResponse) {
        setGame([...game, <Dialog response={successResponse} />]);
      }
      if (
        gameState.currentPuzzleIndex ===
        timeline[gameState.currentPuzzle].puzzle.length - 1
      ) {
        // ! THIS IS WHERE YOU WOULD ADD A NEW PUZZLE
        setInputAllowed(false);
      } else {
        setGameState((prev) => ({
          ...prev,
          currentPuzzleIndex: prev.currentPuzzleIndex + 1,
          currentExpectedInput:
            timeline[prev.currentPuzzle].puzzle[prev.currentPuzzleIndex + 1]
              .dialog.expectedInput,
        }));
      }
    }

    const inputIgnore = ['anything', 'username', 'between'];
    const expectedIgnore = ['anything', 'username'];

    // * THIS IS THE FUNCTION THAT RUNS WHEN THE PLAYER INPUT EQUALS FAILURE
    if (
      gameState.gameStarted &&
      gameState.playerInput !== gameState.currentExpectedInput &&
      !expectedIgnore.includes(gameState.currentExpectedInput) &&
      !inputIgnore.includes(gameState.playerInput) &&
      !range(19, 27).includes(parseInt(gameState.lastInput.split(' ')[0])) &&
      gameState.currentPuzzleIndex !== 0
    ) {
      if (failureResponse) {
        setGame([...game, <Dialog response={failureResponse} />]);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.playerInput]);

  return (
    <GameContext.Provider
      value={{
        gameState,
        setGameState,
        game,
        inputValue,
        setInputValue,
        startTime,
        inputAllowed,
        setInputAllowed,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
