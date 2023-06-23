import { Link } from 'react-router-dom';

import { Card as AntCard } from 'antd';

import { PokemonData } from '../api';
import { getPokemonTitle } from '../utils/string';
import { PokemonTypes } from './pokemon-type';

import { usePokemon } from '../state/hooks/use-pokemon';
import { PokemonImage, useCarouselAutoplay } from './pokemon-image';
import { css, styled } from 'styled-components';

interface PokemonCardProps {
  pokemon: Pick<PokemonData, 'name'>;
  showMeta?: boolean;
}

export const PokemonCard = ({
  pokemon: { name },
  showMeta,
}: PokemonCardProps) => {
  const [sliderAutoplay, imagesRef, { startAutoplay, stopAutoplay }] =
    useCarouselAutoplay();
  const pokemon = usePokemon(name);

  if (!pokemon)
    return (
      <Link to="#">
        <Card loading />
      </Link>
    );

  return (
    <Link to={`/pokemon/${pokemon.name}`}>
      <Card
        hoverable
        onMouseEnter={startAutoplay}
        onMouseLeave={stopAutoplay}
        title={getPokemonTitle(pokemon.name)}
        extra={<PokemonTypes types={pokemon.types} />}
      >
        <PokemonImage
          ref={imagesRef}
          autoplay={sliderAutoplay}
          front={pokemon.sprites.front_default}
          back={pokemon.sprites.back_default}
          name={pokemon.name}
        />
        {showMeta && (
          <AntCard.Meta
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
    </Link>
  );
};

const Card = styled(AntCard).attrs((props) => ({
  ...props,
  hoverable: false,
  _hoverable: props.hoverable,
}))`
  ${({ _hoverable }) =>
    _hoverable &&
    css`
      transition: box-shadow 0.35s;
      &:hover {
        border-color: transparent;
        box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16),
          0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
      }
    `}
`;
