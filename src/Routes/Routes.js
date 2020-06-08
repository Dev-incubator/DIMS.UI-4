import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import MentorRoutes from './MentorRoutes';
import AdminRoutes from './AdminRoutes';
import MemberRoutes from './MemberRoutes';
import useScrollToTop from '../helpers/hooks/useScrollToTop';

function Routes(props) {
  const { role, userId, location } = props;

  useScrollToTop({ location });

  return (
    <>
      {role === 'member' && <MemberRoutes userId={userId} />}

      {role === 'mentor' && <MentorRoutes userId={userId} />}

      {role === 'admin' && <AdminRoutes userId={userId} />}
    </>
  );
}

Routes.propTypes = {
  role: PropTypes.string.isRequired,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(Routes);
