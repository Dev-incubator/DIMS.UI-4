import checkboxValueSeparator from '../../helpers/checkboxValueSeparator';

describe('checkboxValueSeparator', () => {
  test('Returns correct array for string input', () => {
    expect(checkboxValueSeparator('value1,value2,value3,value4')).toStrictEqual([
      'value1',
      'value2',
      'value3',
      'value4',
    ]);
  });
  test("Returns input if it's array", () => {
    const inputArray = ['value1', 'value2', 'value3', 'value4'];
    expect(checkboxValueSeparator(inputArray)).toBe(inputArray);
  });
});
