import { GridContainer } from './container';
import { GridCell } from './cell';
import { styled } from 'styled-components';

// cloning the component
const _Grid = styled(GridContainer)({});
(_Grid as any).Cell = GridCell;

export const Grid = _Grid as typeof GridContainer & { Cell: typeof GridCell };
