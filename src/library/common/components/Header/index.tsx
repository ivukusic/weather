import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';

import { RootState } from 'core/MainReducer';
import { logoutUser as logoutUserAction } from 'library/common/actions/Authentication.action';

import './Header.style.scss';

interface HeaderProps extends RouteComponentProps {
  isLoggedIn: boolean;
  logoutUser: () => {};
}

export const Header = ({ history, isLoggedIn, logoutUser }: HeaderProps): JSX.Element | null => {
  const onLogoutClick = () => {
    logoutUser();
    history.replace('/');
  };

  if (!isLoggedIn) {
    return null;
  }
  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <div className="container-fluid nav-container pl-1">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/weather">
              Weather
            </Link>
          </Nav>
        </Navbar.Collapse>
        <div className="navbar__logout pt-2 pt-lg-3 pb-2" onClick={onLogoutClick}>
          Logout
        </div>
      </div>
    </Navbar>
  );
};

const mapStateToProps = ({ authReducer }: RootState) => ({
  isLoggedIn: authReducer.isLoggedIn,
  user: authReducer.user,
});

export default withRouter(connect(mapStateToProps, { logoutUser: logoutUserAction })(Header));
