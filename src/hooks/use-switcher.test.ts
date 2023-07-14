import React from 'react';
import { useSwitcher } from './use-switcher';

const useStateSpy = jest.spyOn(React, 'useState');
const useCallbackSpy = jest.spyOn(React, 'useCallback');

describe('useSwitcher', () => {
  beforeEach(() => {
    useStateSpy.mockReturnValueOnce(['testValue', jest.fn()]);
    useStateSpy.mockReturnValueOnce(['testValue2', jest.fn()]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return what I want', () => {
    const USE_CALLBACK_RESULT_MOCK = jest.fn();
    // useStateSpy.mockReturnValueOnce(['testState1', jest.fn()]);
    // useStateSpy.mockReturnValueOnce(['testState2', jest.fn()]);
    useCallbackSpy.mockReturnValueOnce(USE_CALLBACK_RESULT_MOCK);

    expect(useSwitcher()).toEqual([
      'testValue',
      'testValue2',
      USE_CALLBACK_RESULT_MOCK,
    ]);
  });
});
