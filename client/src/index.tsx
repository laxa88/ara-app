import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import { AppRouter } from './routes';
import { persistor, store } from './store';

render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>,
  document.getElementById('app'),
);
