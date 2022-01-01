export type EventHandler = (accounts: string[]) => void;

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IStarknetWindowObject {
  enable: () => Promise<string[]>;
  on: (method: 'accountsChanged', handleEvent: EventHandler) => void;
  off: (event: 'accountsChanged', handleEvent: EventHandler) => void;
  signer?: import('starknet').SignerInterface;
  provider: import('starknet').Provider;
  selectedAddress?: string;
}

interface ConnectedStarknetWindowObject extends IStarknetWindowObject {
  isConnected: true;
  signer: import('starknet').SignerInterface;
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
