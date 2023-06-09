import { Pokemon } from './pokemon';
import { Ability } from './ability';
import { PokemonSpecies } from './pokemon-species';

import config from '../config.json';

export class API {
  constructor(readonly host: string) {}

  pokemon = new Pokemon(this.host, 'pokemon');
  ability = new Ability(this.host, 'ability');
  species = new PokemonSpecies(this.host, 'pokemon-species');
}

export const api = new API(config.API_HOST);
