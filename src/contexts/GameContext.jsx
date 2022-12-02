import React, { createContext, useState, useEffect, useMemo } from 'react';
import 'App.scss';

import {
  failSound,
  readyForInput,
  successSound,
  mainMusic,
  intenseMusic,
} from 'sounds/sounds';

import { puzzle1 } from 'puzzles/puzzle1';
import { puzzle2 } from 'puzzles/puzzle2';
import { puzzle3 } from 'puzzles/puzzle3';
import { puzzle4 } from 'puzzles/puzzle4';
import Intro from 'views/Intro/Intro';
import EndGame from 'views/EndGame/EndGame';

export const GameContext = createContext({});

export const GameProvider = ({ children }) => {
  const [game, setGame] = useState([<Intro />]);
  const [firstLogin, setFirstLogin] = useState(true);
  const [glitching, setGlitching] = useState(false); // change to 'glitch' to see glitch effect
  const [gameState, setGameState] = useState({
    currentExpectedInput: '',
    lastInput: '',
    playerInput: '',
    username: '',
    password: '',
    gameStarted: false,
    gameEnded: false,
    currentPuzzle: 0,
    currentPuzzleIndex: 0,
    musicPlaying: false,
    currentMusic: mainMusic,
  });

  const timeline = useMemo(
    () => [
      {
        id: 1,
        puzzle: puzzle1(
          gameState.lastInput,
          gameState.username,
          gameState.password,
          failSound,
          successSound,
          readyForInput,
          setGlitching
        ),
      },
      {
        id: 2,
        puzzle: puzzle2(
          gameState.playerInput,
          failSound,
          successSound,
          readyForInput
        ),
      },
      {
        id: 3,
        puzzle: puzzle3(
          gameState.playerInput,
          setGlitching,
          failSound,
          successSound,
          readyForInput
        ),
      },
      {
        id: 4,
        puzzle: puzzle4(
          gameState.playerInput,
          setGlitching,
          failSound,
          successSound,
          readyForInput
        ),
      },
    ],
    [
      gameState.lastInput,
      gameState.username,
      gameState.password,
      gameState.playerInput,
      setGlitching,
    ]
  );

  const incrementPuzzle = (puzzle, puzzleIndex) => {
    setGameState({
      ...gameState,
      currentPuzzle: puzzle,
      currentPuzzleIndex: puzzleIndex,
      currentExpectedInput:
        timeline[puzzle].puzzle[puzzleIndex].dialog.expectedInput,
    });
  };

  function delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async function asyncCall(res) {
    console.log('hit');
    await delay(1000);
    setGame([...game, res]);
    console.log('set');
  }

  useEffect(() => {
    // setTimeout(() => {
    //   console.log('your mom')
    //   return
    // }, 2000);
    const successResponse = timeline[gameState.currentPuzzle].puzzle[
      gameState.currentPuzzleIndex
    ].dialog.responses.successResponse?.map((resp, i) => {
      if (typeof resp === 'string')
        return (
          <div key={i} className="text-line">
            {resp}
          </div>
        );
      if (typeof resp === 'function') resp();
      if (typeof resp === 'object') return resp;
      return null;
      // let result, time;
      // if (typeof resp === 'string') {
      //   time = 1000;
      //   result = (
      //     <div key={i} className="text-line">
      //       {resp}
      //     </div>
      //   );
      // }
      // if (typeof resp === 'function') {
      //   time = 2000;
      //   result = resp();
      // }
      // if (typeof resp === 'object') {
      //   time = 3000;
      //   result = resp;
      // }
      // return timeout(result, time);
    });

    const failureResponse = timeline[gameState.currentPuzzle].puzzle[
      gameState.currentPuzzleIndex
    ].dialog.responses.failureResponse?.map((resp, i) => {
      if (typeof resp === 'string') return <div key={i}>{resp}</div>;
      if (typeof resp === 'function') resp();
      if (typeof resp === 'object') return resp;
      return null;
    });

    if (gameState.playerInput.toLowerCase() === 'login' && firstLogin) {
      setGameState({
        ...gameState,
        playerInput: '',
        gameStarted: true,
        // musicPlaying: true,
      });
      // gameState.musicPlaying
      //   ? gameState.currentMusic.pause()
      //   : (gameState.currentMusic.loop = true) && gameState.currentMusic.play();
      // setFirstLogin(false);
    }

    if (
      gameState.gameStarted &&
      gameState.playerInput === gameState.currentExpectedInput &&
      gameState.lastInput !== 'music' &&
      gameState.playerInput !== 'login' &&
      gameState.playerInput !== 'hint'
    ) {
      if (successResponse) {
        // debugger;
        setGame([...game, successResponse]);
        // successResponse.forEach((response) => {
        //   asyncCall(response);
        // });
      }
      if (
        gameState.currentPuzzleIndex ===
        timeline[gameState.currentPuzzle].puzzle.length - 1
      ) {
        incrementPuzzle(gameState.currentPuzzle + 1, 0);
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

    if (
      gameState.playerInput !== gameState.currentExpectedInput &&
      gameState.lastInput !== 'music' &&
      gameState.playerInput !== 'login' &&
      gameState.playerInput !== 'hint'
    ) {
      if (failureResponse) {
        setGame([...game, failureResponse]);
      }
    }

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

    if (gameState.currentPuzzle === 4) {
      setGameState({
        ...gameState,
        currentMusic: intenseMusic,
      });
    }

    console.log('game', game);
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// if playerInput === currentExpectedInput, add timeline[currentPuzzle].puzzle[currentPuzzleIndex].dialog.response.successResponse to game
// if playerInput !== currentExpectedInput, add timeline[currentPuzzle].puzzle[currentPuzzleIndex].dialog.response.failResponse to game and do not progress the game
// then set currentPuzzleIndex to currentPuzzleIndex + 1
// if currentPuzzleIndex === timeline[currentPuzzle].puzzle.length, set currentPuzzle to currentPuzzle + 1
// if currentPuzzle === timeline.length, set gameEnded to true
// if gameEnded, set game to [<EndGame />]