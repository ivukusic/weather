import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from 'core/Store';
import Routes from 'core/routes';

const App = (): JSX.Element => (
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>
);

export default App;
