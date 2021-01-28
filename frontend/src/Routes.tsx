import React, { ReactElement } from "react";
import App from './containers/App';
import {Button} from "@blueprintjs/core";
import LoadingScreen from "./components/LoadingScreen";
import Navigation from "./components/NavigationBar";

export default function Routes(): ReactElement {
    return (
        <App>
            <Navigation isLoading={false}/>
            <h1>Hello world</h1>
        </App>
    );
};

