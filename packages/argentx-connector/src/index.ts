import { AbstractConnector } from '@web3-starknet-react/abstract-connector';
import {
  AbstractConnectorArguments,
  ConnectorUpdate,
} from '@web3-starknet-react/types';
import type { StarknetWindowObject } from './types';

export class NoStarknetProviderError extends Error {
  public constructor() {
    super();
    this.name = this.constructor.name;
    this.message = 'No Starknet Provider was found on window object';
  }
}

export class ArgentXConnector extends AbstractConnector {
  public starknet: StarknetWindowObject | undefined;

  constructor(kwargs: AbstractConnectorArguments) {
    super(kwargs);

    this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
  }

  public async activate(): Promise<ConnectorUpdate> {

    if (!window.starknet) {
      throw new NoStarknetProviderError()
    } else {
      this.starknet = window.starknet
    }

    if (window.starknet?.on) {
      window.starknet.on('accountsChanged', this.handleAccountsChanged);
    }

    // const { ...provider } = this.starknet.signer;

    let account;

    try {
      account = window.starknet.selectedAddress
    } catch (error) {
      console.error(error)
    }

    if (!account) {
      [account] = await window.starknet.enable()
    }



    return {
      provider: window.starknet.provider,
      chainId: 5,
      ...(account ? { account } : {}),
    };
  }

  private handleAccountsChanged(accounts: string[]) {
    if (__DEV__) {
      console.log("Handling 'accountsChanged' event with payload", accounts);
    }

    if (accounts.length === 0) {
      this.emitDeactivate();
    } else {
      this.emitUpdate({ account: accounts[0] });
    }
  }

  public async getProvider(): Promise<any> {
    return this.starknet?.provider;
  }

  public async getChainId(): Promise<string | number> {
    if (!this.starknet) {
      throw new NoStarknetProviderError();
    }

    // Temporary
    return 5;
  }

  public async getAccount(): Promise<string | null> {
    if (!this.starknet) {
      throw new NoStarknetProviderError();
    }

    const account = this.starknet.selectedAddress;

    return account ? account : null;
  }

  public deactivate(): void {
    if (this.starknet) {
      this.starknet.off('accountsChanged', this.handleAccountsChanged);
    }
  }

  public async isAuthorized(): Promise<boolean> {
    let account;
    if (!window.starknet) {
      return false;
    } else if (window.starknet.selectedAddress) {
       account = window.starknet.selectedAddress
    } else {
      [account] = await window.starknet.enable()
    }
      return !!account;
  }
}
