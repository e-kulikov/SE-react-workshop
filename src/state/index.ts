import { PokemonData, PokemonSpeciesData } from '../api';
import React, { createContext, useContext, useReducer } from 'react';
import { reducer } from './reducer';
import { Action } from './actions';
import { AbilityData } from '../api/ability';

interface MetaShape {
  listLimit?: number;
}

const INITIAL_STATE = {
  abilityData: {} as Record<AbilityData['name'], AbilityData | undefined>,
  pokemonData: {} as Record<PokemonData['name'], PokemonData | undefined>,
  pokemonSpeciesData: {} as Record<
    PokemonSpeciesData['name'],
    PokemonSpeciesData | undefined
  >,
  meta: {} as MetaShape,
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
