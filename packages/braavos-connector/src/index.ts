import { AbstractConnector } from '@web3-starknet-react/abstract-connector';
import { ConnectorUpdate } from '@web3-starknet-react/types';
import { AccountInterface } from 'starknet';
import { IStarknetWindowObject } from 'get-starknet';

export class NoStarknetProviderError extends Error {
  public constructor() {
    super();
    this.name = this.constructor.name;
    this.message = 'No Starknet Provider was found on window object';
  }
}

export class BraavosConnector extends AbstractConnector {
  public async activate(): Promise<ConnectorUpdate> {
    const wallet = this.getBraavosWallet();

    if (!wallet) {
      throw new NoStarknetProviderError();
    }

    wallet.on('accountsChanged', this.handleAccountsChanged);

    let account: AccountInterface | undefined = wallet.account;
    let connectedAddress: string | undefined = wallet.selectedAddress;

    if (!connectedAddress) {
      [connectedAddress] = (await wallet.enable()) ?? [];
      account = wallet.account;
    }

    return {
      provider: wallet.provider,
      chainId: 5,
      ...(account ? { account } : {}),
      ...(connectedAddress ? { connectedAddress } : {}),
    };
  }

  private handleAccountsChanged = (accountAddresses: string[]) => {
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
  };

  public async getProvider(): Promise<any> {
    return this.getBraavosWallet()?.provider;
  }

  /**
   * @deprecated Use getAccount()
   * @returns AccountInterface
   */
  public getSigner(): AccountInterface | undefined {
    return this.getAccount();
  }

  public async getChainId(): Promise<string | number> {
    const wallet = this.getBraavosWallet();
    if (!wallet) {
      throw new NoStarknetProviderError();
    }

    // Temporary
    return 5;
  }

  public getAccount(): AccountInterface | undefined {
    const wallet = this.getBraavosWallet();
    if (!wallet) {
      throw new NoStarknetProviderError();
    }

    return wallet.account;
  }

  public getConnectedAddress(): string | null {
    const wallet = this.getBraavosWallet();
    if (!wallet) {
      throw new NoStarknetProviderError();
    }

    return wallet.selectedAddress || null;
  }

  public deactivate(): void {
    if (this.getBraavosWallet()) {
      this.handleAccountsChanged([]);
    }
  }

  public async isAuthorized(): Promise<boolean> {
    const wallet = this.getBraavosWallet();
    return wallet?.isPreauthorized() ?? false;
  }

  private getBraavosWallet = (): IStarknetWindowObject | undefined =>
    [window.starknet, window.starknet_braavos].find(
      obj => obj?.id === 'braavos'
    );
}
