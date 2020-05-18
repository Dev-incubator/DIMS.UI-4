import maskEscapedCharsOrEmptyRegex from '../../helpers/maskEscapedCharsOrEmptyRegex';
import addMask from '../../helpers/addMask';

describe('addMask', () => {
  test('Adds mask correct', () => {
    const maskArray = '+375 (9\\9\\) 999-99-99'.split(maskEscapedCharsOrEmptyRegex).filter((el) => el);
    const input = '+375 (99) 2';
    const expectedOutput = '+375 (99) 2__-__-__';
    expect(addMask(input, maskArray)).toBe(expectedOutput);
  });
  test('Adds mask correct if input is empty', () => {
    const maskArray = '+375 (9\\9\\) 999-99-99'.split(maskEscapedCharsOrEmptyRegex).filter((el) => el);
    const input = '';
    const expectedOutput = '+375 (99) ___-__-__';
    expect(addMask(input, maskArray)).toBe(expectedOutput);
  });
});
