import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CollapsedMemberTaskCard from './CollapsedMemberTaskCard';
import DateBadge from '../../elements/DateBadge';
import Button from '../../elements/Button';
import { ReactComponent as TrackIcon } from '../../../assets/icons/Track.svg';
import { Link, withRouter } from 'react-router-dom';
import TaskEditButton from '../../elements/TaskEditButton';

function MemberTaskCard(props) {
  const {
    taskName,
    taskDescription,
    state,
    taskStart,
    taskDeadline,
    collapsed,
    id,
    feature,
    assignedTo,
    taskID,
  } = props;
  function onClick() {
    if (collapsed) {
      props.open(id);
    } else {
      props.close(id);
    }
  }
  console.log(props.match.params);

  return (
    <article id={id} className={`task-card ${state && `task-card_${state.toLowerCase()}`} ${collapsed ? '' : 'open'}`}>
      <CollapsedMemberTaskCard taskName={taskName} onClick={onClick} />
      {collapsed || (
        <>
          {state && (
            <div className='state'>
              <span>{state}</span>
            </div>
          )}
          <div className='task-card__body'>
            <div className='task-card__dates'>
              <DateBadge type='startDate' date={taskStart} />
              <DateBadge type='endDate' date={taskDeadline} />
            </div>
            <p className='task-card__description'>{taskDescription}</p>
            {feature === 'assign' && (
              <>
                <h3>Assigned to:</h3>
                <ul className='inline-list'>
                  {assignedTo.map((user) => (
                    <li>
                      <Link to={`/members/${user.userID}/tasks/${user.memberTaskID}`}>
                        <b>{user.firstName}</b>
                        {` ${user.lastName}`}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <div className='button-block'>
              {feature === 'track' && (
                <Button classMod='primary'>
                  <TrackIcon className='icon-track' />
                  <span>Track</span>
                </Button>
              )}
              {feature === 'assign' && (
                <Button classMod='primary'>
                  <TrackIcon className='icon-tasks' />
                  <span>Assign</span>
                </Button>
              )}
              <Button classMod='secondary' content='Delete' />

              <TaskEditButton {...props} show={props.match && props.match.params.open === id} />
            </div>
          </div>
        </>
      )}
    </article>
  );
}

MemberTaskCard.defaultTypes = {
  assignedTo: [],
};

MemberTaskCard.propTypes = {
  id: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  feature: PropTypes.oneOf(['track', 'assign']).isRequired,
  assignedTo: PropTypes.arrayOf(
    PropTypes.shape({ userID: PropTypes.string, firstName: PropTypes.string, lastName: PropTypes.string }),
  ),

  taskName: PropTypes.string.isRequired,
  taskDescription: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  taskStart: PropTypes.instanceOf(Date).isRequired,
  taskDeadline: PropTypes.instanceOf(Date).isRequired,
};

export default withRouter(MemberTaskCard);
