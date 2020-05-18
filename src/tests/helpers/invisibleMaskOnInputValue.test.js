import invisibleMaskOnInputValue from '../../helpers/invisibleMaskOnInputValue';

describe('invisibleMaskOnInputValue', () => {
  test('Return value is object with correct structure', () => {
    const result = invisibleMaskOnInputValue('name', 'value', ['v', 'a', 'l', 'u', 'e', 's']);
    expect(result).toHaveProperty('target');
    expect(result.target).toHaveProperty('name');
    expect(result.target).toHaveProperty('value');
  });
  test('Return value must add not placeholder characters to input', () => {
    const result = invisibleMaskOnInputValue('name', 'value', ['v', 'a', 'l', 'u', 'e', 's']);
    expect(result.target.value).toBe('values');
  });
});
