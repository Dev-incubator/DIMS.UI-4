import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import CollapsedTaskTrackCard from './CollapsedTaskTrackCard';
import Button from '../../../elements/Button';
import { TrackButton } from '../../../elements/TaskForms/TrackForm';
import ButtonGroup from '../../../elements/ButtonGroup/ButtonGroup';

function TaskTrackCard(props) {
  const { taskName, trackNote, trackDate, collapsed, id, memberTaskID } = props;

  function onClick(collapsed) {
    collapsed ? props.open(id) : props.close(id);
  }

  return (
    <article className={`task-card ${collapsed ? '' : 'open'}`}>
      <CollapsedTaskTrackCard taskName={taskName} trackDate={trackDate} onClick={onClick} collapsed={collapsed} />
      {collapsed || (
        <>
          <div className='task-card__body'>
            <p className='task-card__description'>{trackNote}</p>
            <ButtonGroup>
              <Button classMod='secondary' content='Delete' />
              <TrackButton
                buttonClassMod='secondary'
                taskName={taskName}
                trackDate={trackDate}
                trackNote={trackNote}
                buttonContent='Edit'
              />
              <Button
                classMod='ghost'
                link={`/members/${props.match.params.id}/tasks/${memberTaskID}`}
                content='Show in tasks'
              />
            </ButtonGroup>
          </div>
        </>
      )}
    </article>
  );
}

TaskTrackCard.propTypes = {
  id: PropTypes.string.isRequired,
  memberTaskID: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,

  taskName: PropTypes.string.isRequired,
  trackNote: PropTypes.string.isRequired,
  trackDate: PropTypes.instanceOf(Date).isRequired,
};

function areEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}

export default withRouter(React.memo(TaskTrackCard, areEqual));
