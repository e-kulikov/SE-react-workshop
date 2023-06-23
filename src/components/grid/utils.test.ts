import {
  getCellStart,
  Direction,
  isCellEndProvided,
  getCellEnd,
} from './utils';

describe('utils', () => {
  describe('getCellStart()', () => {
    describe.each<Direction>(['column', 'row'])('get %s start', (direction) => {
      const testFn = getCellStart(direction);

      describe(`props.${direction} is type of string`, () => {
        const draftProps = { [direction]: '3 / span 2' };

        it(`should return value of props.${direction}`, () => {
          expect(testFn({ ...draftProps })).toEqual('3 / span 2');
        });
      });

      describe(`props.${direction} is type of number`, () => {
        const draftProps = { [direction]: 22 };

        it(`should return value of props['${direction}-start'] if it is provided`, () => {
          expect(testFn({ ...draftProps, [`${direction}-start`]: 12 })).toEqual(
            12
          );
        });

        it(`should return value of props.${direction} if props['${direction}-start'] is not provided`, () => {
          expect(testFn({ ...draftProps })).toEqual(22);
        });
      });

      describe(`props.${direction} is not defined`, () => {
        const draftProps = {};
        it(`should return value of props['${direction}-start'] if it is provided`, () => {
          expect(testFn({ ...draftProps, [`${direction}-start`]: 4 })).toEqual(
            4
          );
        });

        it(`should return 'auto' if props['${direction}-start'] is not provided`, () => {
          expect(testFn({ ...draftProps })).toEqual('auto');
        });
      });
    });
  });

  describe('isCellEndProvided()', () => {
    describe.each<Direction>(['column', 'row'])(
      'is %s end provided',
      (direction) => {
        const testFn = isCellEndProvided(direction);

        describe.each([
          ['string', false],
          ['number', true],
          [undefined, true],
        ])(`props.${direction} is type of %s`, (type, result) => {
          const draftProps = {
            [direction]:
              type && (type === 'number' ? Math.random() + 1 : 'lorem ipsum'),
          };

          it.each(['end', 'span'])(
            `should return ${result} if props['${direction}-%s'] is provided`,
            (value) => {
              expect(
                testFn({ ...draftProps, [`${direction}-${value}`]: 12 })
              ).toEqual(result);
            }
          );

          it(`should return ${result} if both props['${direction}-end'] and props['${direction}-span'] are provided`, () => {
            expect(
              testFn({
                ...draftProps,
                [`${direction}-span`]: 2,
                [`${direction}-end`]: 12,
              })
            ).toEqual(result);
          });

          it(`should return false if neither props['${direction}-end'] nor props['${direction}-span'] are provided`, () => {
            expect(testFn({ ...draftProps })).toEqual(false);
          });
        });
      }
    );
  });

  describe('getCellEnd()', () => {
    describe.each<Direction>(['column', 'row'])('get %s end', (direction) => {
      const testFn = getCellEnd(direction);

      describe(`props['${direction}-end'] is provided`, () => {
        const TEST_VALUE = Math.random() + 1;
        const draftProps = { [`${direction}-end`]: TEST_VALUE };

        it.each(['defined', 'undefined'])(
          `should return the value of props['${direction}-end'] if props['${direction}-span'] is %s`,
          (directionSpanCase) => {
            expect(
              testFn({
                ...draftProps,
                [`${direction}-span`]:
                  directionSpanCase === 'defined'
                    ? Math.random() + 1
                    : undefined,
              })
            ).toEqual(`/ ${TEST_VALUE}`);
          }
        );
      });

      describe(`props['${direction}-end'] is not provided`, () => {
        const draftProps = {};

        it(`should return value of props['${direction}-span'] if it is provided`, () => {
          const TEST_VALUE = Math.random() + 1;
          expect(
            testFn({ ...draftProps, [`${direction}-span`]: TEST_VALUE })
          ).toEqual(`/ span ${TEST_VALUE}`);
        });

        it(`should return 1 if props['${direction}-span'] is not provided`, () => {
          expect(testFn({ ...draftProps })).toEqual(`/ span 1`);
        });
      });
    });
  });
});
