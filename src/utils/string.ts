export const firstCapital = ([first, ...rest]: string): string =>
  `${first.toUpperCase()}${rest.join('')}`;

export const getPokemonTitle = (name: string): string =>
  name
    .split('-')
    .reduce((result, part) => result + ' ' + firstCapital(part), '')
    .trim();
