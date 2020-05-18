import maskSpecialCharsRegex from '../../helpers/maskSpecialCharsRegex';

describe('maskEscapedCharsRegex', () => {
  test('Must match special chars and not include escaped', () => {
    expect('9\\9\\\\831aa\\'.match(maskSpecialCharsRegex)).toStrictEqual(['9', 'a']);
  });
});
