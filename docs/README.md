# `web3-starknet-react` Documentation

- [Overview](#overview)
- [Install](#install)
- [web3-starknet-react@core API Reference](#web3-starknet-reactcore-api-reference)
  - [StarknetReactProvider](#starknetreactprovider)
    - [Props](#props)
    - [Example](#example)
  - [useStarknetReact](#usestarknetreact)
    - [Arguments](#arguments)
    - [Example](#example-1)
  - [createStarknetReactRoot](#createstarknetreactroot)
    - [Arguments](#arguments-1)
    - [Example](#example-2)
  - [getStarknetReactContext](#getstarknetreactcontext)
    - [Arguments](#arguments-2)
    - [Example](#example-3)
  - [UnsupportedChainIdError](#unsupportedchainiderror)
    - [Example](#example-4)
- [Understanding Error Bubbling](#understanding-error-bubbling)

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

  connector?: AbstractConnectorInterface
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

## `web3-starknet-react@core` API Reference

### StarknetReactProvider

`web3-starknet-react` relies on the existence of a `StarknetReactProvider` at the root of your application (or more accurately, at the root of the subtree which you which you'd like to have Starknet functionality). It requires a single `getLibrary` prop which is responsible for instantiating `starknet.js` library.

Note: `web3-react` library gives the flexibility of using `web3.js` or `ethers.js` library. However, on Starknet, there is only `starknet.js` library. The `getLibrary` prop on `web3-starknet-react`, therefore, only support `starknet.js` provider. If a new library is emerges in future, we will have flexibility to support it by just making very small changes.

#### Props

```typescript
// Use starknet.js provider
getLibrary: (provider?: Provider, connector?: AbstractConnectorInterface) => any
```

#### Example

```javascript
import { StarknetReactProvider } from '@web3-starknet-react/core'

// import starknet.js
import { Provider } from 'starknet'

function getLibrary(provider, connector) {
  return new Provider(provider)
}

function App() {
  return <StarknetReactProvider getLibrary={getLibrary}>{/* <...> */}</StarknetReactProvider>
}
```

### useStarknetReact

If you're using Hooks (😇), useStarknetReact will be your best friend. Call it from within any function component to access context variables, just like that. It accepts an optional key argument, if you're using multiple roots.

#### Arguments

```typescript
key?: string
```

#### Example

```javascript
import { useStarknetReact } from '@web3-starknet-react/core'

function Component() {
  const starknetReact = useStarknetReact()
  // ...
}
```

### createStarknetReactRoot

In some cases, your dApp may want to maintain >1 active Starknet connections simultaneously.

In cases like these, you'll likely want to create a second (or maybe even third, but probably not fourth) root, which will function exactly like another [StarknetReactProvider](#starknetreactprovider) (in fact, StarknetReactProvider uses createStarknetReactRoot under the hood). It requires a `key` argument, used to identify the root to [usStarknetReact](#usestarknetreact) (or [getStarknetReactContext](#getstarknetreactcontext)).

#### Arguments

```typescript
key: string
```

#### Example

```javascript
import { StarknetReactProvider, createStarknetReactRoot } from '@web3-starknet-react/core'

// import starknet.js
import { Provider } from 'starknet'

function getLibrary(provider, connector) {
  return new Provider(provider)
}

const StarknetReactProviderReloaded = createStarknetReactRoot('anotherOne')

function App() {
  return (
    <StarknetReactProvider getLibrary={getLibrary}>
      <StarknetReactProviderReloaded getLibrary={getLibrary}>{/* <...> */}</StarknetReactProviderReloaded>
    </StarknetReactProvider>
  )
}
```

### getStarknetReactContext

If you're not using Hooks (why?😳), getStarknetReactContext is your savior. It gives direct access to the context returned by [createContext](https://reactjs.org/docs/context.html#reactcreatecontext), which will unlock the use of [contextType](https://reactjs.org/docs/context.html#classcontexttype) in class components, the [Context.Consumer](https://reactjs.org/docs/context.html#contextconsumer) pattern, or whatever other render prop/HOC/etc. shenanigans your manager whose personal site still runs on PHP is making you write. It accepts an optional `key` argument to identify the root.

#### Arguments

```typescript
key?: string
```

#### Example

```javascript
import { getStarknetReactContext } from '@web3-starknet-react/core'

const starknetReactContext = getStarknetReactContext()

// ...
```

### UnsupportedChainIdError

This is an error which can be used to inform users that they're connected to an unsupported network.

#### Example

```javascript
import { UnsupportedChainIdError } from '@web3-starknet-react/core'
// ...

function Component() {
  const { error } = useStarknetReact()
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError
  // ...
}
```

## Understanding Error Bubbling

Errors that occur during the initial activation of a connector (i.e. inside activate), are are handled in 1 of 4 ways:

1. In the case where there's been 1 or more other updates to the `web3-starknet-react` context between when activate was called and when it resolved with the data required to complete the activation, errors are silently suppressed (in development mode, a warning will be logged to the console). This should really only happen in cases where activation takes a very long time and the user does something in the intervening time, such as activating another connector, deactivating the current connector, etc.
2. If `throwErrors` (the third argument to activate) is passed, errors will be thrown and should be handled in a .catch. No updates to the `web3-starknet-react` context will occur.
3. If `onError` (the second argument to activate) is passed, that function is called with the error. No updates to the `web3-starknet-react` context will occur.
4. Otherwise, the error will be set in the `web3-starknet-react` context (along with the connector).

Errors that occur while a connector is set are handled in 1 of 2 ways:

1. If an `onError` function was passed, this function is called with the error. No updates to the `web3-starknet-react` context will occur.
2. Otherwise, the error will be set in the `web3-starknet-react` context.

In all of these scenarios, note that calling setError will update the `web3-starknet-react` context. This can be called any time a connector is set, and it can be useful for e.g. manually triggering your app's handling of the `web3-starknet-react` error property.

Note: if an error is ever set in the `web3-starknet-react` context, and a connector triggers an update, the manager will attempt to revalidate all properties as if activate was called again, to recover from the error state.
