import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from 'core/routes';
import store from 'core/Store';
import { checkLogin } from 'library/common/actions/Authentication.action';
import { Header } from 'library/common/components';

const App = (): JSX.Element | null => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    store.dispatch<any>(checkLogin());
    setLoaded(true);
  }, []);

  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes />
      </Router>
    </Provider>
  );
};

export default App;
