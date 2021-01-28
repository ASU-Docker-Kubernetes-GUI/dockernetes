import React from 'react';
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from '@blueprintjs/core';

import Route from '../constants/routes.json';

import { Link } from 'react-router-dom';

type NavigationBarProps = {
  isLoading: boolean;
};

export default function Navigation(
  props: NavigationBarProps,
): React.ReactElement {
  const { isLoading } = props;
  const elementIsLoading = isLoading ? Classes.SKELETON : '';

  return (
    <Navbar className={Classes.DARK}>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading className={elementIsLoading}>Dockernetes</NavbarHeading>
        <NavbarDivider />
        <Link to={Route.HOME}>
          <Button text="Home" minimal className={elementIsLoading} />
        </Link>
        <NavbarDivider />
        <Link to={Route.CONTAINERS}>
          <Button text="Containers" minimal className={elementIsLoading} />
        </Link>
        <NavbarDivider />
        <Link to={Route.IMAGES}>
          <Button text="Images" minimal className={elementIsLoading} />
        </Link>
        <NavbarDivider />
        <Link to={Route.CREATE_CONTAINER}>
          <Button
            text="Create Container"
            minimal
            className={elementIsLoading}
          />
        </Link>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Link to={Route.SETTINGS}>
          <Button
            text="Settings"
            minimal
            icon="cog"
            className={elementIsLoading}
          />
        </Link>
      </NavbarGroup>
    </Navbar>
  );
}
