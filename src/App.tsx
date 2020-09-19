import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from 'core/Store';
import Routes from 'core/routes';
import { AlertMessages } from 'library/common/components';

const App = (): JSX.Element => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AlertMessages>
        <Router>
          <Routes />
        </Router>
      </AlertMessages>
    </PersistGate>
  </Provider>
);

export default App;
