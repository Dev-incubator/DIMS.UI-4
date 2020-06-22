/* eslint-disable no-param-reassign */
import React from 'react';

import placeInputCursorToEnd from '../../../../helpers/maskHelpers/placeInputCursorToEnd';
import getMaskCharsBeforePlaceholder from '../../../../helpers/maskHelpers/getMaskCharsBeforePlaceholder';
import invisibleMaskOnInputValue from '../../../../helpers/maskHelpers/invisibleMaskOnInputValue';
import replaceSubstring from '../../../../helpers/formHelpers/replaceSubstring';

function InvisibleMaskComponent(input, maskArray) {
  const { name, onChange: inputOnChange, onBlur: inputOnBlur, onKeyPress: inputOnKeyPress } = input.props;

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
      const { value } = event.target;
      const start = target.selectionStart - 1;
      const end = target.selectionEnd;

      event.target.value = replaceSubstring(value, start, end, '');
      inputOnChange(event);
      event.preventDefault();
    }
  };

  const onChange = (event) => {
    inputOnChange(invisibleMaskOnInputValue(name, event.target.value, maskArray));
    inputOnKeyPress(event);
  };

  const onBlur = (event) => {
    inputOnBlur(event);
  };

  return React.cloneElement(input, {
    onFocus,
    onKeyDown,
    onChange,
    onBlur,
  });
}

export default InvisibleMaskComponent;
