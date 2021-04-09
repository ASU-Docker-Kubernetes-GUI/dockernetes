import React, { ReactElement, useEffect } from 'react';
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Tag,
  Colors,
} from '@blueprintjs/core';

import routes from '../constants/routes.json';
import { Link } from 'react-router-dom';
import { getCurrentPathname } from '../store/store';
import { useSelector } from 'react-redux';
// import {
//   checkApiStatus,
//   checkDockerStatus,
//   getApiStatus,
//   getDockerStatus,
// } from '../features/home/HomeSlice';

interface INavigationItemProps {
  route: string;
  name: string;
  classNames: string;
  currentLocation: string;
}

const NavigationItem = (props: INavigationItemProps): ReactElement => {
  const { route, classNames, name, currentLocation } = props;
  const isCurrent = currentLocation == route;
  console.log(isCurrent);
  return (
    <>
      <Link to={route}>
        <Button
          text={name}
          minimal
          className={classNames}
          style={{ color: Colors.GRAY5 }}
          active={isCurrent}
        />
      </Link>
    </>
  );
};

interface NavigationBarProps {
  isLoading: boolean;
}

function Navigation(props: NavigationBarProps): ReactElement {
  // useEffect(() => {
  //   checkApiStatus();
  //   checkDockerStatus();
  // });

  const { isLoading } = props;
  const elementIsLoading = isLoading ? Classes.SKELETON : '';
  const currentPage = useSelector(getCurrentPathname);
  // const dockerStatus = useSelector(getDockerStatus);
  // const apiStatus = useSelector(getApiStatus);

  const leftMenuRoutes = [
    routes.HOME,
    routes.CONTAINERS,
    routes.CREATE_CONTAINERS,
    routes.IMAGES,
  ];

  const LeftMenuItems = leftMenuRoutes.map((item, id) => (
    <NavigationItem
      key={id}
      route={item.path}
      name={item.title}
      classNames={elementIsLoading}
      currentLocation={currentPage}
    />
  ));

  const rightMenuRoutes = [routes.SETTINGS];
  const RightMenuItems = rightMenuRoutes.map((item, id) => (
    <NavigationItem
      key={id}
      route={item.path}
      name={item.title}
      classNames={elementIsLoading}
      currentLocation={currentPage}
    />
  ));

  return (
    <Navbar className={Classes.DARK}>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading className={elementIsLoading}>Dockernetes</NavbarHeading>
        <NavbarDivider />
        {LeftMenuItems}
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>{RightMenuItems}</NavbarGroup>
    </Navbar>
  );
}

export default Navigation;
