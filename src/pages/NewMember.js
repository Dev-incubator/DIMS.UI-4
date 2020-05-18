import React from 'react';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import MemberEdit from '../components/elements/MemberInfo/MemberEdit';
import ContainerComponent from '../components/elements/ContainerComponent/ContainerComponent';
import UserContext from '../helpers/UserContext';
import Header from '../components/elements/Header/Header';
import getNavItems from '../helpers/getNavItems';

function NewMember(props) {
  return (
    <>
      <Helmet>
        <title>New member</title>
      </Helmet>
      <UserContext>
        {({ role, userID }) => {
          return <Header role={role} title='New member' navItems={getNavItems({ role, userID }, props.match.path)} />;
        }}
      </UserContext>
      <ContainerComponent>
        <MemberEdit empty />
      </ContainerComponent>
    </>
  );
}
export default withRouter(NewMember);
