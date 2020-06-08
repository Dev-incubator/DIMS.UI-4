import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import preloadTheme from '../preloadTheme';
import requestAndFetch from '../../redux/middleware/requestAndFetch';
import * as membersActions from '../../redux/actions/membersActions';
import * as assignedTasksActions from '../../redux/actions/assignedTasksActions';
import Client from '../Client';

const usePreloader = ({ members, role }) => {
  const dispatch = useDispatch();
  preloadTheme();
  Client.getDirections();

  useEffect(() => {
    if (role !== 'member' && role !== 'guest') {
      requestAndFetch(dispatch, membersActions.setMembers, Client.getMembers);
    }
  }, [role, dispatch]);

  useEffect(() => {
    if (role !== 'member' && role !== 'guest') {
      requestAndFetch(dispatch, assignedTasksActions.setAssignedToTasks, Client.getAllAssigned);
    }
  }, [role, members, dispatch]);

  return null;
};

export default usePreloader;
