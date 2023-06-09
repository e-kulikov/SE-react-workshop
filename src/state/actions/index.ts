import type { ActionNames } from './actions';

export type Action<P extends Record<string, any> = Record<string, any>> = {
  type: ActionNames;
  payload?: P;
};
