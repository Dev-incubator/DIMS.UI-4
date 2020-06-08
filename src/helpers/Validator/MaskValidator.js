import regexpEscape from './regexpEscape';
import maskEscapedCharsOrEmptyRegex from '../maskHelpers/maskEscapedCharsOrEmptyRegex';

const MaskValidator = {
  /* *
   * Mask template:
   * 9 - number [0,9]
   * a - letter [a,z]
   * A - letter [A,Z]
   * h - hex number [0,f]
   * % - any not alphanumeric character
   * # - any symbol
   *
   * Other symbols are considered as static
   * To escape special mask characters use '\\': 'a\\', 'h\\', '9\\', '#\\', '?\\','\\\\'
   */

  maskValidator: (input, mask) => {
    if (MaskValidator.lastMask[mask]) {
      if (Object.keys(MaskValidator.lastMask).length >= 10) {
        MaskValidator.lastMask = {};
      }

      let regexp;
      regexp = mask.replace(/9(?!\\(?!\\))/g, '[0-9]');
      regexp = regexp.replace(/a(?!\\(?!\\))/g, '[a-z]');
      regexp = regexp.replace(/A(?!\\(?!\\))/g, '[A-Z]');
      regexp = regexp.replace(/h(?!\\(?!\\))/g, '[0-9a-fA-F]');
      regexp = regexp.replace(/%(?!\\(?!\\))/g, '[^0-9a-zA-Z]');
      regexp = regexp.replace(/#(?!\\(?!\\))/g, '.');
      regexp = regexp.replace(/([9aAh%#])\\(?!\\)/g, '$1');

      MaskValidator.lastMask[mask] = `^${regexp}$`;
    }

    return new RegExp(regexpEscape(MaskValidator.lastMask[mask])).test(input);
  },

  lastMask: {},

  maskByChar: (input, mask) => {
    const maskArray = mask.split(maskEscapedCharsOrEmptyRegex).filter((el) => !!el);

    const currMaskEl = maskArray[input.length - 1];

    if (!currMaskEl) {
      return false;
    }

    let regexp;
    switch (currMaskEl) {
      case '9':
        regexp = '[0-9]';
        break;
      case 'a':
        regexp = '[a-z]';
        break;
      case 'A':
        regexp = '[A-Z]';
        break;
      case 'h':
        regexp = '[0-9a-fA-F]';
        break;
      case '%':
        regexp = '[^0-9a-zA-Z]';
        break;
      case '#':
        regexp = '.';
        break;
      default:
        regexp = currMaskEl.match(/([9aAh%#\\])\\/);
        regexp = regexp ? regexp[0] : currMaskEl;
    }

    return new RegExp(regexp).test(input[input.length - 1]);
  },
};

export default MaskValidator;
