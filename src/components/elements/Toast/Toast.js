import React from 'react';
import PropTypes from 'prop-types';

function Toast(props) {
  const { type, title, message } = props;
  return (
    <article className={`toast toast_${type}`}>
      <div className='toast__header'>{title}</div>
      <div className='toast__body'>{message}</div>
    </article>
  );
}

Toast.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
export default Toast;
