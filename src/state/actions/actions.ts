import * as ACTIONS from './names';
import { PokemonData } from '../../api/pokemon';

export type ActionNames = (typeof ACTIONS)[keyof typeof ACTIONS];
const createAction = <P extends Record<string, any> = Record<string, any>>(
  type: ActionNames,
  payload: P
) =>
  ({
    type,
    payload,
  } as const);

export const savePokemonData = (pokemonData: PokemonData) =>
  createAction(ACTIONS.ACTION_ADD_NEW_POKEMON_DATA, pokemonData);
