import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Button } from 'library/common/components';

import './Login.style.scss';

interface LoginProps extends RouteComponentProps {
  loginUser: () => void;
}

const Login = ({ history, loginUser }: LoginProps): JSX.Element => {
  const onButtonClick = () => {
    loginUser();
    history.replace('/');
  };

  return (
    <div className="container pt-5 d-flex flex-column align-items-center justify-content-center">
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first p-3">LOGO</div>
          <div>
            <input type="text" id="login" className="fadeIn second" name="login" placeholder="Email" />
            <input type="text" id="password" className="fadeIn third" name="login" placeholder="Password" />
            <Button className="mt-2 mb-3" label="LOGIN" onClick={onButtonClick} type="primary" />
          </div>
          <div id="formFooter">Forgot Password?</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
