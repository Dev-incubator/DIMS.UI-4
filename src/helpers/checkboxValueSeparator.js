export default function checkboxValueSeparator(value) {
  return typeof value === 'string' ? value.split(',') : value;
}
