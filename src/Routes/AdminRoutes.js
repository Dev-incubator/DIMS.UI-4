import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Error404Page } from '../pages/ErrorPages';
import MembersManagerPage from '../pages/MembersManagerPage';
import MemberTasksPage from '../pages/MemberTasksPage';
import MemberProgressPage from '../pages/MemberProgressPage';
import NewTask from '../pages/NewTask';
import NewMember from '../pages/NewMember';

function AdminRoutes({ userId }) {
  return (
    <Switch>
      <Route exact path='/'>
        <Redirect to='/members' />
      </Route>
      <Route exact path='/members'>
        <MembersManagerPage />
      </Route>
      <Route exact path='/members/:id/tasks'>
        <MemberTasksPage taskSet='user' />
      </Route>
      <Route exact path='/members/:id/tasks/id:open?'>
        <MemberTasksPage taskSet='user' />
      </Route>
      <Route exact path='/members/:id/progress'>
        <MemberProgressPage />
      </Route>

      <Route exact path='/members/new'>
        <NewMember />
      </Route>

      <Route exact path='/tasks/'>
        <MemberTasksPage />
      </Route>
      <Route path='/tasks/new'>
        <NewTask />
      </Route>
      <Route exact path='/tasks/id:open?'>
        <MemberTasksPage />
      </Route>
      <Route path='/tasks/id:open/edit'>
        <MemberTasksPage edit />
      </Route>

      <Route exact path='/404'>
        <Error404Page />
      </Route>

      <Route>
        <Redirect to='/404' />
      </Route>
    </Switch>
  );
}

AdminRoutes.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default AdminRoutes;
