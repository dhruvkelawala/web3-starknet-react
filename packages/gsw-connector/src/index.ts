import {AbstractConnector} from '@web3-starknet-react/abstract-connector';
import {AbstractConnectorArguments, ConnectorUpdate,} from '@web3-starknet-react/types';
import {AccountInterface} from 'starknet';
import {connect} from 'get-starknet-wallet';
import {IStarknetWindowObject} from "get-starknet-wallet/dist/types";

export class NoStarknetProviderError extends Error {
  public constructor() {
    super();
    this.name = this.constructor.name;
    this.message = 'No Starknet Provider was found on window object';
  }
}

export class GswConnector extends AbstractConnector {

  wallet: IStarknetWindowObject | undefined = undefined;

  constructor(kwargs: AbstractConnectorArguments) {
    super(kwargs);

    this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
  }

  public async activate(): Promise<ConnectorUpdate> {
    const wallet = this.wallet = await connect();

    if (!wallet) {
      throw new NoStarknetProviderError();
    }

    wallet.on('accountsChanged', this.handleAccountsChanged);


    let account: AccountInterface | undefined = wallet.account;
    let connectedAddress: string | undefined = wallet.selectedAddress;

    if (!account) {
      [connectedAddress] = await wallet.enable();
      account = wallet.account;
    }

    return {
      provider: wallet.provider,
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
    return this.wallet?.provider;
  }

  /**
   * @deprecated Use getAccount()
   * @returns AccountInterface
   */
  public getSigner(): AccountInterface | undefined {
    return this.getAccount();
  }

  public async getChainId(): Promise<string | number> {
    if (!this.wallet) {
      throw new NoStarknetProviderError();
    }

    // Temporary
    return 5;
  }

  public getAccount(): AccountInterface | undefined {
    if (!this.wallet) {
      throw new NoStarknetProviderError();
    }

    return this.wallet.account;
  }

  public getConnectedAddress(): string | null {
    if (!this.wallet) {
      throw new NoStarknetProviderError();
    }

    return this.wallet.selectedAddress || null;
  }

  public deactivate(): void {
    if (this.wallet) {
      this.handleAccountsChanged([]);
    }
  }

  public async isAuthorized(): Promise<boolean> {
    return this.wallet?.isPreauthorized() ?? false;
  }
}
