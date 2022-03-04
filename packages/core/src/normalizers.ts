import invariant from 'tiny-invariant';
import { validateAndParseAddress } from 'starknet';

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

export function normalizeAccount(address: string): string {
  const starknetAddress = validateAndParseAddress(address);

  return starknetAddress;
}
