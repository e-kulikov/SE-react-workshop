import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { Card, Col, Descriptions, Row as AntRow, Space, Spin } from 'antd';

import { api } from '../api';
import { PokemonSpeciesData } from '../api/pokemon-species';
import { useStateManager } from '../state';
import { styled } from 'styled-components';
import { firstCapital } from '../utils/string';

const Row = styled(AntRow)({
  width: '100%',
  padding: 10,
});

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
    api.species.getOne({ name }).then(setPokemonSpeciesData);
  }, [name, state]);

  if (!pokemon || !pokemonSpecies)
    return (
      <Space>
        <Spin />
      </Space>
    );

  console.log(pokemonSpecies);

  return (
    <Row gutter={[10, 10]} wrap>
      <Col span={12}>
        <Card style={{ height: '100%' }}>
          <Card.Meta title={firstCapital(pokemon.name)} />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Card.Meta
            description={
              <Descriptions>
                <Descriptions.Item label="Habitat:">
                  <Link to={`/habitat/${pokemonSpecies.habitat.name}`}>
                    {pokemonSpecies.habitat.name}
                  </Link>
                </Descriptions.Item>
                <Descriptions.Item label="Types:">
                  {pokemon.types.map(
                    ({ type: { name } }, index, { length }) => (
                      <span key={name}>
                        <Link to={`/type/${name}`}>{name}</Link>
                        {index !== length - 1 && ', '}
                      </span>
                    )
                  )}
                </Descriptions.Item>
              </Descriptions>
            }
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card
          cover={<img alt={pokemon.name} src={pokemon.sprites.front_default} />}
        />
      </Col>
      <Col span={12}>
        <Card>
          <Card.Meta
            description={
              <Descriptions>
                {pokemonSpecies.form_description && (
                  <Descriptions.Item>
                    {pokemonSpecies.form_description}
                  </Descriptions.Item>
                )}
                <Descriptions.Item label="Weight">
                  {pokemon.weight}
                </Descriptions.Item>
                <Descriptions.Item label="Height">
                  {pokemon.height}
                </Descriptions.Item>
              </Descriptions>
            }
          />
        </Card>
      </Col>
    </Row>
  );
};
