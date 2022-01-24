import { AbstractConnector } from '@web3-starknet-react/abstract-connector';
import { Provider } from '@jediswap/starknet';

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
  account?: null | string;

  error?: Error;
}

export interface StarknetReactContextInterface<T = any>
  extends StarknetReactManagerFunction {
  connector?: AbstractConnector;
  library?: T;
  chainId?: number;
  account?: string | null;

  active: boolean;
  error?: Error;
}
