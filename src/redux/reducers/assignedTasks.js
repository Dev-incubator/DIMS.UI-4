import * as types from '../actionTypes';
import removeArrayItems from '../../helpers/removeArrayItems';
import compareObjects from '../../helpers/compareObjects';

const initialState = {};

export default function assignedTasks(state = initialState, action) {
  switch (action.type) {
    case types.ASSIGN_TASK:
      return assignTask(state, action.taskId, action.userIds);
    case types.UNASSIGN_TASK:
      return unassignTask(state, action.taskId, action.userIds);
    case types.SET_ASSIGNED_TO_TASK:
      return setAssignedToTask(state, action.associativeArray);
    default:
      return state;
  }
}

function assignTask(state, taskId, userIds) {
  let newState = { ...state };
  if (!state || !Object.keys(state).length) {
    newState = { [taskId]: [] };
  }

  if (!newState[taskId]) {
    newState[taskId] = userIds;
    return newState;
  }

  newState[taskId].push(...userIds);
  return newState;
}

function unassignTask(state, taskId, userIds) {
  const newState = { ...state };
  if (!state || !Object.keys(state).length || !newState[taskId] || !newState[taskId].length) {
    return state;
  }

  newState[taskId] = removeArrayItems(newState[taskId], userIds, compareObjects);
  return newState;
}

function setAssignedToTask(state, associativeArray) {
  const newState = { ...associativeArray };

  if (
    !associativeArray ||
    !Object.entries(associativeArray).every(([value, index]) => {
      return typeof value === 'string' && index instanceof Array;
    })
  ) {
    return state;
  }

  return newState;
}
