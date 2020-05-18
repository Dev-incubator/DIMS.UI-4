export default function checkFormNames(inputs) {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs.slice(i + 1).findIndex((anotherInput) => inputs[i].name === anotherInput.name) !== -1) {
      return false;
    }
  }
  return true;
}
