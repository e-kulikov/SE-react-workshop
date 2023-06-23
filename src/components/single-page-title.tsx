import { styled } from 'styled-components';
import { Card as AntCard } from 'antd';
import { getPokemonTitle } from '../utils/string';

interface SinglePageTitleProps {
  title: string;
}

const Card = styled(AntCard)`
  display: flex;
  height: 100%;
  align-items: center;
`;

export const SinglePageTitle = ({ title }: SinglePageTitleProps) => (
  <Card>
    <AntCard.Meta title={getPokemonTitle(title)} />
  </Card>
);
