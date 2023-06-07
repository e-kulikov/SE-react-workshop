import { createBrowserRouter } from 'react-router-dom';

import { Root } from './Root';

export const routerConfig = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
]);
