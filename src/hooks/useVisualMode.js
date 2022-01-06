import { useState } from 'react';

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replaceLastMode = false) {
    if (replaceLastMode) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      // setHistory([...history, newMode]);
      setHistory((prev) => [...prev, newMode]);
    }
  }
  function back() {
    if (history.length < 2) return;

    // remove last history item
    setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
  }
  console.log('Mode: ', history);
  return {
    mode: history[history.length - 1],
    transition,
    back,
  };
}

// import React, { useState } from 'react';

// export default function useVisualMode(initialMode) {
//   const [mode, setMode] = useState(initialMode);
//   const [history, setHistory] = useState([initialMode]);

//   function transition(newMode, replace = false) {
//     if (replace === true) {
//       // history.pop();

//       // setHistory(history);
//       setHistory((prev) => [...prev, mode]);
//       // setMode(history[history.length - 1]);
//     }else{

//     }

//     setMode(newMode);
//   }

//   function back() {
//     if (history.length > 1) {
//       // history.pop();

//       // setHistory(history);
//       setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
//     }

//     setMode(history[0]);
//   }

//   console.log('mode: ', mode, history);
//   return { mode, history, transition, back };
//   // May also be written:
//   // return {mode: mode}
//   //it is the same as the current return
// }
