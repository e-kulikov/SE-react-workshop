import { createBrowserRouter } from 'react-router-dom';

import { Layout } from './_layout';
import { List } from './list';

export const routerConfig = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <List page={1} />
      }
    ]
  },
]);
