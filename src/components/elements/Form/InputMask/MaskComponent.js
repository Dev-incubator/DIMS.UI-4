/* eslint-disable no-param-reassign */
import React from 'react';
import Validator from '../../../../helpers/Validator';
import getValueFromMask from '../../../../helpers/maskHelpers/getValueFromMask';

import addMask from '../../../../helpers/maskHelpers/addMask';
import placeInputCursorToEnd from '../../../../helpers/maskHelpers/placeInputCursorToEnd';
import maskNotSpecialCharsRegex from '../../../../helpers/maskHelpers/maskNotSpecialCharsRegex';
import getUniqueItems from '../../../../helpers/getUniqueItems';
import regexpEscape from '../../../../helpers/Validator/regexpEscape';
import replaceAll from '../../../../helpers/formHelpers/replaceAll';

function MaskComponent(input, maskArray) {
  if (maskArray[input.props.value.length]) {
    if (input.props.value && input.props.value !== '') {
      return input;
    }
  }

  const handleBackspaceInMask = (event) => {
    const { target } = event;
    const { value } = event.target;
    const start = target.selectionStart - 1;
    const end = target.selectionEnd;

    const charsToDelete = regexpEscape(
      getUniqueItems(
        maskArray.filter((maskElement) => {
          return maskElement.match(maskNotSpecialCharsRegex);
        }),
      ).join(''),
    );

    const charsToDeleteRegex = new RegExp(`[^${charsToDelete}]`, 'g');

    event.target.value = replaceAll(value, start, end, charsToDeleteRegex, '_');
    event.target.setSelectionRange(start, start);

    input.props.onChange(event);
  };

  const onClick = (event) => {
    placeInputCursorToEnd(event.target, maskArray);
  };

  const onFocus = (event) => {
    event.target.value = addMask(event.target.value, maskArray);
  };

  const onKeyDown = (event) => {
    if (event.key === 'Backspace') {
      handleBackspaceInMask(event);
    }

    if (Validator.maskByChar(getValueFromMask(event.target.value) + event.key, maskArray.join(''))) {
      event.target.value = addMask(getValueFromMask(event.target.value) + event.key, maskArray);
      input.props.onChange(event);
      placeInputCursorToEnd(event.target, maskArray);
    }

    event.preventDefault();
  };

  const onBlur = (event) => {
    event.target.value = getValueFromMask(event.target.value);
  };

  return React.cloneElement(input, {
    onClick,
    onFocus,
    onKeyDown,
    onBlur,
  });
}

export default MaskComponent;
