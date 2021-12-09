import { renderHook, act } from '@testing-library/react-hooks';

import useVisualMode from 'hooks/useVisualMode';

const FIRST = 'FIRST';
const SECOND = 'SECOND';
const THIRD = 'THIRD';

test('useVisualMode should initialize with default value', () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  expect(result.current.mode).toBe(FIRST);
});

test('useVisualMode should transition to another mode', () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
});

test('useVisualMode should return to previous mode', () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  console.log('First: ' + FIRST);
  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
  console.log('Second: ' + SECOND);
  act(() => result.current.transition(THIRD));
  expect(result.current.mode).toBe(THIRD);
  console.log('Third: ' + THIRD);
  act(() => result.current.back());
  expect(result.current.mode).toBe(SECOND);
  console.log('Second: ' + SECOND);
  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
  console.log('FIRST: ' + FIRST);
});

test('useVisualMode should replace the current mode', () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  console.log('v2 FIRST: ' + FIRST);

  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
  console.log('v2 SECOND: ' + SECOND);

  // Passing "true" to transition(THIRD, true) says "Transition to THIRD by REPLACING SECOND"
  act(() => result.current.transition(THIRD, true));
  expect(result.current.mode).toBe(THIRD);
  console.log('v2 Third: ' + THIRD);

  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
  console.log('v2 First: ' + FIRST);
});
