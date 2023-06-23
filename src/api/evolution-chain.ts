import { SegmentAPI } from './_segment';
import { PokemonSpeciesListItem } from './pokemon-species';

interface Chain {
  evolves_to: [Chain];
  species: PokemonSpeciesListItem;
}
export interface EvolutionChainData {
  id: number;
  chain: [Chain];
}

export class EvolutionChain extends SegmentAPI<EvolutionChainData> {}
