# `web3-react` Documentation - Braavos

- [Install](#install)
- [Arguments](#arguments)
- [Example](#example)
- [Errors](#errors)
  - [NoStarknetProviderError](#nostarknetprovidererror)
    - [Example](#example-1)
  - [UserRejectedRequestError](#userrejectedrequesterror)
    - [Example](#example-2)

## Install

`yarn add @web3-starknet-react/braavos-connector`

## Arguments

```typescript
supportedChainIds?: number[]
```

## Example

```javascript
import { BraavosWallet } from '@web3-starknet-react/braavos-connector'

const wallet = new BraavosWallet({ supportedChainIds: [5] })
```

## Errors

### NoEthereumProviderError

#### Example

```javascript
import { NoStarknetProviderError } from '@web3-starknet-react/braavos-connector'

function Component() {
  const { error } = useStarknetReact()
  const isNoStarknetProviderError = error instanceof NoStarknetProviderError
  // ...
}
```
