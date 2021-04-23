import React from 'react';
import LoadingScreen from '../components/LoadingScreen';
import App from './App';
import Navigation from '../components/NavigationBar';
import { Route, Switch } from 'react-router-dom';
import route from '../constants/routes.json';

export default class ApplicationRouter extends React.PureComponent {
  LazyLoadingScreen = (name: string) => <LoadingScreen name={name} />;
  LazyHomeContainer = React.lazy(() => import('./HomePage'));
  LazyCreateContainerFormContainer = React.lazy(
    () => import('./CreateContainer'),
  );
  LazyContainerListContainer = React.lazy(() => import('./ContainerListPage'));
  LazyImageSearchContainer = React.lazy(() => import('./ImageSearchPage'));
  LazyImageContainer = React.lazy(() => import('./ImagesPage'));

  HomePage = (props: Record<string, any>) => (
    <React.Suspense fallback={this.LazyLoadingScreen}>
      <this.LazyHomeContainer {...props} />
    </React.Suspense>
  );

  CreateContainerPage = (props: Record<string, any>) => (
    <React.Suspense fallback={this.LazyLoadingScreen}>
      <this.LazyCreateContainerFormContainer {...props} />
    </React.Suspense>
  );

  ContainerListPage = (props: Record<string, any>) => (
    <React.Suspense fallback={this.LazyLoadingScreen}>
      <this.LazyContainerListContainer {...props} />
    </React.Suspense>
  );

  ImageSearchListPage = (props: Record<string, any>) => (
    <React.Suspense fallback={this.LazyLoadingScreen}>
      <this.LazyImageSearchContainer {...props} />
    </React.Suspense>
  );

  ImagesListPage = (props: Record<string, any>) => (
    <React.Suspense fallback={this.LazyLoadingScreen}>
      <this.LazyImageContainer {...props} />
    </React.Suspense>
  );

  public render() {
    return (
      <App>
        <Navigation isLoading={false} />
        <Switch>
          <Route exact path={route.HOME.path} component={this.HomePage} />
          <Route
            path={route.CREATE_CONTAINERS.path}
            component={this.CreateContainerPage}
          />
          <Route
            path={route.CONTAINERS.path}
            component={this.ContainerListPage}
          />
          <Route
            path={route.SEARCH_IMAGES.path}
            component={this.ImageSearchListPage}
          />
          <Route path={route.IMAGES.path} component={this.ImagesListPage} />
        </Switch>
      </App>
    );
  }
}
