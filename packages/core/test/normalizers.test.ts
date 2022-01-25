import { normalizeAccount } from '../src/normalizers';

describe('normalizers test', () => {
  it('checks if normalizeAcccount works with 64bit address string', () => {
    let account =
      '0x6eff1d71068df8e6677f59a556151c56ed13e14ad431a9bef6fcb3fc5e6fa7';

    const normalizedAccount = normalizeAccount(account);

    expect(normalizedAccount).toBe(
      '0x006eff1d71068df8e6677f59a556151c56ed13e14ad431a9bef6fcb3fc5e6fa7'
    );
  });
});
