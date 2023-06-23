import { styled } from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  border: 0;
  background: transparent;
  color: #fff;
  font-size: 1.3em;
  font-weight: bold;
  padding: 0;
  margin-left: -1em;
  margin-right: 0.3em;
`;

// eslint-disable-next-line no-restricted-globals
const back = () => history.back();
export const Back = () => <Button onClick={back}>&larr;</Button>;
