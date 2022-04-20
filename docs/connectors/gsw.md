# `web3-react` Documentation - get-starknet-wallet

- [Install](#install)
- [Arguments](#arguments)
- [Example](#example)
- [Errors](#errors)
  - [NoStarknetProviderError](#nostarknetprovidererror)
    - [Example](#example-1)
  - [UserRejectedRequestError](#userrejectedrequesterror)
    - [Example](#example-2)

## Install

`yarn add @web3-starknet-react/gsw-connector`

## Arguments

```typescript
supportedChainIds?: number[]
```

**NOTE**: get-starknet-wallet is wallet agnostic.

## Example

```javascript
import { GswConnector } from '@web3-starknet-react/gsw-connector'

const gsw = new GswConnector({ supportedChainIds: [5] })
```

## Errors

### NoEthereumProviderError

#### Example

```javascript
import { NoStarknetProviderError } from '@web3-starknet-react/gsw-connector'

function Component() {
  const { error } = useStarknetReact()
  const isNoStarknetProviderError = error instanceof NoStarknetProviderError
  // ...
}
```
