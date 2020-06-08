import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import AuthorizationManager from './helpers/components/AuthorizationManager';
import Routes from './Routes';
import store from './redux';
import UserContextConsumer from './helpers/components/UserContextConsumer';
import usePreloader from './helpers/hooks/usePreloader';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AuthorizationManager onAuth={usePreloader}>
          <UserContextConsumer>
            {({ role, userId }) => {
              return <Routes role={role} userId={userId} />;
            }}
          </UserContextConsumer>
        </AuthorizationManager>
      </Router>
    </Provider>
  );
};

export default App;
