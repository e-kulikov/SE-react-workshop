import { State } from './index';
import {
  ACTION_ADD_NEW_ABILITY_DATA,
  ACTION_ADD_NEW_POKEMON_DATA,
  ACTION_ADD_NEW_POKEMON_SPECIES_DATA,
  ACTION_SET_META_LIMIT,
} from './actions/names';
import { Action } from './actions';

export const reducer = (
  state: State,
  { type, payload = {} }: Action
): State => {
  switch (type) {
    case ACTION_ADD_NEW_ABILITY_DATA:
      return {
        ...state,
        abilityData: {
          ...state.abilityData,
          [payload.name]: payload,
        },
      };
    case ACTION_ADD_NEW_POKEMON_DATA:
      return {
        ...state,
        pokemonData: {
          ...state.pokemonData,
          [payload.name]: payload,
        },
      };
    case ACTION_ADD_NEW_POKEMON_SPECIES_DATA:
      return {
        ...state,
        pokemonSpeciesData: {
          ...state.pokemonSpeciesData,
          [payload.name]: payload,
        },
      };
    case ACTION_SET_META_LIMIT:
      return {
        ...state,
        meta: {
          ...state.meta,
          listLimit: payload.listLimit,
        },
      };
    default:
      return { ...state };
  }
};
