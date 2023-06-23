import { SegmentAPI } from './_segment';

export interface AbilityData {
  id: number;
  name: string;
  effect_entry: {
    effect: string;
    short_effect: string;
  };
  flavor_text: string;
  pokemon: {
    pokemon: {
      name: string;
    };
  }[];
}

export type AbilityListItem = Pick<AbilityData, 'name'>;

export class Ability extends SegmentAPI<AbilityData> {
  async getOne(...options: Parameters<SegmentAPI<AbilityData>['getOne']>) {
    const result = await super.getOne(...options);

    const effectEntry = (
      result as AbilityData & {
        effect_entries: {
          effect: string;
          short_effect: string;
          language: { name: string };
        }[];
      }
    ).effect_entries.find(({ language }) => language.name === 'en');

    const flavorText = (
      result as AbilityData & {
        flavor_text_entries: {
          flavor_text: string;
          language: { name: string };
        }[];
      }
    ).flavor_text_entries.find(
      ({ language }) => language.name === 'en'
    )?.flavor_text;

    return {
      ...result,
      effect_entry: effectEntry,
      flavor_text: flavorText,
    } as AbilityData;
  }
}
