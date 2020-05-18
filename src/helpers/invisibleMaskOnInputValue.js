import maskEscapedCharsRegex from './maskEscapedCharsRegex';

export default function invisibleMaskOnInputValue(name, value, maskArray) {
  return {
    target: {
      name,
      value: value + maskArray[value.length].replace(maskEscapedCharsRegex, '$1'),
    },
  };
}
