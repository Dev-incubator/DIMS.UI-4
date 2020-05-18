import React from 'react';
import Validator from '../../../../helpers/Validator';
import InvisibleMaskComponent from './InvisibleMaskComponent';
import MaskComponent from './MaskComponent';
import maskEscapedCharsOrEmptyRegex from '../../../../helpers/maskEscapedCharsOrEmptyRegex';

function MaskedInput(input, mask, validate = false, type = 'default') {
  let resultInput = input;
  if (input.props.type === 'textarea' || input.props.type === 'select') {
    return input;
  }

  const maskArray = mask.split(maskEscapedCharsOrEmptyRegex).filter((el) => el);

  if (validate && type === 'invisible') {
    resultInput = React.cloneElement(resultInput, {
      onKeyPress: (e) => {
        if (!Validator.maskByChar(e.target.value + e.key, mask)) {
          e.preventDefault();
        }
      },
    });
  }

  return type === 'invisible' ? InvisibleMaskComponent(resultInput, maskArray) : MaskComponent(resultInput, maskArray);
}

export default MaskedInput;
