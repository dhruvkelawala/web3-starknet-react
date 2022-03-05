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

export class ArgentXConnector extends AbstractConnector {
  constructor(kwargs: AbstractConnectorArguments) {
    super(kwargs);

    this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
  }

  public async activate(): Promise<ConnectorUpdate> {
    if (!window.starknet) {
      throw new NoStarknetProviderError();
    }
    if (window.starknet?.on) {
      window.starknet.on('accountsChanged', this.handleAccountsChanged);
    }

    // const { ...provider } = this.starknet.signer;

    let account: AccountInterface | undefined, connectedAddress;

    // const isPreAuthorized = await window.starknet.isPreauthorized();

    connectedAddress = window.starknet.selectedAddress;
    account = window.starknet.account;

    if (!account) {
      [connectedAddress] = await window.starknet.enable();
      account = window.starknet.account;
    }

    return {
      provider: window.starknet.provider,
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
    return window.starknet?.provider;
  }

  /**
   * @deprecated Use getAccount()
   * @returns AccountInterface
   */
  public getSigner(): AccountInterface | undefined {
    if (!window.starknet) {
      throw new NoStarknetProviderError();
    }

    return window.starknet.account;
  }

  public async getChainId(): Promise<string | number> {
    if (!window.starknet) {
      throw new NoStarknetProviderError();
    }

    // Temporary
    return 5;
  }

  public getAccount(): AccountInterface | undefined {
    if (!window.starknet) {
      throw new NoStarknetProviderError();
    }

    return window.starknet.account;
  }

  public getConnectedAddress(): string | null {
    if (!window.starknet) {
      throw new NoStarknetProviderError();
    }

    const address = window.starknet.selectedAddress;

    return address ? address : null;
  }

  public deactivate(): void {
    if (window.starknet) {
      this.handleAccountsChanged([]);
    }
  }

  public async isAuthorized(): Promise<boolean> {
    let account;
    if (!window.starknet) {
      return false;
    } else if (window.starknet.selectedAddress) {
      account = window.starknet.selectedAddress;
    } else {
      [account] = await window.starknet.enable();
    }

    return !!account;
  }
}
