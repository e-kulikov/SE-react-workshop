import { GridCellProps } from './cell';

export type Direction = 'column' | 'row';
export const getCellStart =
  (direction: Direction) => (props: Partial<GridCellProps>) =>
    (typeof props[direction] === 'string'
      ? props[direction]
      : props[`${direction}-start`] || props[direction] || 'auto') as string;

export const isCellEndProvided =
  (direction: Direction) =>
  (props: Partial<GridCellProps>): boolean =>
    (!props[direction] || typeof props[direction] === 'number') &&
    !!(props[`${direction}-end`] || props[`${direction}-span`]);

export const getCellEnd =
  (direction: Direction) => (props: Partial<GridCellProps>) =>
    `/ ${
      props[`${direction}-end`] || 'span ' + (props[`${direction}-span`] || 1)
    }`;

export const getGridCellCSSProp =
  (direction: Direction) => (props: Partial<GridCellProps>) =>
    getCellStart(direction)(props) +
    (isCellEndProvided(direction)(props) ? getCellEnd(direction)(props) : '');
