import { useState } from 'react';

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replaceLastMode = false) {
    if (replaceLastMode) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  }
  function back() {
    if (history.length < 2) return;

    // remove last history item
    setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
  }
  // console.log('Mode: ', history);
  return {
    mode: history[history.length - 1],
    transition,
    back,
  };
}
