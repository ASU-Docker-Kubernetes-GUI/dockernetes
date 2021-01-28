import React, { ReactElement } from 'react';
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from '@blueprintjs/core';

import routes from '../constants/routes.json';

import { Link } from 'react-router-dom';


interface INavigationItemProps {
  route: string;
  name: string;
  classNames: string;
}

const NavigationItem = (props: INavigationItemProps): ReactElement => {
  const { route, classNames, name } = props;
  return (
    <>
      <Link to={route}>
        <Button text={name} minimal className={classNames} />
      </Link>
      <NavbarDivider />
    </>
  );
};

type NavigationBarProps = {
  isLoading: boolean;
};

export default class Navigation extends React.Component<NavigationBarProps> {
  render(): React.ReactElement {
    const { isLoading } = this.props;
    const elementIsLoading = isLoading ? Classes.SKELETON : '';

    return (
      <Navbar className={Classes.DARK}>
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading className={elementIsLoading}>
            Dockernetes
          </NavbarHeading>
          <NavbarDivider />
          <NavigationItem
            route={routes.HOME.path}
            name={routes.HOME.title}
            classNames={elementIsLoading}
          />
          <NavigationItem
            route={routes.CONTAINERS.path}
            name={routes.CONTAINERS.title}
            classNames={elementIsLoading}
          />
          <NavigationItem
            route={routes.CREATE_CONTAINERS.path}
            name={routes.CREATE_CONTAINERS.title}
            classNames={elementIsLoading}
          />
          <NavigationItem
            route={routes.IMAGES.path}
            name={routes.IMAGES.title}
            classNames={elementIsLoading}
          />
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          <NavigationItem
            route={routes.SETTINGS.path}
            name={routes.SETTINGS.title}
            classNames={elementIsLoading}
          />
        </NavbarGroup>
      </Navbar>
    );
  }
}
