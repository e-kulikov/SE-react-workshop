import { createBrowserRouter } from 'react-router-dom';

import { Layout } from './_layout';
import { List } from './list';
import { Pokemon } from './pokemon';

export const routerConfig = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/:page',
        index: true,
        element: <List />,
      },
      {
        path: 'pokemon/:name',
        element: <Pokemon />,
      },
    ],
  },
]);
