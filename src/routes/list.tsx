import { Row as AntRow, Col, Spin, Pagination } from 'antd';
import { useCallback } from 'react';
import { PokemonCard } from '../components/pokemon-card';

import config from '../config.json';
import { styled } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useMetaLimit } from '../state/hooks/use-meta-limit';
import { usePokemonsList } from '../state/hooks/use-pokemons-list';

export const List = () => {
  const [limit, setLimit] = useMetaLimit(config.DEFAULT_CARDS_AMOUNT);
  const { page = 1 } = useParams();
  const { results: pokemons, count } = usePokemonsList(limit, +page);
  const navigate = useNavigate();

  const onChange = useCallback(
    (newPage: number, newLimit: number) => {
      navigate(`/pokemons/${newPage}`);
      setLimit(newLimit);
    },
    [navigate, setLimit]
  );

  if (pokemons.length === 0) return <Spin />;

  return (
    <>
      <Row gutter={[10, 10]} wrap>
        {pokemons.map((pokemon) => (
          <Col key={pokemon.name} xs={12} sm={8} md={6} lg={4}>
            <PokemonCard pokemon={pokemon} showMeta />
          </Col>
        ))}
      </Row>
      <Pagination
        current={+page}
        onChange={onChange}
        onShowSizeChange={onChange}
        style={{ textAlign: 'center' }}
        defaultPageSize={config.DEFAULT_CARDS_AMOUNT}
        pageSizeOptions={[
          config.DEFAULT_CARDS_AMOUNT,
          config.DEFAULT_CARDS_AMOUNT * 2,
          config.DEFAULT_CARDS_AMOUNT * 4,
          config.DEFAULT_CARDS_AMOUNT * 8,
        ]}
        responsive
        total={count}
      />
    </>
  );
};

const Row = styled(AntRow)({
  width: '100%',
  padding: 10,
});
