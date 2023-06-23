import { css, styled } from 'styled-components';
import { getGridCellCSSProp } from './utils';

export interface GridCellProps {
  'column-start'?: number;
  'column'?: string | number;
  'column-end'?: number;
  'row-start'?: number;
  'row'?: string | number;
  'row-end'?: number;
  'column-span'?: number;
  'row-span'?: number;
  'align'?: 'start' | 'end' | 'center' | 'stretch';
  'justify'?: 'start' | 'end' | 'center' | 'stretch';
}

/**
 * @desc Grid Cell component. Doesn't support named rows/columns
 */
export const GridCell = styled.div<GridCellProps>`
  ${(props) => css`
    grid-column: ${getGridCellCSSProp('column')(props)};
    grid-row: ${getGridCellCSSProp('row')(props)};
    ${props.align && `align-self: ${props.align};`}
    ${props.justify && `justify-self: ${props.justify};`};
  `}
`;
