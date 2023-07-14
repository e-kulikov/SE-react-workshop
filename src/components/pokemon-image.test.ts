import React from 'react';

import * as toggle from '../hooks/use-toggle';
import { useCarouselAutoplay } from './pokemon-image';
// import { renderHook } from '../utils/render-hook';
import { renderHook } from '@testing-library/react';
import { useToggle } from '../hooks/use-toggle';

const useToggleSpy = jest.spyOn(toggle, 'useToggle');
const useRefSpy = jest.spyOn(React, 'useRef');
describe('pokemon image', () => {
  describe('PokemonImage component', () => {});
  describe('useCarouselAutoplay hook', () => {
    it('should call useToggle under the hood', () => {
      renderHook(useCarouselAutoplay);

      expect(useToggleSpy).toHaveBeenCalled();
    });
    it.todo('should call useRef under the hood');
    it.todo('should return state and reference');
    it.todo(
      'should call `toggleTrue` of `useToggle` when calling `startAutoplay` method'
    );
    it.todo(
      'should call `toggleFalse` of `useToggle` when calling `stopAutoplay` method'
    );
    it.todo('should call `.goTo(0)` exposed method of referenced component');
  });
});
