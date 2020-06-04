import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import { RootState } from 'core/MainReducer';
import Home from 'screens/Home';
import Login from 'screens/Login';
import Weather from 'screens/Weather';

const mapStateToProps = ({ authReducer }: RootState) => ({ isLoggedIn: authReducer.isLoggedIn });

interface PrivateRouteProps {
  component: any;
  isLoggedIn: boolean;
  path: string;
}

const PrivateRoute = connect(mapStateToProps)(({ component: Component, isLoggedIn }: PrivateRouteProps) => (
  <Route
    // tslint:disable-next-line: jsx-no-lambda
    render={props => {
      if (
        (isLoggedIn && props.history.location.pathname !== '/login') ||
        (!isLoggedIn && props.history.location.pathname === '/login')
      ) {
        return <Component {...props} />;
      }
      if (isLoggedIn && props.history.location.pathname === '/login') {
        return (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        );
      }
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      );
    }}
  />
));

export const Routes = () => (
  <Switch>
    <PrivateRoute path="/login" component={Login} />
    <PrivateRoute path="/weather" component={Weather} />
    <PrivateRoute path="/" component={Home} />
  </Switch>
);

export default Routes;
