import Client from './Client';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthenticationManager from './AuthenticationManager';
import LoginForm from '../components/elements/LoginForm';
import UserContext from './UserContext';

class AuthorizationManager extends Component {
  constructor(props) {
    super(props);
    this.state = { authorizedUser: { role: 'guest', userID: 'guest' }, roles: ['guest', 'member', 'admin', 'mentor'] };
  }

  authorize = (role, userID) => {
    if (!role || !userID) {
      this.setState({ authorizedUser: JSON.parse(localStorage.getItem('userInfo')) });
    }
    if (this.state.roles.includes(role)) {
      localStorage.setItem('userInfo', JSON.stringify({ role, userID }));
      this.setState({ authorizedUser: { role, userID } });
    }
  };

  render() {
    const { children } = this.props;
    return (
      <>
        <UserContext.Provider value={this.state.authorizedUser}>
          <AuthenticationManager logInFormClass={LoginForm} authorize={this.authorize}>
            {children}
          </AuthenticationManager>
        </UserContext.Provider>
      </>
    );
  }
}

AuthorizationManager.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default AuthorizationManager;
