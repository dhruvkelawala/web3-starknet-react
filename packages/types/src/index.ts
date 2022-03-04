import { AccountInterface, Provider } from 'starknet'

export interface AbstractConnectorArguments {
  supportedChainIds?: number[]
}

export interface ConnectorUpdate<T = number | string> {
  provider?: Provider
  chainId?: T
  account?: AccountInterface | null
  connectedAddress?: string | null
}

export enum ConnectorEvent {
  Update = 'StarknetReactUpdate',
  Error = 'StarknetReactError',
  Deactivate = 'StarknetReactDeactivate'
}
