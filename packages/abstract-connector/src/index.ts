import { EventEmitter } from 'events';
import {
  AbstractConnectorArguments,
  ConnectorEvent,
  ConnectorUpdate,
} from '@web3-starknet-react/types';
import { AccountInterface, Provider } from 'starknet';

export abstract class AbstractConnector extends EventEmitter {
  public readonly supportedChainIds?: number[];

  constructor({ supportedChainIds }: AbstractConnectorArguments = {}) {
    super();

    this.supportedChainIds = supportedChainIds;
  }

  public abstract activate(): Promise<ConnectorUpdate>;
  public abstract getProvider(): Promise<Provider>;
  public abstract getSigner(): AccountInterface | undefined;
  public abstract getChainId(): Promise<number | string>;
  public abstract getAccount(): AccountInterface | undefined;
  public abstract getConnectedAddress(): string | null;
  public abstract deactivate(): void;

  protected emitUpdate(update: ConnectorUpdate) {
    if (__DEV__) {
      console.log(`Emitting '${ConnectorEvent.Update}' with payload `, update);
    }

    this.emit(ConnectorEvent.Update, update);
  }

  protected emitError(error: Error) {
    if (__DEV__) {
      console.log(`Emitting '${ConnectorEvent.Error}' with payload`, error);
    }

    this.emit(ConnectorEvent.Error, error);
  }

  protected emitDeactivate(): void {
    if (__DEV__) {
      console.log(`Emitting '${ConnectorEvent.Deactivate}'`);
    }
    this.emit(ConnectorEvent.Deactivate);
  }
}
