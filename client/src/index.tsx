import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { AppRouter } from './routes';
import { store } from './store';

render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('app'),
);
