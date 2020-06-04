import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginUser } from 'library/common/actions/Authentication.action';
import Login from './Login.component';

export default withRouter(connect(null, { loginUser })(Login));
