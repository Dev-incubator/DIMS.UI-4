import maskSpecialCharsRegex from './maskSpecialCharsRegex';

export default function placeInputCursorToEnd(target, maskArray) {
  const firstPlaceholder = maskArray.findIndex((el) => maskSpecialCharsRegex.test(el));
  target.setSelectionRange(firstPlaceholder + 1, firstPlaceholder + 1);
}
