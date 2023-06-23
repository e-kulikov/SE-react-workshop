import { PokemonListItem } from '../../api/pokemon';
import { useEffect, useState } from 'react';
import { api } from '../../api';

export const usePokemonsList = (limit: number, page: number) => {
  const [list, updateList] = useState<{
    results: PokemonListItem[];
    count: number;
  }>({
    results: [],
    count: 0,
  });
  const offset = (+page - 1) * limit;

  useEffect(() => {
    api.pokemon.list({ limit, offset }).then(updateList);
  }, [limit, offset]);

  return list;
};
