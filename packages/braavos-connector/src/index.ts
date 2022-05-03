import { AbstractConnector } from '@web3-starknet-react/abstract-connector';
import {
  AbstractConnectorArguments,
  ConnectorUpdate,
} from '@web3-starknet-react/types';
import { AccountInterface } from 'starknet';

export class NoStarknetProviderError extends Error {
  public constructor() {
    super();
    this.name = this.constructor.name;
    this.message = 'No Starknet Provider was found on window object';
  }
}

export class BraavosConnector extends AbstractConnector {
  constructor(kwargs: AbstractConnectorArguments) {
    super(kwargs);

    this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
  }

  public async activate(): Promise<ConnectorUpdate> {
    if (!window.starknet_braavos) {
      throw new NoStarknetProviderError();
    }
    if (window.starknet_braavos?.on) {
      window.starknet_braavos.on('accountsChanged', this.handleAccountsChanged);
    }

    // const { ...provider } = this.starknet.signer;

    let account: AccountInterface | undefined, connectedAddress;

    // const isPreAuthorized = await window.starknet.isPreauthorized();

    connectedAddress = window.starknet_braavos.selectedAddress;
    account = window.starknet_braavos.account;

    if (!account) {
      [connectedAddress] = await window.starknet_braavos.enable();
      account = window.starknet_braavos.account;
    }

    return {
      provider: window.starknet_braavos.provider,
      chainId: 5,
      ...(account ? { account } : {}),
      ...(connectedAddress ? { connectedAddress } : {}),
    };
  }

  private handleAccountsChanged(accountAddresses: string[]) {
    if (__DEV__) {
      console.log(
        "Handling 'accountsChanged' event with payload",
        accountAddresses
      );
    }

    if (accountAddresses.length === 0) {
      this.emitDeactivate();
    } else {
      this.emitUpdate({ connectedAddress: accountAddresses[0] });
    }
  }

  public async getProvider(): Promise<any> {
    return window.starknet_braavos?.provider;
  }

  /**
   * @deprecated Use getAccount()
   * @returns AccountInterface
   */
  public getSigner(): AccountInterface | undefined {
    if (!window.starknet_braavos) {
      throw new NoStarknetProviderError();
    }

    return window.starknet_braavos.account;
  }

  public async getChainId(): Promise<string | number> {
    if (!window.starknet_braavos) {
      throw new NoStarknetProviderError();
    }

    // Temporary
    return 5;
  }

  public getAccount(): AccountInterface | undefined {
    if (!window.starknet_braavos) {
      throw new NoStarknetProviderError();
    }

    return window.starknet_braavos.account;
  }

  public getConnectedAddress(): string | null {
    if (!window.starknet_braavos) {
      throw new NoStarknetProviderError();
    }

    const address = window.starknet_braavos.selectedAddress;

    return address ? address : null;
  }

  public deactivate(): void {
    if (window.starknet_braavos) {
      this.handleAccountsChanged([]);
    }
  }

  public async isAuthorized(): Promise<boolean> {
    let account;
    if (!window.starknet_braavos) {
      return false;
    } else if (window.starknet_braavos.selectedAddress) {
      account = window.starknet_braavos.selectedAddress;
    } else {
      [account] = await window.starknet_braavos.enable();
    }

    return !!account;
  }
}
