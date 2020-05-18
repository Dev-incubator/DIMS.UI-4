import maskSpecialCharsRegex from './maskSpecialCharsRegex';
import maskEscapedCharsRegex from './maskEscapedCharsRegex';

export default function addMask(string, maskArray) {
  const mask = string.length ? maskArray.slice(string.length).join('') : maskArray.join('');
  return string + mask.replace(maskSpecialCharsRegex, '_').replace(maskEscapedCharsRegex, '$1');
}
