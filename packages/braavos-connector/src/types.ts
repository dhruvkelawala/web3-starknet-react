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

interface IStarknetWindowObject {
  request: (call: RpcMessage) => Promise<void>;
  enable: (options?: { showModal?: boolean }) => Promise<string[]>;
  isPreauthorized: () => Promise<boolean>;
  on: (event: 'accountsChanged', handleEvent: EventHandler) => void;
  off: (event: 'accountsChanged', handleEvent: EventHandler) => void;
  account?: import('starknet').AccountInterface;
  provider: import('starknet').Provider;
  selectedAddress?: string;
  version: string;
}

interface ConnectedStarknetWindowObject extends IStarknetWindowObject {
  isConnected: true;
  account: import('starknet').AccountInterface;
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
    starknet_braavos?: StarknetWindowObject;
  }
}
