import { forwardRef, useCallback, useRef } from 'react';
import { Carousel } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import { PokemonData } from '../api';
import { styled } from 'styled-components';
import { useToggle } from '../hooks/use-toggle';

interface PokemonImageProps {
  name: PokemonData['name'];
  front: PokemonData['sprites']['front_default'];
  back: PokemonData['sprites']['back_default'];
  autoplay?: boolean;
  arrows?: boolean;
}

export const PokemonImage = forwardRef<CarouselRef, PokemonImageProps>(
  ({ name, front, back, arrows = false, autoplay = false }, ref) => (
    <Carousel
      ref={ref}
      effect="fade"
      arrows={arrows}
      dots={false}
      autoplay={autoplay}
      autoplaySpeed={1500}
      pauseOnHover={false}
      nextArrow={<SlideArrow>&raquo;</SlideArrow>}
      prevArrow={<SlideArrow>&laquo;</SlideArrow>}
    >
      <img src={front} alt={`${name}-front-side`} />
      <img src={back} alt={`${name}-back-side`} />
    </Carousel>
  )
);

const SlideArrow = styled.button`
  color: rgba(0, 0, 0, 0.5) !important;
  font-size: 1em !important;
  &:hover {
    color: rgba(0, 0, 0, 1) !important;
  }
  &:before,
  &:after {
    display: none;
  }
`;

export const useCarouselAutoplay = () => {
  const [autoplayState, { toggleFalse, toggleTrue }] = useToggle();
  const carouselRef = useRef<CarouselRef>(null);

  const stopAutoplay = useCallback(() => {
    toggleFalse();
    carouselRef.current?.goTo(0);
  }, [toggleFalse]);

  return [
    autoplayState,
    carouselRef,
    { startAutoplay: toggleTrue, stopAutoplay },
  ] as const;
};
