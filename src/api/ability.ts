import { SegmentAPI } from './index';

export interface AbilityData {
  id: number;
  name: string;
  effect_entries: {
    effect: string;
    short_effect: string;
    language: {
      name: string;
    };
  }[];
  pokemon: {
    pokemon: {
      name: string;
    };
  }[];
}

export class Ability extends SegmentAPI<AbilityData> {}
