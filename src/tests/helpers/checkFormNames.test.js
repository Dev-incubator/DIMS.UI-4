import checkFormNames from '../../helpers/formHelpers/checkFormNames';

describe('checkFormNames', () => {
  test('Returns false if names repeat', () => {
    const inputs = [
      { type: 'test', name: 'user' },
      { type: 'test', name: 'password' },
      { type: 'test', name: 'REPEATS' },
      { type: 'test', name: 'login' },
      { type: 'test', name: 'email' },
      { type: 'test', name: 'REPEATS' },
    ];

    const actual = checkFormNames(inputs);
    const expected = false;

    expect(actual).toBe(expected);
  });
  test('Returns true if no repeats', () => {
    const inputs = [
      { type: 'test', name: 'user' },
      { type: 'test', name: 'password' },
      { type: 'test', name: 'login' },
      { type: 'test', name: 'email' },
      { type: 'test', name: 'about' },
    ];

    const actual = checkFormNames(inputs);
    const expected = true;

    expect(actual).toBe(expected);
  });
});
