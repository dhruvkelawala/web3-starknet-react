import { IStarknetWindowObject } from 'get-starknet';

declare global {
  interface Window {
    starknet?: IStarknetWindowObject;
    starknet_braavos?: IStarknetWindowObject;
  }
}
