import React from 'react';
import PropTypes from 'prop-types';

function CollapsibleCardDescription(props) {
  const { children, cardClass } = props;
  return <div className={`${cardClass}-card__description`}>{children}</div>;
}

CollapsibleCardDescription.defaultProps = {
  cardClass: '',
};

CollapsibleCardDescription.propTypes = {
  cardClass: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default CollapsibleCardDescription;
