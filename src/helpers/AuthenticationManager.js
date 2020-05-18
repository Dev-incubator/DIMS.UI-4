import Client from './Client';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AuthenticationManager extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
  }

  async componentDidMount() {
    await this.logIn();
  }

  logIn = async (login, password) => {
    this.setState({ authenticated: (await this.authenticate(login, password)).status === 'success' });
  };

  authenticate = async (login, password) => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken || !(await Client.checkToken(authToken))) {
      if (!login || !password) {
        return { status: 'fail' };
      }
      const { status, found, token, role, userID } = await Client.signIn(login, password);
      if (status === 'fail' && found) {
        return { status, message: 'Incorrect password' };
      }
      if (status === 'fail' && !found) {
        return { status, message: 'Incorrect userName' };
      }

      localStorage.setItem('authToken', token);
      this.props.authorize(role, userID);
    } else {
      const { role, userID } = await Client.getUserInfoByToken(authToken);
      this.props.authorize(role, userID);
    }
    return { status: 'success', message: 'Login successful' };
  };

  render() {
    const { logInFormClass: LogInForm, children } = this.props;
    return (
      <>
        {this.state.authenticated !== null &&
          (this.state.authenticated ? children : <LogInForm logIn={this.logIn} show />)}
      </>
    );
  }
}

AuthenticationManager.propTypes = {
  authorize: PropTypes.func.isRequired,
  logInFormClass: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default AuthenticationManager;
