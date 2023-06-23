import { createRef, useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { Card, Space, Spin } from 'antd';

import { usePokemon } from '../state/hooks/use-pokemon';
import { Grid } from '../components/grid';
import { usePokemonSpecies } from '../state/hooks/use-pokemon-species';
import { SinglePageTitle } from '../components/single-page-title';
import { PokemonMetaCard } from '../components/pokemon-meta-card';
import { CarouselRef } from 'antd/es/carousel';
import { PokemonImage } from '../components/pokemon-image';

export const Pokemon = () => {
  const { name } = useParams();

  const pokemon = usePokemon(name!);
  const pokemonSpecies = usePokemonSpecies(pokemon?.species.name);

  if (!pokemon || !pokemonSpecies)
    return (
      <Space>
        <Spin />
      </Space>
    );

  return (
    <Grid gap={10} style={{ padding: '10px' }}>
      <Grid.Cell align="stretch" column-span={12}>
        <SinglePageTitle title={pokemon.name} />
      </Grid.Cell>
      <Grid.Cell column-span={12}>
        <PokemonMetaCard
          habitat={pokemonSpecies.habitat}
          types={pokemon.types}
        />
      </Grid.Cell>
      <Grid.Cell column-span={6}>
        <Card>
          <PokemonImage
            name={pokemon.name}
            front={pokemon.sprites.front_default}
            back={pokemon.sprites.back_default}
            arrows
          />
        </Card>
      </Grid.Cell>
    </Grid>
  );
};
