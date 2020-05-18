export default function getValueFromMask(mask) {
  const firstPlaceholder = mask.indexOf('_');
  return mask.slice(0, firstPlaceholder < 0 ? mask.length : firstPlaceholder);
}
