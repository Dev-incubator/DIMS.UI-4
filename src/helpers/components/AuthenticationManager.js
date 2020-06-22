import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import Client from '../Client';
import LogOut from './LogOut';
import GuestRoutes from '../../Routes/GuestRoutes';
import Spinner from '../../components/elements/Spinner/Spinner';

class AuthenticationManager extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
  }

  async componentDidMount() {
    await this.logIn();
  }

  logIn = async (login, password) => {
    const authResponse = await this.authenticate(login, password);
    this.setState({ authenticated: authResponse.status === 'success' });
    return authResponse;
  };

  logOut = () => {
    const { deleteUserInfo } = this.props;
    this.setState({ authenticated: false });
    localStorage.removeItem('authToken');
    deleteUserInfo();
  };

  redirectHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  authenticate = async (login, password) => {
    const { authorize } = this.props;
    const authToken = localStorage.getItem('authToken');
    const fail = 'fail';

    if (!authToken || !(await Client.checkToken(authToken))) {
      if (!login || !password) {
        return { status: fail };
      }
      const { status, found, token, role, userId } = await Client.signIn(login, password);
      if (status === fail && found) {
        return { status, message: 'Incorrect password' };
      }
      if (status === fail && !found) {
        return { status, message: 'Incorrect userName' };
      }

      localStorage.setItem('authToken', token);
      authorize(role, userId);

      this.redirectHome();
    } else {
      const { role, userId } = await Client.getUserInfoByToken(authToken);
      authorize(role, userId);
    }

    return { status: 'success', message: 'Login successful' };
  };

  render() {
    const { children } = this.props;
    const { authenticated } = this.state;

    return (
      <>
        {authenticated !== null ? (
          <>
            {authenticated ? children : <GuestRoutes logIn={this.logIn} />}
            {authenticated && (
              <Route exact path='/logout'>
                <LogOut logOut={this.logOut} />
              </Route>
            )}
          </>
        ) : (
          <Spinner centered />
        )}
      </>
    );
  }
}

AuthenticationManager.propTypes = {
  authorize: PropTypes.func.isRequired,
  deleteUserInfo: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(AuthenticationManager);
