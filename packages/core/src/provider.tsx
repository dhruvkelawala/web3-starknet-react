import React, { createContext, useContext, useMemo } from 'react';
import invariant from 'tiny-invariant';

import { StarknetReactContextInterface } from './types';
import { useStarknetReactManager } from 'manager';
import { Provider } from 'starknet';

export const PRIMARY_KEY = 'primary';

const CONTEXTS: {
  [key: string]: React.Context<StarknetReactContextInterface>;
} = {};

interface StarknetReactProviderArguments {
  getLibrary: (
    provider?: Provider,
    connector?: Required<StarknetReactContextInterface>['connector']
  ) => Provider;
  children: any;
}

export function createStarknetReactRoot(
  key: string
): (args: StarknetReactProviderArguments) => JSX.Element {
  invariant(!CONTEXTS[key], `A root already exists for provided key ${key}`);

  CONTEXTS[key] = createContext<StarknetReactContextInterface>({
    activate: async () => {
      invariant(false, 'No <StarknetReactProvider .../> found');
    },
    setError: () => {
      invariant(false, 'No <StarknetReactProvider ... /> found.');
    },
    deactivate: () => {
      invariant(false, 'No <StarknetReactProvider ... /> found.');
    },
    active: false,
  });

  CONTEXTS[key].displayName = `StarknetReactContext - ${key}`;

  const Provider = CONTEXTS[key].Provider;

  return function StarknetReactProvider({
    getLibrary,
    children,
  }: StarknetReactProviderArguments): JSX.Element {
    const {
      connector,
      provider,
      chainId,
      account,
      activate,
      setError,
      deactivate,
      error,
    } = useStarknetReactManager();

    const active =
      connector !== undefined &&
      chainId !== undefined &&
      account !== undefined &&
      !!!error;

    const library = useMemo(
      () =>
        active &&
        chainId !== undefined &&
        Number.isInteger(chainId) &&
        !!connector
          ? getLibrary(provider, connector)
          : undefined,
      [active, getLibrary, provider, connector, chainId]
    );

    const starknetReactContext: StarknetReactContextInterface = {
      connector,
      library,
      activate,
      active,
      deactivate,
      setError,
      account,
      chainId,
      error,
    };

    return <Provider value={starknetReactContext}>{children}</Provider>;
  };
}

export const StarknetReactProvider = createStarknetReactRoot(PRIMARY_KEY);

export function getStarknetReactContext<T = any>(
  key: string = PRIMARY_KEY
): React.Context<StarknetReactContextInterface<T>> {
  invariant(Object.keys(CONTEXTS).includes(key), `Invalid key ${key}`);
  return CONTEXTS[key];
}

export function useStarknetReact<T = any>(
  key?: string
): StarknetReactContextInterface<T> {
  return useContext(getStarknetReactContext(key));
}
