import { State } from './index';
import {
  ACTION_ADD_NEW_POKEMON_DATA,
  ACTION_STORE_NEW_POKEMONS,
} from './actions/names';
import { Action } from './actions';

export const reducer = (
  state: State,
  { type, payload = {} }: Action
): State => {
  switch (type) {
    case ACTION_STORE_NEW_POKEMONS:
      return {
        ...state,
        pokemons: [...state.pokemons, ...payload.pokemons],
      };
    case ACTION_ADD_NEW_POKEMON_DATA:
      return {
        ...state,
        pokemonData: {
          ...state.pokemonData,
          [payload.name]: payload,
        },
      };
    default:
      return { ...state };
  }
};
