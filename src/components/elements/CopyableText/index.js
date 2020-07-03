import React from 'react';
import PropTypes from 'prop-types';
import notify from '../../../helpers/formHelpers/notify';

function CopyableText({ paragraph, children }) {
  let keyHolded = false;
  const startTimer = () => {
    setTimeout(() => {
      keyHolded = true;
    }, 500);
  };
  const copy = (event) => {
    if (keyHolded) {
      const copyText = event.target;
      const textArea = document.createElement('textarea');
      textArea.value = copyText.textContent;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('Copy');
      textArea.remove();
      keyHolded = false;
      notify('info', 'Text copied!');
    }
  };

  if (paragraph) {
    return (
      <p onTouchStart={startTimer} onTouchEnd={copy}>
        {children}
      </p>
    );
  }
  return (
    <span onTouchStart={startTimer} onTouchEnd={copy}>
      {children}
    </span>
  );
}

CopyableText.defaultProps = {
  paragraph: false,
};

CopyableText.propTypes = {
  paragraph: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

export default CopyableText;
