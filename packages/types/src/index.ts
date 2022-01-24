import { Provider } from '@jediswap/starknet'

export interface AbstractConnectorArguments {
  supportedChainIds?: number[]
}

export interface ConnectorUpdate<T = number | string> {
  provider?: Provider
  chainId?: T
  account?: null | string
}

export enum ConnectorEvent {
  Update = 'StarknetReactUpdate',
  Error = 'StarknetReactError',
  Deactivate = 'StarknetReactDeactivate'
}
