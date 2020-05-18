import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

function ButtonGroup(props) {
  const { children } = props;
  return <div className='button-block'>{children}</div>;
}

ButtonGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.instanceOf(Button)).isRequired,
};

export default ButtonGroup;
