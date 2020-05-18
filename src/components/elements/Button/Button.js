import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

function Button(props) {
  const { classMod, type, content, children, history, link, onClick } = props;
  function onClickHandler(event) {
    onClick ? onClick(event) : history.push(link);
  }
  return (
    <button className={`button button${`_${classMod}` || ''}`} type={type} onClick={onClickHandler}>
      {content || children}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
};

Button.propTypes = {
  type: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  history: PropTypes.any.isRequired,
  classMod: PropTypes.string,
  link: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.objectOf(PropTypes.object)]),
};

export default withRouter(Button);
