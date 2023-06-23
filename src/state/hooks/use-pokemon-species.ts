import { api, PokemonSpeciesData } from '../../api';
import { useStateManager } from '../index';
import { useEffect } from 'react';
import { savePokemonSpeciesData } from '../actions';

export const usePokemonSpecies = (name?: PokemonSpeciesData['name']) => {
  const {
    state: { pokemonSpeciesData },
    dispatch,
  } = useStateManager();
  const existed = name && pokemonSpeciesData[name];

  useEffect(() => {
    if (!name || existed) return;
    api.species
      .getOne({ name })
      .then((pokemonSpeciesData) =>
        dispatch(savePokemonSpeciesData(pokemonSpeciesData))
      );
  }, [dispatch, existed, name]);

  return existed;
};
