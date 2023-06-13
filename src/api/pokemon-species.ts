import { SegmentAPI } from './_segment';
import type { PokemonListItem } from './pokemon';

export interface PokemonSpeciesData {
  name: string;
  form_description?: string;
  evolution_chain: {
    url?: string;
    id: number;
  };
  varieties: {
    is_default: boolean;
    pokemon: PokemonListItem[];
  };
  habitat: {
    name: string;
  };
}

export type PokemonSpeciesListItem = Pick<PokemonSpeciesData, 'name'>;

export class PokemonSpecies extends SegmentAPI<PokemonSpeciesData> {
  async getOne(
    ...options: Parameters<SegmentAPI<PokemonSpeciesData>['getOne']>
  ) {
    const result = await super.getOne(...options);
    const evolutionChainId = +new URL(result.evolution_chain.url!).pathname
      .split('/')
      .pop()!;

    const formDescription = (
      result.form_description as unknown as {
        description: string;
        language: { name: string };
      }[]
    )?.find(({ language }) => language.name === 'en')?.description;

    return {
      ...result,
      form_description: formDescription,
      evolution_chain: {
        ...result.evolution_chain,
        id: evolutionChainId,
      },
    };
  }
}
