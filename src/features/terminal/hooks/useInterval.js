import { useEffect, useRef } from 'react';

/**
 * Custom hook for setting up an interval.
 * @param {Function} callback - The function to call on each interval tick.
 * @param {number|null} delay - The interval delay in milliseconds. Pass null to pause.
 */
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
