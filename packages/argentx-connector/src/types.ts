export type EventHandler = (accounts: string[]) => void;

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IStarknetWindowObject {
  enable: () => Promise<string[]>;
  on: (method: 'accountsChanged', handleEvent: EventHandler) => void;
  off: (event: 'accountsChanged', handleEvent: EventHandler) => void;
  signer?: import('@jediswap/starknet').SignerInterface;
  provider: import('@jediswap/starknet').Provider;
  selectedAddress?: string;
  request: () => Promise<void>;
}

interface ConnectedStarknetWindowObject extends IStarknetWindowObject {
  isConnected: true;
  signer: import('@jediswap/starknet').SignerInterface;
  selectedAddress: string;
}

interface DisconnectedStarknetWindowObject extends IStarknetWindowObject {
  isConnected: false;
}

export type StarknetWindowObject =
  | ConnectedStarknetWindowObject
  | DisconnectedStarknetWindowObject;

declare global {
  interface Window {
    starknet?: StarknetWindowObject;
  }
}
