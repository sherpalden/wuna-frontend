import { useEffect, useRef } from 'react';

export function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;

    // savedCallback.current();
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    // tick();
    if (delay !== null) {
      const id = setInterval(tick, delay);

      return () => clearInterval(id);
    }
  }, [callback, delay]);
}
