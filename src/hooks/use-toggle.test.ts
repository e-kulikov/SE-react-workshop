import { useToggle, toggleReducer } from './use-toggle';
import { useReducer } from 'react';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useReducer: jest.fn(),
  useMemo: jest.fn((fn) => fn()),
}));

describe('useToggle', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('reducer', () => {
    it.each([
      { state: true, action: undefined, expected: false },
      { state: false, action: undefined, expected: true },
      { state: false, action: true, expected: true },
      { state: true, action: false, expected: false },
      { state: false, action: true, expected: true },
      { state: false, action: false, expected: false },
    ])(
      'should return $expected if state is $state and action is $action',
      ({ state, action, expected }) => {
        expect(toggleReducer(state, action)).toEqual(expected);
      }
    );
  });

  describe('hook', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it.each([
      { initial: true, expected: true },
      { initial: false, expected: false },
    ])(
      'should call useReducer under the hood with reducer and $expected value as arguments if called with $initial',
      ({ initial, expected }) => {
        (
          useReducer as unknown as jest.Mock<[boolean, () => void]>
        ).mockReturnValue([initial, () => {}]);

        useToggle(initial);

        expect(useReducer).toHaveBeenCalledTimes(1);
        expect(useReducer).toHaveBeenCalledWith(toggleReducer, expected);
      }
    );

    it.each([
      { method: 'toggleTrue', expected: true } as const,
      { method: 'toggleFalse', expected: false } as const,
    ])(
      'should call dispatch with `$expected` when calling `$method`',
      ({ method, expected }) => {
        const dispatchMock = jest.fn();
        (
          useReducer as unknown as jest.Mock<[boolean, jest.Mock]>
        ).mockReturnValue([false, dispatchMock]);

        const [, { [method]: testedMethod }] = useToggle();
        testedMethod();

        expect(dispatchMock).toHaveBeenCalledTimes(1);
        expect(dispatchMock).toHaveBeenCalledWith(expected);
      }
    );

    it.each([{ value: true }, { value: false }])(
      'should return $value if useReducer returns $value',
      ({ value }) => {
        (
          useReducer as unknown as jest.Mock<[boolean, jest.Mock]>
        ).mockReturnValue([value, jest.fn()]);

        const [state] = useToggle();

        expect(state).toEqual(value);
      }
    );

    it.each([
      { action: true, expected: true },
      { action: false, expected: false },
      { action: new Event('custom event'), expected: undefined },
      { action: Math.random(), expected: undefined },
      { action: 'test string value', expected: undefined },
      { action: () => {}, expected: undefined },
      { action: { testObjectField: true }, expected: undefined },
      { action: undefined, expected: undefined },
    ])(
      'should call `dispatch` with $expected, when calling `toggle` with `$action`',
      ({ action, expected }) => {
        const dispatchMock = jest.fn();
        (
          useReducer as unknown as jest.Mock<[boolean, jest.Mock]>
        ).mockReturnValue([true, dispatchMock]);

        const [, { toggle }] = useToggle();
        toggle(action);

        expect(dispatchMock).toHaveBeenCalledTimes(1);
        expect(dispatchMock).toHaveBeenCalledWith(expected);
      }
    );
  });
});
