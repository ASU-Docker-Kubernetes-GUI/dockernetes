import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';

import React, { Fragment } from 'react';
import { render } from 'react-dom';
import LogRocket from 'logrocket';

import reportWebVitals from './utils/reportWebVitals';
import { configuredStore, history } from './store/store';

LogRocket.init('tm2tyr/dockernetes');

const store = configuredStore();

document.addEventListener('DOMContentLoaded', () => {
  const Root = require('./DockernetesModule').default;
  render(
    <Fragment>
      <Root store={store} history={history} />
    </Fragment>,
    document.getElementById('root'),
  );
});

// TODO: Abstract to development environments only.
reportWebVitals(console.log);
