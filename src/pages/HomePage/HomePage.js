/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from '../../components/elements/Header';
import getNavItems from '../../helpers/getNavItems';
import background from '../../assets/images/devinc.gif';
import ContainerComponent from '../../components/elements/ContainerComponent';

function HomePage({ match }) {
  return (
    <>
      <Helmet>
        <title>DIMSUI Home</title>
      </Helmet>
      <Header title='Home' navItems={getNavItems({ role: 'guest', userId: '' }, match.path)} />
      <main>
        <ContainerComponent className='main-container' display='flex'>
          <img className='bgMain' width='886' height='924' src={background} alt='DIMSUI' title='DIMSUI' />
          <div className='homepage-text__background'>
            <div className='homepage-text'>
              <h2>Hi, dear friend!</h2>
              <p>
                Welcome to the &quot;Dev Incubator Management System&quot; or&nbsp;more&nbsp;briefly
                <strong> DIMSUI</strong>.
              </p>
              <h2>What is the DIMSUI?</h2>
              <p>In the few words, it is a system for getting tasks and&nbsp;tracking&nbsp;time.</p>
              <p>System is useful for you if you:</p>
              <ul>
                <li>
                  <strong>Admin</strong>, to manage and create new members.
                </li>
                <li>
                  <strong>Mentor</strong>, to create and assign tasks, see member&apos;s progress.
                </li>
                <li>
                  <strong>Member</strong>, to see own tasks and manage subtasks.
                </li>
              </ul>
            </div>
          </div>
        </ContainerComponent>
      </main>
    </>
  );
}

HomePage.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};

export default withRouter(HomePage);
