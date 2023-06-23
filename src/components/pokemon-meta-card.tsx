import { Card as AntCard, Descriptions } from 'antd';
import { PokemonData, PokemonSpeciesData } from '../api';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';

interface PokemonMetaCardProps {
  types: PokemonData['types'];
  habitat: PokemonSpeciesData['habitat'];
}

const Card = styled(AntCard)`
  display: flex;
  height: 100%;
  align-items: center;
`;

export const PokemonMetaCard = ({ types, habitat }: PokemonMetaCardProps) => (
  <Card>
    <Descriptions>
      {types && types.length > 0 && (
        <Descriptions.Item label="Types">
          {types.map(({ type: { name: typeName } }, index, { length }) => (
            <Fragment key={typeName}>
              <Link to={`/types/${typeName}`}>{typeName}</Link>
              {index !== length - 1 && ', '}
            </Fragment>
          ))}
        </Descriptions.Item>
      )}
      {habitat && (
        <Descriptions.Item label="Habitat">
          <Link to={`/habitat/${habitat.name}`}>{habitat.name}</Link>
        </Descriptions.Item>
      )}
    </Descriptions>
  </Card>
);
