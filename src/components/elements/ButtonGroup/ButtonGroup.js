import React from 'react';
import PropTypes from 'prop-types';

function ButtonGroup(props) {
  const { children } = props;
  return <div className='button-block'>{children}</div>;
}

ButtonGroup.defaultProps = {
  children: null,
};

ButtonGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default ButtonGroup;
