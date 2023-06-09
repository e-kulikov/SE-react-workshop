import { SegmentAPI } from './_segment';
import type { AbilityListItem } from './ability';
import type { PokemonSpeciesListItem } from './pokemon-species';

export interface PokemonData {
  id: number;
  name: string;
  abilities: { ability: AbilityListItem }[];
  height: number;
  weight: number;
  species: PokemonSpeciesListItem;
  sprites: { front_default: string; back_default: string };
  stats: { base_stat: number; stat: { name: string } }[];
  types: { type: { name: string } }[];
}

export type PokemonListItem = Pick<PokemonData, 'name'>;

export class Pokemon extends SegmentAPI<PokemonData> {}
