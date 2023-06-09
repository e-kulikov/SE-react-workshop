import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Card, Space, Spin } from 'antd';

import { api } from '../api';
import { PokemonSpeciesData } from '../api/pokemon-species';
import { useStateManager } from '../state';

export const Pokemon = () => {
  const { state } = useStateManager();
  const { name } = useParams();
  const [pokemonSpecies, setPokemonSpeciesData] =
    useState<PokemonSpeciesData | null>(null);

  const pokemon = useMemo(
    () => state.pokemonData[name!],
    [name, state.pokemonData]
  );

  useEffect(() => {
    if (!name) return;

    console.log(state.pokemonData[name]);

    api.species.getOne({ name }).then(setPokemonSpeciesData);
  }, [name, state]);

  if (!pokemon || !pokemonSpecies) return <Spin />;

  return (
    <Space>
      <Card
        cover={<img alt={pokemon.name} src={pokemon.sprites.front_default} />}
      />
    </Space>
  );
};
