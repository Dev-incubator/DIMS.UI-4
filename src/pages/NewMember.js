import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';

import MemberEdit from '../components/elements/MemberInfo/MemberEdit';
import ContainerComponent from '../components/elements/ContainerComponent/ContainerComponent';
import UserContextConsumer from '../helpers/components/UserContextConsumer';
import Header from '../components/elements/Header/Header';
import getNavItems from '../helpers/getNavItems';
import Client from '../helpers/Client';
import Validator from '../helpers/Validator';
import Spinner from '../components/elements/Spinner/Spinner';
import { addMember } from '../redux/actions/membersActions';
import Footer from '../components/elements/Footer';
import masks from '../helpers/maskHelpers/masks';
import removeArrayItems from '../helpers/removeArrayItems';
import getStateMembers from '../helpers/getStateMembers';
import compareObjects from '../helpers/compareObjects';

const NewMember = ({ members, match }) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const postMember = async ({
    firstName,
    lastName,
    email,
    skype,
    mobilePhone,
    address,
    sex,
    startDate,
    birthDate,
    direction,
    education,
    universityAverageScore,
    mathScore,
  }) => {
    setLoading(true);
    const calculatedStartDate = Validator.parseDateByMask(startDate, masks.date);
    const calculatedBirthDate = Validator.parseDateByMask(birthDate, masks.date);

    await Client.postMember(
      firstName,
      lastName,
      email,
      direction,
      sex,
      education,
      calculatedBirthDate,
      universityAverageScore,
      mathScore,
      address,
      mobilePhone,
      skype,
      calculatedStartDate,
    )
      .then((response) => {
        setLoading(false);
        return response;
      })
      .catch((response) => {
        setLoading(false);
        return response;
      });

    const addedMemberId = removeArrayItems(
      Object.keys(await Client.getMembers()),
      Object.keys(members),
      compareObjects,
    )[0];

    dispatch(
      addMember({
        id: addedMemberId,
        firstName,
        lastName,
        email,
        skype,
        mobilePhone,
        address,
        sex,
        startDate: calculatedStartDate,
        birthDate: calculatedBirthDate,
        direction,
        education,
        universityAverageScore,
        mathScore,
      }),
    );
  };

  return (
    <>
      <Helmet>
        <title>New member</title>
      </Helmet>
      <UserContextConsumer>
        {({ role, userId }) => {
          return (
            <Header
              role={role}
              title='New member'
              navItems={getNavItems(
                {
                  role,
                  userId,
                },
                match.path,
              )}
            />
          );
        }}
      </UserContextConsumer>
      <main>
        <ContainerComponent>
          {!loading ? <MemberEdit empty onSubmit={postMember} /> : <Spinner centered />}
        </ContainerComponent>
      </main>
      <Footer />
    </>
  );
};

NewMember.propTypes = {
  members: PropTypes.objectOf(PropTypes.object).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};

export default withRouter(connect(getStateMembers)(NewMember));
