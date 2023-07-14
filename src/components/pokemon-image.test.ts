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
    const TOGGLE_STATE_MOCK = jest.fn();
    const TOGGLE_TRUE_MOCK = jest.fn();
    const TOGGLE_FALSE_MOCK = jest.fn();
    const GO_TO_MOCK = jest.fn();

    beforeAll(() => {
      useRefSpy.mockReturnValue({
        current: {
          goTo: GO_TO_MOCK,
        },
      });
      useToggleSpy.mockReturnValue([
        TOGGLE_STATE_MOCK,
        { toggleTrue: TOGGLE_TRUE_MOCK, toggleFalse: TOGGLE_FALSE_MOCK },
      ] as any as ReturnType<typeof useToggle>);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    afterEach(() => {
      jest.clearAllMocks(); // calls are cleared, implementation is saved, mock is saved
      // jest.resetAllMocks(); // calls are cleared, implementation is cleared, mock is saved
      // jest.restoreAllMocks(); // clear everything
    });

    it('should call useToggle under the hood', () => {
      renderHook(useCarouselAutoplay);

      expect(useToggleSpy).toHaveBeenCalled();
    });
    it('should call useRef under the hood', () => {
      renderHook(useCarouselAutoplay);

      expect(useRefSpy).toHaveBeenCalled();
    });
    it('should return state', () => {
      const { result } = renderHook(useCarouselAutoplay);
      expect(result.current?.[0]).toBe(TOGGLE_STATE_MOCK);
    });
    it('should call `toggleTrue` of `useToggle` when calling `startAutoplay` method', () => {
      const { result } = renderHook(useCarouselAutoplay);

      result.current?.[2].startAutoplay();
      expect(TOGGLE_TRUE_MOCK).toHaveBeenCalled();
    });
    it('should call `.goTo(0)` exposed method of referenced component', () => {
      const { result } = renderHook(useCarouselAutoplay);

      result.current?.[2].stopAutoplay();
      expect(GO_TO_MOCK).toHaveBeenCalledTimes(1);
      expect(GO_TO_MOCK).toHaveBeenCalledWith(0);
    });

    describe('description', () => {
      it('should call `toggleFalse` of `useToggle` when calling `stopAutoplay` method', () => {
        const { result } = renderHook(useCarouselAutoplay);

        result.current?.[2].stopAutoplay();
        expect(TOGGLE_FALSE_MOCK).toHaveBeenCalled();
      });
    });
  });
});
