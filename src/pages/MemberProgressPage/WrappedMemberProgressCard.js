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

WrappedMemberProgressCard.defaultProps = {
  open: () => {},
  close: () => {},
  collapsed: true,
};

WrappedMemberProgressCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  open: PropTypes.func,
  close: PropTypes.func,
  collapsed: PropTypes.bool,

  taskName: PropTypes.string.isRequired,
  trackNote: PropTypes.string.isRequired,
  trackDate: PropTypes.instanceOf(Date).isRequired,
};

export default WrappedMemberProgressCard;
