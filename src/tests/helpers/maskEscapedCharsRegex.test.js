import maskEscapedCharsRegex from '../../helpers/maskEscapedCharsRegex';

describe('maskEscapedCharsRegex', () => {
  test('Must match escaped chars', () => {
    expect('9\\9\\\\8312a\\'.match(maskEscapedCharsRegex)).toStrictEqual(['9\\', '\\\\', 'a\\']);
  });
});
