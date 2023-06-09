import { ReactElement, useEffect, useState } from 'react';

import { Button as AntButton, Card, Tooltip } from 'antd';
import {
  BugTwoTone,
  CloudTwoTone,
  ExclamationCircleTwoTone,
  ExperimentTwoTone,
  FireTwoTone,
  PictureTwoTone,
  SlidersTwoTone,
} from '@ant-design/icons';

import { PokemonData } from '../api/pokemon';
import { api } from '../api';
import { firstCapital } from '../utils/string';
import { styled } from 'styled-components';

interface PokemonCardProps {
  pokemon: Pick<PokemonData, 'name'>;
}

export const PokemonCard = ({ pokemon: { name } }: PokemonCardProps) => {
  const [pokemon, setPokemonData] = useState<PokemonData | null>(null);

  useEffect(() => {
    api.pokemon.getOne({ name }).then(setPokemonData);
  }, [name]);

  if (!pokemon) return <Card loading />;

  return (
    <Card
      hoverable
      title={firstCapital(pokemon.name)}
      cover={<img alt={pokemon.name} src={pokemon.sprites.front_default} />}
      extra={<PokemonTypes types={pokemon.types} />}
    >
      <Card.Meta
        description={
          <div>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Abilities: {pokemon.abilities.length}</p>
          </div>
        }
      />
    </Card>
  );
};

const Button = styled(AntButton)({
  border: 0,
});

const PokemonStats = ({ stats }: { stats: PokemonData['stats'] }) => (
  <>
    {stats.map(({ base_stat, stat: { name } }) => (
      <p>
        <strong>{name}: </strong>
        {base_stat}
      </p>
    ))}
  </>
);

const PokemonTypes = ({ types }: { types: PokemonData['types'] }) => (
  <>
    {types.map(({ type: { name } }) => {
      const Icon = TypeIcons[name] || TypeIcons.default;
      return (
        <Tooltip title={name}>
          <Button shape="circle" icon={<Icon />} />
        </Tooltip>
      );
    })}
  </>
);

const TypeIcons: Record<string, () => ReactElement> = {
  fire: () => <FireTwoTone twoToneColor="orange" />,
  bug: () => <BugTwoTone twoToneColor="green" />,
  flying: () => <CloudTwoTone twoToneColor="lightgray" />,
  grass: () => <PictureTwoTone twoToneColor="lightgreen" />,
  poison: () => <ExperimentTwoTone twoToneColor="violet" />,
  water: () => <SlidersTwoTone twoToneColor="blue" />,
  default: () => <ExclamationCircleTwoTone twoToneColor="gray" />,
};
