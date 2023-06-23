import { api, PokemonData } from '../../api';
import { useStateManager } from '../index';
import { useEffect } from 'react';
import { savePokemonData } from '../actions';

export const usePokemon = (name: PokemonData['name']) => {
  const {
    state: { pokemonData },
    dispatch,
  } = useStateManager();
  const existed = pokemonData[name];

  useEffect(() => {
    if (existed) return;
    api.pokemon
      .getOne({ name })
      .then((pokemonData) => dispatch(savePokemonData(pokemonData)));
  }, [dispatch, existed, name]);

  return existed;
};
