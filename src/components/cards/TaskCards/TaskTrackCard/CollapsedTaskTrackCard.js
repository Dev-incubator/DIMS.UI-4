import React from 'react';
import PropTypes from 'prop-types';
import DateBadge from '../../../elements/DateBadge';
import compareObjects from '../../../../helpers/compareObjects';

function CollapsedTaskTrackCard(props) {
  const { taskName, trackDate, onClick, collapsed } = props;

  const onClickHandler = () => {
    onClick(collapsed);
  };

  return (
    <div className='task-card__header'>
      <p role='menu' className='interactive task-card__title' onClick={onClickHandler}>
        {taskName}
      </p>
      <DateBadge type='trackStart' date={trackDate} />
    </div>
  );
}

CollapsedTaskTrackCard.propTypes = {
  taskName: PropTypes.string.isRequired,
  trackDate: PropTypes.instanceOf(Date).isRequired,
  collapsed: PropTypes.bool.isRequired,

  onClick: PropTypes.func.isRequired,
};

export default React.memo(CollapsedTaskTrackCard, compareObjects);
