import { css, styled } from 'styled-components';

interface GridContainerProps {
  gap?: string | number;
}

export const GridContainer = styled.div<GridContainerProps>`
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-template-rows: auto;
  grid-auto-rows: min-content;

  ${(props) =>
    css`
      ${props.gap &&
      `gap: ${props.gap}${typeof props.gap === 'number' ? 'px' : ''}`}
    `}
`;
