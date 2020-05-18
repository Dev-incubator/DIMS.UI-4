import getMaskCharsBeforePlaceholder from '../../helpers/getMaskCharsBeforePlaceholder';
import maskEscapedCharsOrEmptyRegex from '../../helpers/maskEscapedCharsOrEmptyRegex';

describe('getMaskCharsBeforePlaceholder', () => {
  test('Trims mask correct', () => {
    const input = '+375 (9\\9\\) 999-99-99'.split(maskEscapedCharsOrEmptyRegex).filter((el) => el);
    const expectedOutput = '+375 (99) ';
    expect(getMaskCharsBeforePlaceholder(input)).toBe(expectedOutput);
  });
  test('Trims correct mask with no placeholders', () => {
    const input = '+375 (9\\9\\)'.split(maskEscapedCharsOrEmptyRegex).filter((el) => el);
    const expectedOutput = '+375 (99)';
    expect(getMaskCharsBeforePlaceholder(input)).toBe(expectedOutput);
  });
});
