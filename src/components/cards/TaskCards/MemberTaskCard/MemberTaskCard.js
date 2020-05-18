import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CollapsedMemberTaskCard from './CollapsedMemberTaskCard';
import DateBadge from '../../../elements/DateBadge';
import Button from '../../../elements/Button';
import { ReactComponent as TrackIcon } from '../../../../assets/icons/Track.svg';
import { TaskEditButton } from '../../../elements/TaskForms/TaskEdit';
import { TrackButton } from '../../../elements/TaskForms/TrackForm';
import ButtonGroup from '../../../elements/ButtonGroup/ButtonGroup';
import { AssignButton } from '../../../elements/AssignForm';
import compareObjects from '../../../../helpers/compareObjects';

function MemberTaskCard(props) {
  const {
    taskName,
    taskID,
    taskDescription,
    state,
    taskStart,
    taskDeadline,
    collapsed,
    id,
    taskSet,
    role,
    assignedTo,
    members,
    open,
    close,
    edit,
  } = props;

  function onClick(collapsed) {
    collapsed ? open(id) : close(id);
  }
  console.log(props);
  return (
    <article id={id} className={`task-card ${state && `task-card_${state.toLowerCase()}`} ${collapsed ? '' : 'open'}`}>
      <CollapsedMemberTaskCard taskName={taskName} onClick={onClick} collapsed={collapsed} />
      {collapsed || (
        <>
          {state && (
            <div className='state'>
              <span>{state}</span>
            </div>
          )}

          <div className='task-card__body'>
            <div className='task-card__dates'>
              <DateBadge type={DateBadge.DateTypes.startDate} date={taskStart} />
              <DateBadge type={DateBadge.DateTypes.endDate} date={taskDeadline} />
            </div>

            <p className='task-card__description'>{taskDescription}</p>

            {role === 'admin' && taskSet === 'all' && (
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

            <ButtonGroup>
              {role === 'member' && (
                <TrackButton taskName={taskName} buttonClassMod='primary'>
                  <TrackIcon className='icon-track' />
                  <span>Track</span>
                </TrackButton>
              )}
              {(role === 'admin' || role === 'mentor') && taskSet === 'all' && (
                <AssignButton buttonClassMod='primary' assignedTo={assignedTo} members={members}>
                  <TrackIcon className='icon-tasks' />
                  <span>Assign</span>
                </AssignButton>
              )}
              {(role === 'admin' || role === 'mentor') && (
                <>
                  <Button classMod='secondary' content='Delete' />
                  <TaskEditButton buttonClassMod='secondary' {...props} show={edit} buttonContent='Edit' />
                </>
              )}
              {(role === 'admin' || role === 'mentor') && taskSet === 'user' && (
                <Button classMod='ghost' link={`/tasks/${taskID}`}>
                  Show in tasks
                </Button>
              )}
            </ButtonGroup>
          </div>
        </>
      )}
    </article>
  );
}

MemberTaskCard.defaultProps = {
  assignedTo: [],
  members: [],
};

MemberTaskCard.propTypes = {
  id: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
  collapsed: PropTypes.bool.isRequired,
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  taskSet: PropTypes.oneOf(['all', 'user']).isRequired,
  role: PropTypes.string.isRequired,
  assignedTo: PropTypes.arrayOf(
    PropTypes.shape({ userID: PropTypes.string, firstName: PropTypes.string, lastName: PropTypes.string }),
  ),
  members: PropTypes.arrayOf(
    PropTypes.shape({ userID: PropTypes.string, firstName: PropTypes.string, lastName: PropTypes.string }),
  ),

  taskName: PropTypes.string.isRequired,
  taskDescription: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  taskStart: PropTypes.instanceOf(Date).isRequired,
  taskDeadline: PropTypes.instanceOf(Date).isRequired,
};

export default React.memo(MemberTaskCard, compareObjects);
