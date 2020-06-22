/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Spring } from 'react-spring/renderprops';

function CustomSpring({ children, animationDelay, from, to }) {
  return (
    <Spring config={{ duration: 50, delay: animationDelay }} from={from} to={to}>
      {children}
    </Spring>
  );
}

CustomSpring.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  animationDelay: PropTypes.number.isRequired,
  from: PropTypes.object.isRequired,
  to: PropTypes.object.isRequired,
};

export default CustomSpring;
