export type EventHandler = (accounts: string[]) => void;

interface WatchAssetParameters {
  type: 'ERC20'; // The asset's interface, e.g. 'ERC20'
  options: {
    address: string; // The hexadecimal StarkNet address of the token contract
    symbol?: string; // A ticker symbol or shorthand, up to 5 alphanumerical characters
    decimals?: number; // The number of asset decimals
    image?: string; // A string url of the token logo
    name?: string; // The name of the token - not in spec
  };
}

export type RpcMessage = {
  type: 'wallet_watchAsset';
  params: WatchAssetParameters;
};

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IStarknetWindowObject {
  enable: () => Promise<string[]>;
  on: (method: 'accountsChanged', handleEvent: EventHandler) => void;
  off: (event: 'accountsChanged', handleEvent: EventHandler) => void;
  signer?: import('@jediswap/starknet').SignerInterface;
  provider: import('@jediswap/starknet').Provider;
  selectedAddress?: string;
  request: (call: RpcMessage) => Promise<void>;
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
