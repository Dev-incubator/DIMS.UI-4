import React from 'react';

import maskSpecialCharsRegex from '../../../../helpers/maskSpecialCharsRegex';
import placeInputCursorToEnd from '../../../../helpers/placeInputCursorToEnd';
import getMaskCharsBeforePlaceholder from '../../../../helpers/getMaskCharsBeforePlaceholder';
import invisibleMaskOnInputValue from '../../../../helpers/invisibleMaskOnInputValue';

function InvisibleMaskComponent(input, maskArray) {
  const onFocus = (event) => {
    if (!event.target.value || event.target.value === '') {
      event.target.value = getMaskCharsBeforePlaceholder(maskArray);
      placeInputCursorToEnd(event.target, maskArray);
    }
  };

  const onKeyDown = (event) => {
    if (event.key.includes('Arrow') || event.key === 'Delete') {
      event.preventDefault();
    }
    if (event.key === 'Backspace') {
      const { target } = event;
      let { value } = event.target;
      const start = target.selectionStart - 1;
      const end = target.selectionEnd;
      value = value.split('');
      value.splice(start, end - start, '');
      event.target.value = value.join('');
      event.preventDefault();
    }
    if (maskArray[input.props.value.length]) {
      if (!maskSpecialCharsRegex.test(maskArray[input.props.value.length])) {
        input.props.onInput(invisibleMaskOnInputValue(input.props.name, input.props.value, maskArray));
      }
    }
  };

  return React.cloneElement(input, {
    onFocus,
    onKeyDown,
  });
}

export default InvisibleMaskComponent;
