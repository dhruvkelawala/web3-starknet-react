import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { StarknetReactProvider } from '../src/provider';
import { Provider } from 'starknet';

function getLibrary(provider?: Provider) {
  const library = new Provider(provider);

  return library;
}

function App() {
  return (
    <StarknetReactProvider getLibrary={getLibrary}>
      <div>test!</div>
    </StarknetReactProvider>
  );
}

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
