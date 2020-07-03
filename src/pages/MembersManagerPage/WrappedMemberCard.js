import React from 'react';
import PropTypes from 'prop-types';

import UserContextConsumer from '../../helpers/components/UserContextConsumer';
import MemberCard from '../../components/cards/MemberCard';

function WrappedMemberCard({
  id,
  firstName,
  lastName,
  email,
  startDate,
  direction,
  mobilePhone,
  skype,
  address,
  sex,
  birthDate,
  education,
  universityAverageScore,
  mathScore,
  collapsed,
  open,
  close,
}) {
  return (
    <UserContextConsumer>
      {({ role }) => {
        return (
          <MemberCard
            id={id}
            firstName={firstName}
            lastName={lastName}
            birthDate={birthDate}
            direction={direction}
            startDate={startDate}
            email={email}
            mobilePhone={mobilePhone}
            skype={skype}
            address={address}
            sex={sex}
            education={education}
            universityAverageScore={universityAverageScore}
            mathScore={mathScore}
            role={role}
            collapsed={collapsed}
            open={open}
            close={close}
          />
        );
      }}
    </UserContextConsumer>
  );
}

WrappedMemberCard.defaultProps = {
  open: () => {},
  close: () => {},
  collapsed: true,
};

WrappedMemberCard.propTypes = {
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  direction: PropTypes.string.isRequired,
  mobilePhone: PropTypes.string.isRequired,
  skype: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  birthDate: PropTypes.instanceOf(Date).isRequired,
  education: PropTypes.string.isRequired,
  universityAverageScore: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  mathScore: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,

  open: PropTypes.func,
  close: PropTypes.func,
  collapsed: PropTypes.bool,
};

export default WrappedMemberCard;
