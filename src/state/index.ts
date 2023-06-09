import { PokemonData, PokemonListItem } from '../api/pokemon';
import React, { createContext, useContext, useReducer } from 'react';
import { reducer } from './reducer';
import { Action } from './actions';

const INITIAL_STATE = {
  pokemons: [] as PokemonListItem[],
  pokemonData: {} as Record<PokemonData['name'], PokemonData>,
};

export type State = typeof INITIAL_STATE;

const StateManagerContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: INITIAL_STATE, dispatch: () => {} });

export const useInitStateManager = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return [StateManagerContext.Provider, { state, dispatch }] as const;
};

export const useStateManager = () => useContext(StateManagerContext);
