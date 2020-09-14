import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from 'screens/Home';

export const Routes = () => (
  <Switch>
    <Route path="/" component={Home} />
  </Switch>
);

export default Routes;
