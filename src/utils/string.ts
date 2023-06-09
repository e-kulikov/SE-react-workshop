export const firstCapital = ([first, ...rest]: string): string =>
  `${first.toUpperCase()}${rest.join('')}`
