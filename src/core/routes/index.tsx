import React from 'react';
import { Route, Switch } from 'react-router-dom';

import City from 'screens/City';
import Home from 'screens/Home';

export const Routes = () => (
  <Switch>
    <Route path="/city/:city" component={City} />
    <Route path="/" component={Home} />
  </Switch>
);

export default Routes;
