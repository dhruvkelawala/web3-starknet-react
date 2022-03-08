# `web3-react` Documentation - ArgentX

- [Install](#install)
- [Arguments](#arguments)
- [Example](#example)
- [Errors](#errors)
  - [NoStarknetProviderError](#nostarknetprovidererror)
    - [Example](#example-1)
  - [UserRejectedRequestError](#userrejectedrequesterror)
    - [Example](#example-2)

## Install

`yarn add @web3-starknet-react/argentx-connector`

## Arguments

```typescript
supportedChainIds?: number[]
```

**NOTE**: Currently only Goerli (chainId: 5) is supported. As soon as ArgentX supports mainnet (chainId: 1), I will add support for that.

## Example

```javascript
import { ArgentXConnector } from '@web3-starknet-react/argentx-connector'

const argentx = new ArgentXConnector({ supportedChainIds: [5] })
```

## Errors

### NoEthereumProviderError

#### Example

```javascript
import { NoStarknetProviderError } from '@web3-starknet-react/argentx-connector'

function Component() {
  const { error } = useStarknetReact()
  const isNoStarknetProviderError = error instanceof NoStarknetProviderError
  // ...
}
```
