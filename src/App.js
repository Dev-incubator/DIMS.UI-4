import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthorizationManager from './helpers/AuthorizationManager';
import Routes from './Routes';
import UserContext from './helpers/UserContext';

const App = (props) => {
  return (
    <Router>
      <AuthorizationManager>
        <UserContext.Consumer>
          {({ role, userID }) => {
            return <Routes role={role} userID={userID} />;
          }}
        </UserContext.Consumer>
      </AuthorizationManager>
    </Router>
  );
};

export default App;
