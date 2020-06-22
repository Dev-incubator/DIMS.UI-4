import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

function Button(props) {
  const { classMod, type, content, children, history, link, onClick } = props;

  function onClickHandler(event) {
    return onClick ? onClick(event) : history.push(link);
  }

  return (
    // eslint-disable-next-line react/button-has-type
    <button className={`button button${`_${classMod}` || ''}`} type={type} onClick={onClickHandler}>
      {content || children}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
  classMod: 'primary',
  link: '#',
  content: null,
  children: null,
  onClick: null,
};

Button.propTypes = {
  type: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  classMod: PropTypes.string,
  link: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onClick: PropTypes.func,
};

export default withRouter(Button);
