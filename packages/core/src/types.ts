import { AbstractConnector } from '@web3-starknet-react/abstract-connector';
import { Provider, AccountInterface } from 'starknet';

export interface StarknetReactManagerFunction {
  activate: (
    connector: AbstractConnector,
    onError?: (error: Error | unknown) => void,
    throwsError?: boolean
  ) => Promise<void>;
  setError: (error: Error) => void;
  deactivate: () => void;
}

export interface StarknetReactManagerReturn
  extends StarknetReactManagerFunction {
  connector?: AbstractConnector;
  provider?: Provider;
  chainId?: number;
  account?: AccountInterface | null;
  connectedAddress?: string | null;

  error?: Error;
}

export interface StarknetReactContextInterface<T = any>
  extends StarknetReactManagerFunction {
  connector?: AbstractConnector;
  library?: T;
  chainId?: number;
  account?: AccountInterface | null;
  connectedAddress?: string | null;

  active: boolean;
  error?: Error;
}
