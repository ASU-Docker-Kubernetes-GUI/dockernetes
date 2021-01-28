import React, { ReactElement } from "react";
import App from './containers/App';
import {Button} from "@blueprintjs/core";
import LoadingScreen from "./components/LoadingScreen";
import Navigation from "./components/NavigationBar";
import { Switch, Route } from "react-router-dom";
import route from './constants/routes.json';





export default class Routes extends React.PureComponent {
    LazyLoadingScreen = (name: string) => <LoadingScreen name={name} />;

    LazyHomeContainer = React.lazy(() =>
        import('./containers/Home')
    );

    HomePage = (props: Record<string, any>) => (
        <React.Suspense fallback={this.LazyLoadingScreen}>
            <this.LazyHomeContainer {...props} />
        </React.Suspense>
    )

    public render() {
        return (
            <App>
                <Navigation isLoading={false}/>
                <Switch>
                    <Route exact path={route.HOME} component={this.HomePage} />
                    <Route path={route.CONTAINERS} component={this.HomePage} />
                    <Route path={route.SETTINGS} component={this.HomePage} />
                </Switch>
            </App>
        );
    }
};

