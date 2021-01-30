import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { History } from 'history';
import { Store } from './store/store';
import ApplicationRouter from './containers/Router';

interface RootProps {
  store: Store;
  history: History;
}

const DockernetesModule = (props: RootProps) => (
  <Provider store={props.store}>
    <ConnectedRouter history={props.history}>
      <ApplicationRouter />
    </ConnectedRouter>
  </Provider>
);

export default DockernetesModule;
