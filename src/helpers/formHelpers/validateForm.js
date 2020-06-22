import findInputByName from './findInputByName';

export default function checkValidity(values, inputs, onValidationFail) {
  let input;
  Object.keys(values).forEach((valueName) => {
    input = findInputByName(inputs, valueName);
    if (values[valueName].required && !values[valueName].value) {
      onValidationFail(input);
    }
    if (input.validator && !input.validator(values[valueName].value)) {
      onValidationFail(input);
    }
  });
  return true;
}
