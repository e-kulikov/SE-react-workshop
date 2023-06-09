import { Row as AntRow, Col, Spin } from 'antd';
import { PokemonData } from '../api/pokemon';
import { useEffect, useState } from 'react';
import { PokemonCard } from '../components/pokemon-card';
import { api } from '../api';

import config from '../config.json';
import { styled } from 'styled-components';
import { useParams } from 'react-router-dom';

export const List = () => {
  const [pokemons, setPokemons] = useState<Pick<PokemonData, 'name'>[]>([]);
  const { page = 1 } = useParams();

  useEffect(() => {
    api.pokemon
      .list({
        limit: config.DEFAULT_CARDS_AMOUNT,
        offset: (+page - 1) * config.DEFAULT_CARDS_AMOUNT,
      })
      .then(setPokemons);
  }, [page]);

  if (pokemons.length === 0) return <Spin />;

  return (
    <Row gutter={[10, 10]} wrap>
      {pokemons.map((pokemon) => (
        <Col key={pokemon.name} xs={12} sm={8} md={6} lg={4}>
          <PokemonCard pokemon={pokemon} />
        </Col>
      ))}
    </Row>
  );
};

const Row = styled(AntRow)({
  width: '100%',
  padding: 10,
});
