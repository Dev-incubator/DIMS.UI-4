import checkFormNames from '../../helpers/checkFormNames';

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
    expect(checkFormNames(inputs)).toBe(false);
  });
  test('Returns true if no repeats', () => {
    const inputs = [
      { type: 'test', name: 'user' },
      { type: 'test', name: 'password' },
      { type: 'test', name: 'login' },
      { type: 'test', name: 'email' },
      { type: 'test', name: 'about' },
    ];
    expect(checkFormNames(inputs)).toBe(true);
  });
});
