import { PokemonData } from '../api/pokemon';
import { Button as AntButton, Tooltip } from 'antd';
import { styled } from 'styled-components';
import { TypeIcon } from './pokemon-type-icons';

const Button = styled(AntButton)({
  border: 0,
});
export const PokemonTypes = ({ types }: { types: PokemonData['types'] }) => (
  <>
    {types.map(({ type: { name } }) => {
      const Icon = TypeIcon[name] || TypeIcon.default;
      return (
        <Tooltip key={name} title={name}>
          <Button shape="circle" icon={<Icon />} />
        </Tooltip>
      );
    })}
  </>
);
