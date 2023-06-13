import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card } from 'antd';

import { PokemonData } from '../api/pokemon';
import { api } from '../api';
import { firstCapital } from '../utils/string';
import { PokemonTypes } from './pokemon-type';
import { useStateManager } from '../state';
import { savePokemonData } from '../state/actions/actions';

interface PokemonCardProps {
  pokemon: Pick<PokemonData, 'name'>;
  showMeta?: boolean;
}

export const PokemonCard = ({
  pokemon: { name },
  showMeta,
}: PokemonCardProps) => {
  const { state, dispatch } = useStateManager();
  const goTo = useNavigate();

  useEffect(() => {
    api.pokemon.getOne({ name }).then((pokemon) => {
      dispatch(savePokemonData(pokemon));
    });
  }, [name, dispatch]);

  const pokemon = useMemo(
    () => state.pokemonData[name],
    [name, state.pokemonData]
  );

  if (!pokemon) return <Card loading />;

  return (
    <Card
      hoverable
      title={firstCapital(pokemon.name)}
      cover={<img alt={pokemon.name} src={pokemon.sprites.front_default} />}
      extra={<PokemonTypes types={pokemon.types} />}
      onClick={() => goTo(`/pokemon/${pokemon.name}`)}
    >
      {showMeta && (
        <Card.Meta
          description={
            <div>
              <p>Height: {pokemon.height}</p>
              <p>Weight: {pokemon.weight}</p>
              <p>Abilities: {pokemon.abilities.length}</p>
            </div>
          }
        />
      )}
    </Card>
  );
};
