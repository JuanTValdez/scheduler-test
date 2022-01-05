import React, { useState } from 'react';

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  function transition(newMode, replace = false) {
    if (replace === true) {
      // history.pop();

      // setHistory(history);
      setHistory((prev) => [...prev, mode]);
      // setMode(history[history.length - 1]);
    }

    setMode(newMode);
    // setHistory([...history, newMode]);

    // else {
    //   setMode(newMode);
    //   setHistory([...history, newMode]);
    // }

    // console.log('History after push: ' + history);
  }

  function back() {
    if (history.length >= 1) {
      history.pop();

      setHistory(history);
    }

    setMode(history[0]);
  }

  return { mode, history, transition, back };
  // May also be written:
  // return {mode: mode}
  //it is the same as the current return
}
