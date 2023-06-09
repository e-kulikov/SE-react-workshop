import React from 'react';
import { RouterProvider } from 'react-router-dom';

import { routerConfig } from './routes/_config';
import { useInitStateManager } from './state';

export const App = () => {
  const [StateManagerProvider, state] = useInitStateManager();

  return (
    <React.StrictMode>
      <StateManagerProvider value={state}>
        <RouterProvider router={routerConfig} />
      </StateManagerProvider>
    </React.StrictMode>
  );
};
