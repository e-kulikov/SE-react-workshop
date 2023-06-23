import { createBrowserRouter, redirect } from 'react-router-dom';

import { Layout } from './_layout';
import { List } from './list';
import { Pokemon } from './pokemon';

export const routerConfig = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: List,
      },
      {
        path: 'pokemons/:page?',
        Component: List,
        loader: async ({ params: { page } }) =>
          (!page || page === '1') && redirect('/'),
      },
      {
        path: 'pokemon/:name',
        Component: Pokemon,
      },
    ],
  },
]);
