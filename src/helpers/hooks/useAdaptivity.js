import { useEffect, useState } from 'react';

export default function useAdaptivity() {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const resizeEffect = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', resizeEffect);
    return () => window.removeEventListener('resize', resizeEffect);
  }, []);

  return [dimensions];
}
