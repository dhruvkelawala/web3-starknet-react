# web3-starknet-react 🚀

_A simple, maximally extensible, dependency minimized framework for building Starknet dApps_

_Provides easy access to Starknet Interface all over the React App. Inspired from_ [web3-react](https://github.com/NoahZinsmeister/web3-react/tree/v6)

<br>

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

| Packages                                  | `@latest` version                                                                                                                                                                 | Size                                                                                                                                                                                         | Description                                                            |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 🏝 **Core**                                |                                                                                                                                                                                   |                                                                                                                                                                                              |                                                                        |
| `@web3-starknet-react/core`               | [![npm version](https://img.shields.io/npm/v/@web3-starknet-react/core/latest.svg)](https://www.npmjs.com/package/@web3-starknet-react/core/v/latest)                             | [![minzip](https://img.shields.io/bundlephobia/minzip/@web3-starknet-react/core/latest.svg)](https://bundlephobia.com/result?p=@web3-starknet-react/core@latest)                             | [React](https://reactjs.org/) hooks and context for accessing Starknet |
| 🔌 **Connectors**                         |                                                                                                                                                                                   |                                                                                                                                                                                              |                                                                        |
| _Browser Extension/dApp Browser_          |                                                                                                                                                                                   |                                                                                                                                                                                              |                                                                        |
| `@web3-starknet-react/braavos-connector`  | [![npm version](https://img.shields.io/npm/v/@web3-starknet-react/braavos-connector/latest.svg)](https://www.npmjs.com/package/@web3-starknet-react/braavos-connector/v/latest)   | [![minzip](https://img.shields.io/bundlephobia/minzip/@web3-starknet-react/braavos-connector/latest.svg)](https://bundlephobia.com/result?p=@web3-starknet-react/braavos-connector@latest)   | [Braavos Wallet](https://chrome.google.com/webstore/detail/braavos-wallet/jnlgamecbpmbajjfhmmmlhejkemejdma) connector |
| `@web3-starknet-react/argentx-connector`  | [![npm version](https://img.shields.io/npm/v/@web3-starknet-react/argentx-connector/latest.svg)](https://www.npmjs.com/package/@web3-starknet-react/argentx-connector/v/latest)   | [![minzip](https://img.shields.io/bundlephobia/minzip/@web3-starknet-react/argentx-connector/latest.svg)](https://bundlephobia.com/result?p=@web3-starknet-react/argentx-connector@latest)   | [ArgentX Wallet](https://github.com/argentlabs/argent-x) connector     |
| 🔫 **Low Level**                          |                                                                                                                                                                                   |                                                                                                                                                                                              |                                                                        |
| `@web3-starknet-react/abstract-connector` | [![npm version](https://img.shields.io/npm/v/@web3-starknet-react/abstract-connector/latest.svg)](https://www.npmjs.com/package/@web3-starknet-react/abstract-connector/v/latest) | [![minzip](https://img.shields.io/bundlephobia/minzip/@web3-starknet-react/abstract-connector/latest.svg)](https://bundlephobia.com/result?p=@web3-starknet-react/abstract-connector@latest) | Low Level implementation of connector                                  |
| `@web3-starknet-react/types`              | [![npm version](https://img.shields.io/npm/v/@web3-starknet-react/types/latest.svg)](https://www.npmjs.com/package/@web3-starknet-react/types/v/latest)                           | [![minzip](https://img.shields.io/bundlephobia/minzip/@web3-starknet-react/types/latest.svg)](https://bundlephobia.com/result?p=@web3-starknet-react/types@latest)                           | Shared [TypeScript](https://www.typescriptlang.org/) Types             |

<br />

#

## ⭐️ [Documentation](docs)

## Projects using `web3-starknet-react`

_Open a PR to add your starknet project to the list_

- [JediSwap](https://app.testnet.jediswap.xyz/#/swap)

## Local Development

- Clone repo \
  `git clone https://github.com/dhruvkelawala/web3-starknet-react`

- Install top-level dependencies \
  `yarn`

- Install sub-dependencies \
  `yarn bootstrap`

- Build and watch for changes \
  `yarn start`
