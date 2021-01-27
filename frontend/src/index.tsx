import React, { Fragment } from 'react';
import ReactDOM, {render} from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {configuredStore, history} from "./store";

const store = configuredStore();

document.addEventListener('DOMContentLoaded', () => {
    const Root = require('./App').default;
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
