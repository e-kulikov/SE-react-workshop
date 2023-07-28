import React from 'react';
import { PokemonCard } from './pokemon-card';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useInitStateManager } from '../state';

const Wrapper = ({ children }: { children: React.ReactElement }) => {
  const [ContextProvider, state] = useInitStateManager();

  return (
    <ContextProvider value={state}>
      <BrowserRouter>{children}</BrowserRouter>
    </ContextProvider>
  );
};

describe('<PokemonCard />', () => {
  it('should render a card based on server data', async () => {
    render(<PokemonCard pokemon={{ name: 'test-pokemon' }} />, {
      wrapper: Wrapper,
    });

    await screen.findByText('Test Pokemon');

    expect(screen.getByText('Test Pokemon')).toBeInTheDocument();
  });
});
