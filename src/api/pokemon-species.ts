import { SegmentAPI } from "./_segment";
import type { PokemonData } from "./pokemon";

export interface SpeciesData {
    name: string;
    form_description: {
        description: string;
        language: {
            name: string;
        }
    }[];
    evolution_chain: {
        url?: string;
        id: number;
    };
    varieties: {
        is_default: boolean;
        pokemon: Pick<PokemonData, 'name'>[]
    }
}

export class PokemonSpecies extends SegmentAPI<SpeciesData> {
    constructor(...args: ConstructorParameters<typeof SegmentAPI<SpeciesData>>) {
        super(...args);
    }

    async getOne(...options: Parameters<SegmentAPI<SpeciesData>['getOne']>) {
        const result = await super.getOne(...options);
        const evolutionChainId = +new URL(result.evolution_chain.url!).pathname.split('/').pop()!;

        return {
            ...result,
            evolution_chain: {
                ...result.evolution_chain,
                id: evolutionChainId
            }
        };
    };
}
