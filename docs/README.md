## Overview

At a high level, `web3-starknet-react` is a state machine which ensures that certain key pieces of Starknet related data (the user's current account, account address, chainId, etc. ) relevant to your dApp are kept-up-to-date. To help with this, `web3-starknet-react` uses React's [Context](https://reactjs.org/docs/context.html) API to efficiently store this data, and inject it wherever you need it in your react app.

The data conforms to the following interface:

```typescript
interface StarknetReactContextInterface<T = any> {
  activate: (
    connector: AbstractConnector,
    onError?: (error: Error | unknown) => void,
    throwsError?: boolean
  ) => Promise<void>
  setError: (error: Error) => void
  deactivate: () => void

  connector?: AbstractConnector
  library?: T
  chainId?: number
  account?: AccountInterface | null
  connectedAddress?: string | null

  active: boolean
  error?: Error
}
```

The documentation that follows is for `@web3-starknet-react/core`, the package responsible for managing this context. To understand where data itself comes from, head over to the [connectors/folder](connectors/)

## Install

- Add `react@>=16.8` to your project \
  `yarn add react`

- Then install `web3-starknet-react` \
  `yarn add @web3-starknet-react/core`
