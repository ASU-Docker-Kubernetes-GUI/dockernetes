import React, { Fragment } from 'react';
import { render } from 'react-dom';

import reportWebVitals from './reportWebVitals';
import {configuredStore, history} from "./store";

// Blueprint CSS things
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";

const store = configuredStore();

document.addEventListener('DOMContentLoaded', () => {
    const Root = require('./containers/Root').default;
    render(
        <Fragment>
            <Root store={store} history={history}/>
        </Fragment>,
        document.getElementById('root')
    );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
