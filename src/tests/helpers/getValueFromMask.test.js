import getValueFromMask from '../../helpers/getValueFromMask';

describe('getValueFromMask', () => {
  test('Trims mask correct', () => {
    const input = '+375 (99) 9__-__-__';
    const expectedOutput = '+375 (99) 9';
    expect(getValueFromMask(input)).toBe(expectedOutput);
  });
  test('Trims correct mask with no placeholders', () => {
    const input = '+375 (99) 9';
    const expectedOutput = '+375 (99) 9';
    expect(getValueFromMask(input)).toBe(expectedOutput);
  });
  test('Trims correct mask with first char placeholder', () => {
    const input = '___-__-__';
    const expectedOutput = '';
    expect(getValueFromMask(input)).toBe(expectedOutput);
  });
});
