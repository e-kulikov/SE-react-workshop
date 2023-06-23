import * as ACTIONS from './names';
import { PokemonData, PokemonSpeciesData } from '../../api';
import { AbilityData } from '../../api/ability';
import { PokemonSpecies } from '../../api/pokemon-species';
import { ACTION_ADD_NEW_POKEMON_SPECIES_DATA } from './names';

export type ActionNames = (typeof ACTIONS)[keyof typeof ACTIONS];
export type Action<P extends Record<string, any> = Record<string, any>> = {
  type: ActionNames;
  payload?: P;
};
const createAction = <P extends Record<string, any> = Record<string, any>>(
  type: ActionNames,
  payload?: P
): Action<P> => ({
  type,
  payload,
});

export const savePokemonData = (pokemonData: PokemonData) =>
  createAction(ACTIONS.ACTION_ADD_NEW_POKEMON_DATA, pokemonData);

export const savePokemonSpeciesData = (
  pokemonSpeciesData: PokemonSpeciesData
) =>
  createAction(ACTIONS.ACTION_ADD_NEW_POKEMON_SPECIES_DATA, pokemonSpeciesData);

export const saveMetaLimit = (listLimit: number) =>
  createAction(ACTIONS.ACTION_SET_META_LIMIT, { listLimit });

export const saveAbilityData = (abilityData: AbilityData) =>
  createAction(ACTIONS.ACTION_ADD_NEW_ABILITY_DATA, abilityData);
