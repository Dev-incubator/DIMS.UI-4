import React from 'react';
import UserContextConsumer from '../../helpers/components/UserContextConsumer';
import MemberTaskCard from '../../components/cards/TaskCards/MemberTaskCard';

export default function wrappedMemberTask({
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
