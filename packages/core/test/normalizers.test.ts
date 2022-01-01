import { normalizeAccount } from '../src/normalizers';

describe('normalizers test', () => {
  it('checks normalizer account', () => {
    let account =
      '0x7a41b26633a8501dcb79c4181b84c8d0e581d69020317d0edd2b580d15c926d';

    console.log(account);

    const _account = normalizeAccount(account);

    console.log(_account);

    expect(account === _account);
  });
});
