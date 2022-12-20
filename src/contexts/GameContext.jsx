import React, { createContext, useState, useEffect, useMemo } from 'react';
import 'App.scss';

import {
  failSound,
  readyForInput,
  successSound,
  alabasterMusic,
} from 'sounds/sounds';

import { puzzle1 } from 'puzzles/puzzle1';
import Intro from 'views/Intro/Intro';
import Dialog from 'components/Dialog';

export const GameContext = createContext({});

export const GameProvider = ({ children }) => {
  const [inputAllowed, setInputAllowed] = useState(true); // used to determine if the user can input
  const [username, setUsername] = useState(''); // username
  const [password, setPassword] = useState(''); // password
  const [inputValue, setInputValue] = useState(''); // player input
  const [game, setGame] = useState([<Intro />]); // game is an array of views
  const [firstLogin, setFirstLogin] = useState(true); // used to determine if the user has logged in for the first time
  const [glitching, setGlitching] = useState(false); // used to determine if the screen is glitching
  const [startTime, setStartTime] = useState(0); // used to determine the start time of the game
  const [gameState, setGameState] = useState({
    // used to store the state of the game
    currentExpectedInput: '',
    lastInput: '',
    playerInput: '',
    password: '',
    gameStarted: false,
    gameEnded: false,
    currentPuzzle: 0,
    currentPuzzleIndex: 0,
    musicPlaying: false,
    currentMusic: alabasterMusic,
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
          username,
          password,
          failSound,
          successSound,
          readyForInput,
        ),
      },
    ],
    [gameState, password, username]
  );

  useEffect(() => {
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

    // * THIS IS THE FUNCTION THAT RUNS WHEN THE PLAYER MAKES THEIR FIRST SUCCESS INPUT
    if (gameState.playerInput.toLowerCase() === '3512076170' && firstLogin) {
      setGameState({
        ...gameState,
        playerInput: '',
        gameStarted: true,
        musicPlaying: true,
      });
      gameState.musicPlaying
        ? gameState.currentMusic.pause()
        : (gameState.currentMusic.loop = true) && gameState.currentMusic.play();
      setFirstLogin(false);
    }

    // * THIS IS THE FUNCTION THAT RUNS WHEN THE PLAYER INPUT EQUALS SUCCESS
    if (
      gameState.gameStarted &&
      gameState.playerInput === gameState.currentExpectedInput &&
      gameState.lastInput.toLowerCase() !== 'music' &&
      gameState.playerInput.toLowerCase() !== '3512076170' &&
      gameState.playerInput.toLowerCase() !== 'hint'
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

    // * THIS IS THE FUNCTION THAT RUNS WHEN THE PLAYER INPUT EQUALS FAILURE
    if (
      gameState.gameStarted &&
      gameState.playerInput !== gameState.currentExpectedInput &&
      gameState.lastInput.toLowerCase() !== 'music' &&
      gameState.playerInput.toLowerCase() !== '3512076170' &&
      gameState.playerInput.toLowerCase() !== 'hint'
    ) {
      if (failureResponse) {
        setGame([...game, <Dialog response={failureResponse} />]);
      }
    }

    // * THIS IS THE FUNCTION THAT RUNS WHEN THE PLAYER INPUTS HINT
    if (gameState.playerInput.toLowerCase() === 'hint') {
      setGame([
        ...game,
        <Dialog
          response={[
            `Your hint code is ${
              timeline[gameState.currentPuzzle].puzzle[
                gameState.currentPuzzleIndex
              ].dialog.hint
            }`,
          ]}
        />,
      ]);
    }

    // * THIS IS THE FUNCTION THAT RUNS WHEN THE PLAYER INPUTS MUSIC
    if (gameState.playerInput.toLowerCase() === 'music') {
      setGameState({
        ...gameState,
        playerInput: '',
        musicPlaying: !gameState.musicPlaying,
      });
      gameState.musicPlaying
        ? gameState.currentMusic.pause()
        : (gameState.currentMusic.loop = true) && gameState.currentMusic.play();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.playerInput]);

  return (
    <GameContext.Provider
      value={{
        gameState,
        setGameState,
        glitching,
        setGlitching,
        game,
        inputValue,
        setInputValue,
        startTime,
        inputAllowed
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
