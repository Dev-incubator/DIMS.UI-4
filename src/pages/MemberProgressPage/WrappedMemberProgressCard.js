import React from 'react';
import PropTypes from 'prop-types';

import MemberProgressCard from '../../components/cards/TaskCards/MemberProgressCard';

function WrappedMemberProgressCard({ id, taskName, trackNote, trackDate, collapsed, open, close }) {
  return (
    <MemberProgressCard
      id={id}
      taskName={taskName}
      trackNote={trackNote}
      trackDate={trackDate}
      collapsed={collapsed}
      open={open}
      close={close}
    />
  );
}

WrappedMemberProgressCard.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,

  taskName: PropTypes.string.isRequired,
  trackNote: PropTypes.string.isRequired,
  trackDate: PropTypes.instanceOf(Date).isRequired,
};

export default WrappedMemberProgressCard;
