import React, { useEffect, useState } from 'react';

interface PokemonsResponse {
  name: string;
  url: string;
}

export const Root = () => {
  const [pokemons, setPokemons] = useState<PokemonsResponse[]>([]);
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then((res) => res.json())
      .then((data) => setPokemons(data.results));
  }, []);

  if (pokemons.length === 0) return <div>Loading...</div>;

  return (
    <div>
      {pokemons.map((pokemon) => {
        return <p key={pokemon.url}>{pokemon.name}</p>;
      })}
    </div>
  );
};
