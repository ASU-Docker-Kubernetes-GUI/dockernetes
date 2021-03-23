import { IconName, Intent, NonIdealState } from '@blueprintjs/core';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import ContainerListItem from '../../components/ContainerListItem';
import HomeCard from '../../components/HomeCard';
import {
  checkApiStatus,
  checkDockerStatus,
  getApiStatus,
  getDockerStatus,
  Status,
} from './HomeSlice';

type NoContainersFoundProps = {
  icon: IconName;
  description: ReactElement;
  message: string;
};

function NoContainersFound(props: NoContainersFoundProps): ReactElement {
  const { icon, description, message } = props;
  return (
    <NonIdealState icon={icon} title={message} description={description} />
  );
}

export const statusColor = (status: Status): Intent => {
  switch (status) {
    case Status.ON:
      return 'success';
    case Status.DEGRADED:
      return 'warning';
    case Status.OFF:
      return 'danger';
  }
};

export const message = (status: Status): string => {
  switch (status) {
    case Status.ON:
      return 'Ready';
    case Status.DEGRADED:
      return 'Degraded';
    case Status.OFF:
      return 'Off';
  }
};

const description = (
  <>
    You currently have no containers running.
    <br />
    Try creating a container in the <em>Create Container</em> tab.
  </>
);

function HomeContainer() {
  checkDockerStatus();
  checkApiStatus();

  const dockerStatus = useSelector(getDockerStatus);
  const apiStatus = useSelector(getApiStatus);

  return <div style={{ paddingTop: '1rem' }}></div>;
}

export default HomeContainer;
