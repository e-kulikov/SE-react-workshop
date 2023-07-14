import { useCallback, useState } from 'react';

export const useSwitcher = () => {
  const [state1, setState1] = useState(false);

  const [state2, setState2] = useState(true);

  const toggle = useCallback(() => {
    setState1((state) => !state);
    setState2((state) => !state);
  }, []);

  return [state1, state2, toggle] as const;
};
