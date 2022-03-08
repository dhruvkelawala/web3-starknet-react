# `web3-starknet-react` Documentation - Connectors

Connectors are standalone packages that interface with `web3-starknet-react` and manage connections to a single type of Starknet node or wallet. To give an example: it's quite common for dApp users to rely on browser extensions such as [ArgentX](https://github.com/argentlabs/argent-x/) to manage their account for them. So, `web3-starknet-react` defines a connector that's responsible for interfacing with browser extensions. The current list of first-party `web3-starknet-react` connectors can be found in the [top-level README.md](../../README.md).

Currently, we only have ArgentX connectors. As and when new wallets emerges on Starknet like Ledger and Walletconnect, I will add them. Feel free to create an issue, if you want some wallet added.

One enormous benefit to `web3-starknet-react` is that it's incredibly easy to extend existing/create new connectors! They're very simple Javascript class objects which simply need to define a few functions to be fully compatible with the rest of `web3-starknet-react`.

For more information on specific first-party connectors, see the individual files in this folder.
