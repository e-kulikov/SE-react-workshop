import { SegmentAPI } from './index';
import type { AbilityData } from './ability';

export interface PokemonData {
  id: number;
  name: string;
  abilities: { ability: Pick<AbilityData, 'name'> }[];
  height: number;
  weight: number;
  species: Pick<PokemonData, 'name' | 'id'>[];
  sprites: { front_default: string; back_default: string };
  stats: { base_stat: number; stat: { name: string } }[];
  types: { type: { name: string } }[];
}

export class Pokemon extends SegmentAPI<PokemonData> {}
