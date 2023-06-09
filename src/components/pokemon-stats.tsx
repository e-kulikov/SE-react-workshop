import { PokemonData } from '../api/pokemon';

interface PokemonStatsProps {
  stats: PokemonData['stats'];
}
export const PokemonStats = ({ stats }: PokemonStatsProps) => (
  <>
    {stats.map(({ base_stat, stat: { name } }) => (
      <p>
        <strong>{name}: </strong>
        {base_stat}
      </p>
    ))}
  </>
);
