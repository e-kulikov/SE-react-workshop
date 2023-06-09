import { SegmentAPI } from "./_segment";

export interface EvolutionChainData {
    name: string;
}

export class EvolutionChain extends SegmentAPI<EvolutionChainData> {}
