import calculateAge from '../../helpers/calculateAge';

describe('calculateAge', () => {
  test('Calculates age correct, if cake day is before current date', () => {
    const now = new Date();
    const birthDate = new Date(2000, 7, 18);
    expect(calculateAge(birthDate)).toBe(now.getFullYear() - 2000 - 1);
  });

  test('Calculates age correct, if cake day is on current date', () => {
    const now = new Date();
    const birthDate = new Date(2000, now.getMonth(), now.getDate());
    expect(calculateAge(birthDate)).toBe(now.getFullYear() - 2000);
  });

  test('Calculates age correct, if cake day is after current date', () => {
    const now = new Date();
    const birthDate = new Date(2000, now.getMonth(), now.getDate() + 2);
    expect(calculateAge(birthDate)).toBe(now.getFullYear() - 2000);
  });
});
