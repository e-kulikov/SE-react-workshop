import { useMemo, useReducer } from 'react';

export const toggleReducer = (state: boolean, action: undefined | boolean) =>
  action === undefined ? !state : action;

export const useToggle = (initial = false) => {
  const [state, dispatch] = useReducer(toggleReducer, initial);

  const { toggle, toggleTrue, toggleFalse } = useMemo(
    () => ({
      toggle: (state: boolean | unknown) => {
        typeof state === 'boolean' ? dispatch(state) : dispatch(undefined);
      },
      toggleTrue: () => dispatch(true),
      toggleFalse: () => dispatch(false),
    }),
    [dispatch]
  );

  return [state, { toggle, toggleTrue, toggleFalse }] as const;
};
