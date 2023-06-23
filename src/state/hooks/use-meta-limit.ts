import { useStateManager } from '../index';
import { useCallback, useEffect } from 'react';
import { saveMetaLimit } from '../actions';

export const useMetaLimit = (defaultLimit: number = 10) => {
  const {
    state: { meta },
    dispatch,
  } = useStateManager();

  const currentLimit =
    meta.listLimit === undefined ? defaultLimit : meta.listLimit;

  useEffect(() => {
    if (meta.listLimit !== currentLimit) dispatch(saveMetaLimit(defaultLimit));
  }, [currentLimit, defaultLimit, dispatch, meta.listLimit]);

  const changeMetaLimit = useCallback(
    (newLimit: number) => dispatch(saveMetaLimit(newLimit)),
    [dispatch]
  );

  return [currentLimit, changeMetaLimit] as const;
};
