import { request } from '../utils/request';

import { Pokemon } from './pokemon';
import { Ability } from './ability';

export abstract class SegmentAPI<T extends { name: string; id?: number }> {
  private readonly uri: string;
  constructor(private readonly host: string, private readonly name: string) {
    this.uri = `${this.host}/${this.name}`;
  }

  list = async ({
    limit = 10,
    offset = 0,
  }: {
    limit: number;
    offset: number;
  }) => {
    const { results } = await request<{
      results: Pick<T, 'name' | 'id'>[];
    }>(`${this.uri}?limit=${limit}&offset=${offset}`);

    return results;
  };

  getOne = async ({ name, id }: Pick<T, 'name' | 'id'>) =>
    request<T>(`${this.uri}/${id || name}`);
}

export class API {
  constructor(readonly host: string) {}

  pokemon = new Pokemon(this.host, 'pokemon');
  ability = new Ability(this.host, 'ability');
}
