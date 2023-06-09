import { ReactElement, useEffect, useState } from 'react';

import { Card, Tooltip } from 'antd';
import { ExclamationCircleTwoTone, FireTwoTone } from '@ant-design/icons';

import { PokemonData } from '../api/pokemon';
import { api } from '../api';
import { firstCapital } from '../utils/string';

interface PokemonCardProps {
  pokemon: Pick<PokemonData, 'name'>
}

export const PokemonCard = ({ pokemon: { name } }: PokemonCardProps) => {
  const [
    pokemon,
    setPokemonData
  ] = useState<PokemonData | null>(null);

  useEffect(() => {
    api.pokemon
      .getOne({ name })
      .then(setPokemonData);
  });

  if (!pokemon) return <Card loading />

  return (
    <Card
      hoverable
      cover={<img alt={pokemon.name} src={pokemon.sprites.front_default} />}
      extra={<PokemonTypes types={pokemon.types} />}
    >
      <Card.Meta title={firstCapital(pokemon.name)} description={<PokemonTypes types={pokemon.types} />} />
    </Card>
  );
}

const PokemonStats = ({ stats }: { stats: PokemonData['stats'] }) => (
  <>
    {stats.map(({ base_stat, stat: { name } }) => (
      <p><strong>{name}: </strong>{base_stat}</p>
    ))}
  </>
);

const PokemonTypes = ({ types }: { types: PokemonData['types'] }) => (
  <>
    {types.map(({type: {name }}) => {
      const Icon = TypeIcons[name] || TypeIcons.default;
      return (
        <Tooltip title={name} trigger="hover">
          <Icon />
        </Tooltip>);
    })}
  </>
);

const TypeIcons: Record<string, () => ReactElement> = {
  fire: () => <FireTwoTone twoToneColor="orange" />,
  default: () => <ExclamationCircleTwoTone twoToneColor="#ccc" />
}
