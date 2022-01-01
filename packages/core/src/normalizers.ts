import invariant from 'tiny-invariant';

export function normalizeChainId(chainId: string | number): number {
  if (typeof chainId === 'string') {
    chainId = chainId.replace(/^Ox/, '0x');

    const parsedChainId = Number.parseInt(
      chainId,
      chainId.trim().substring(0, 2) === '0x' ? 16 : 10
    );
    invariant(
      !Number.isNaN(parsedChainId),
      `chainId ${chainId} is not an integer`
    );
    return parsedChainId;
  } else {
    invariant(
      Number.isInteger(chainId),
      `chainId ${chainId} is not an integer`
    );
    return chainId;
  }
}

export function normalizeAccount(_address: string): string {
  invariant(
    typeof _address === 'string' && _address.match(/^(0x)?[0-9a-fA-F]{63}$/),
    `Invalid address ${_address}`
  );

  const address =
    _address.substring(0, 2) === '0x' ? _address : `0x${_address}`;

  return address;
}
