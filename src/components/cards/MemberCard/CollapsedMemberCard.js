import React from 'react';
import PropTypes from 'prop-types';

import TextBadge from '../../elements/TextBadge';
import DateBadge from '../../elements/DateBadge';
import calculateAge from '../../../helpers/calculateAge';
import compareObjects from '../../../helpers/compareObjects';

function CollapsedMemberCard(props) {
  const { firstName, lastName, birthDate, direction, startDate, onClick, collapsed } = props;
  const age = calculateAge(birthDate);

  const onClickHandler = () => {
    onClick(collapsed);
  };

  return (
    <div className='member-card__header'>
      <p role='menu' className='interactive member-card__header__title' onClick={onClickHandler}>
        <b>{firstName}</b>
        {` ${lastName}, ${age}`}
      </p>
      <DateBadge date={startDate} type={DateBadge.DateTypes.startDate} />
      <TextBadge>{direction}</TextBadge>
    </div>
  );
}

CollapsedMemberCard.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  birthDate: PropTypes.instanceOf(Date).isRequired,
  direction: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  collapsed: PropTypes.bool.isRequired,

  onClick: PropTypes.func.isRequired,
};

export default React.memo(CollapsedMemberCard, compareObjects);
