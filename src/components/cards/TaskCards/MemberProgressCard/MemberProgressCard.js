import React from 'react';
import PropTypes from 'prop-types';

import CollapsibleCard from '../../CollapsibleCard';
import DateBadge from '../../../elements/DateBadge';
import compareObjects from '../../../../helpers/compareObjects';
import dateTypes from '../../../../helpers/dateTypes';

function MemberProgressCard(props) {
  const { taskName, trackNote, trackDate, collapsed, id, open, close } = props;

  return (
    <CollapsibleCard.Card
      id={id}
      className='task-progress'
      cardClass='task'
      collapsed={collapsed}
      open={open}
      close={close}
    >
      <CollapsibleCard.Header>
        <CollapsibleCard.Title>{taskName}</CollapsibleCard.Title>
        <DateBadge type={dateTypes.trackStart} date={trackDate} />
      </CollapsibleCard.Header>
      <CollapsibleCard.Body>
        <CollapsibleCard.Description>{trackNote}</CollapsibleCard.Description>
      </CollapsibleCard.Body>
    </CollapsibleCard.Card>
  );
}

MemberProgressCard.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,

  taskName: PropTypes.string.isRequired,
  trackNote: PropTypes.string.isRequired,
  trackDate: PropTypes.instanceOf(Date).isRequired,
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  memberTaskId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default React.memo(MemberProgressCard, compareObjects);
