import { AbilityCard } from './ability-card';
import { render, screen } from '@testing-library/react';

describe('AbilityCard', () => {
  it('should be visible', () => {
    render(<AbilityCard ability={{ name: '' }} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should be visible with particular ability', () => {
    render(<AbilityCard ability={{ name: 'test ability' }} />);

    expect(screen.getByText('test ability')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});
