import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthenticationManager from './AuthenticationManager';
import { UserContext } from './UserContextConsumer';
import getStateMembers from '../getStateMembers';
import useAuthorization from '../hooks/useAuthorization';

const AuthorizationManager = (props) => {
  const { children, onAuth, members } = props;

  const [user, setUser, logOut] = useAuthorization({ role: 'guest', userId: 'guest' });

  const { role } = user;

  onAuth({
    members,
    role,
  });

  return (
    <UserContext.Provider value={user}>
      <AuthenticationManager authorize={setUser} deleteUserInfo={logOut}>
        {children}
      </AuthenticationManager>
    </UserContext.Provider>
  );
};

AuthorizationManager.propTypes = {
  children: PropTypes.node.isRequired,
  onAuth: PropTypes.func.isRequired,
  members: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(getStateMembers)(AuthorizationManager);
