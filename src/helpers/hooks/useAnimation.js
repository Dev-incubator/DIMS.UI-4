import { useEffect } from 'react';
import { useSpring } from 'react-spring';

export default function useAnimation({ trigger, initState, finalState }) {
  const [style, set, stop] = useSpring(() => initState);
  useEffect(() => {
    if (!trigger()) {
      set(initState);
    } else {
      set(finalState);
    }
  }, [trigger, set, initState, finalState, stop]);
  return [style, set, stop];
}
