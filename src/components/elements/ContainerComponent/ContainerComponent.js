import React from 'react';
import PropTypes from 'prop-types';

function ContainerComponent(props) {
  const { fullwidth, display, children, className } = props;
  return (
    <div className={`container${fullwidth ? ' fullwidth' : ''}${` ${display}`}${` ${className}`}`}>{children}</div>
  );
}

ContainerComponent.defaultProps = {
  display: '',
  className: '',
};

ContainerComponent.propTypes = {
  fullwidth: PropTypes.bool.isRequired,
  children: PropTypes.any,
  display: PropTypes.string,
  className: PropTypes.string,
};

export default ContainerComponent;
