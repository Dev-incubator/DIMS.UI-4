import React from 'react';
import PropTypes from 'prop-types';
import Validator from '../../../helpers/Validator';

function MaskedInput(input, mask, validate = false, type = 'default') {
  let resultInput = input;
  console.log(validate);
  console.log(input.props.value);
  if (input.props.type === 'textarea' || input.props.type === 'select') {
    throw Error('TextArea and SelectInput do not support input mask');
  }
  const maskArray = mask.split(/(a\\(?!\\))|(h\\(?!\\))|(#\\(?!\\))|(9\\(?!\\))|(\\\\)|()/).filter((el) => el);
  if (validate && type === 'invisible') {
    resultInput = React.cloneElement(resultInput, {
      onKeyPress: (e) => {
        if (!Validator.maskByChar(e.target.value + e.key, mask)) {
          e.preventDefault();
        }
      },
    });
  }
  switch (type) {
    case 'invisible':
      return followInvisibleMask(resultInput, maskArray);
    default:
      return followMask(resultInput, maskArray);
  }
}

function followInvisibleMaskComponent(input, maskArray) {
  return React.cloneElement(input, {
    onFocus: (event) => {
      if (!event.target.value || event.target.value === '') {
        const firstPlaceholder = maskArray.findIndex((el) => /[9aAh%#](?!(\\)(?!\\))/.test(el));
        event.target.value = maskArray
          .splice(0, firstPlaceholder)
          .join('')
          .replace(/([9aAh%#])\\(?!\\)/s, '$1');
        event.target.setSelectionRange(firstPlaceholder + 1, firstPlaceholder + 1);
      }
    },
    onKeyDown: (event) => {
      if (event.key.includes('Arrow')) {
        event.preventDefault();
      }
      if (event.key === 'Delete') {
        event.preventDefault();
      }
      if (event.key === 'Backspace' /*backspace */) {
        const target = event.target;
        let { value } = event.target;
        const start = target.selectionStart - 1;
        const end = target.selectionEnd;
        value = value.split('');
        value.splice(start, end - start, '');
        event.target.value = value.join('');
        event.preventDefault();
      }
    },
  });
}

function followInvisibleMask(input, maskArray) {
  if (maskArray[input.props.value.length]) {
    if ((input.props.value && input.props.value !== '') || /[9aAh%#](?!(\\)(?!\\))/.test(maskArray[0])) {
      if (!/[9aAh%#](?!(\\)(?!\\))/.test(maskArray[input.props.value.length])) {
        input.props.onInput({
          target: {
            name: input.props.name,
            value: input.props.value + maskArray[input.props.value.length].replace(/([9aAh%#])\\(?!\\)/, '$1'),
          },
        });
      }
    }
  }
  return followInvisibleMaskComponent(input, maskArray);
}

function followMaskComponent(input, maskArray) {
  function selectLast(target) {
    const firstPlaceholder = target.value.indexOf('_');
    target.setSelectionRange(firstPlaceholder, firstPlaceholder);
  }
  return React.cloneElement(input, {
    onClick: (event) => {
      selectLast(event.target);
    },
    onFocus: (event) => {
      event.target.value = addMask(event.target.value, maskArray);
    },
    onKeyDown: (event) => {
      if (event.key.includes('Arrow')) {
        event.preventDefault();
      }
      if (event.key === 'Delete') {
        event.preventDefault();
      }
      if (event.key === 'Backspace' /*backspace */) {
        const target = event.target;
        let { value } = event.target;
        const start = target.selectionStart - 1;
        const end = target.selectionEnd;
        value = value.split('');
        value.splice(
          start,
          end - start,
          target.value.substring(start, end).replace(
            new RegExp(
              `[^${maskArray
                .filter((el, i, arr) => !arr.slice(i + 1).includes(el))
                .join('')
                .replace(/[9aAh%#](?!(\\)(?!\\))/g, '')
                .replace(/([9aAh%#])\\(?!\\)/, '$1')}]+`,
              'g',
            ),
            '_',
          ),
        );
        event.target.value = value.join('');
        event.target.setSelectionRange(start, end - 1);
        event.preventDefault();
      }
    },
    onKeyPress: (event) => {
      if (
        Validator.maskByChar(
          event.target.value.slice(0, event.target.value.indexOf('_')) + event.key,
          maskArray.join(''),
        )
      ) {
        event.target.value = addMask(
          event.target.value.slice(0, event.target.value.indexOf('_')) + event.key,
          maskArray,
        );
        input.props.onKeyPress(event);
        input.props.onInput(event);
        selectLast(event.target);
      }
      event.preventDefault();
    },
    onBlur: (event) => {
      const firstPlaceholder = event.target.value.indexOf('_');
      event.target.value = event.target.value.slice(0, firstPlaceholder);
      input.props.onBlur(event);
      console.log(firstPlaceholder);
      event.target.setSelectionRange(firstPlaceholder, firstPlaceholder);
    },
  });
}

function followMask(input, maskArray) {
  const changedInput = followMaskComponent(input, maskArray);
  if (maskArray[input.props.value.length]) {
    if (!input.props.value || input.props.value === '') {
      return changedInput;
    }
    // if (!/[9aAh%#](?!(\\)(?!\\))/.test(maskArray[input.props.value.length])) {
    //   changedInput.props.onInput({
    //     target: {
    //       name: input.props.name,
    //       value: input.props.value + maskArray[input.props.value.length].replace(/([9aAh%#])\\(?!\\)/g, '$1'),
    //     },
    //   });
    // }
  }
  return changedInput;
}

function addMask(string, maskArray) {
  const mask = string.length ? maskArray.slice(string.length).join('') : maskArray.join('');
  return string + mask.replace(/[9aAh%#](?!(\\)(?!\\))/g, '_').replace(/([9aAh%#])\\(?!\\)/, '$1');
}
// MaskedInput.defaultProps = {
//   type: 'default',
// };

// MaskedInput.propTypes = {
//   type: PropTypes.oneOf(['invisible', 'default']),
//   children:
// };

export default MaskedInput;
