import React from 'react';
import PropTypes from 'prop-types';

import UserContextConsumer from '../../helpers/components/UserContextConsumer';
import MemberTaskCard from '../../components/cards/TaskCards/MemberTaskCard';

function WrappedMemberTask({
  collapsed,
  id,
  taskSet,
  members,
  edit,
  open,
  close,
  update,
  taskId,
  taskName,
  taskDescription,
  status,
  taskStart,
  taskDeadline,
  assignedTo,
}) {
  return (
    <UserContextConsumer>
      {({ userId, role }) => {
        return (
          <MemberTaskCard
            id={id}
            edit={edit}
            userId={userId}
            taskId={taskId}
            taskName={taskName}
            members={members}
            taskDescription={taskDescription}
            status={status}
            taskStart={taskStart}
            taskDeadline={taskDeadline}
            taskSet={taskSet}
            role={role}
            open={open}
            close={close}
            collapsed={collapsed}
            assignedTo={assignedTo}
            reload={update}
          />
        );
      }}
    </UserContextConsumer>
  );
}

WrappedMemberTask.defaultProps = {
  assignedTo: [],
  members: [],
  status: null,
};

WrappedMemberTask.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  taskId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  edit: PropTypes.bool.isRequired,
  collapsed: PropTypes.bool.isRequired,
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  taskSet: PropTypes.oneOf(['all', 'user']).isRequired,
  update: PropTypes.func.isRequired,
  taskName: PropTypes.string.isRequired,
  taskDescription: PropTypes.string.isRequired,
  status: PropTypes.string,
  taskStart: PropTypes.instanceOf(Date).isRequired,
  taskDeadline: PropTypes.instanceOf(Date).isRequired,
  assignedTo: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string,
      memberTaskId: PropTypes.string,
    }),
  ),
  members: PropTypes.objectOf(
    PropTypes.shape({
      userId: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
  ),
};

export default WrappedMemberTask;
