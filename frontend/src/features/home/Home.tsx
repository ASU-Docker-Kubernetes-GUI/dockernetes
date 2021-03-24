import {
  Card,
  Elevation,
  IconName,
  Intent,
  Label,
  NonIdealState,
  Tag,
} from '@blueprintjs/core';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
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

class HomeContainer extends React.Component {
  componentDidMount() {
    checkDockerStatus();
    checkApiStatus();
  }

  render() {
    return (
      <div style={{ padding: '1rem' }}>
        <h1>Dashboard</h1>
        <HomeCard
          id={'1234'}
          name={'local'}
          containerCount={12}
          imageCount={15}
          dockerRootDirectory={'/var/sock/docker'}
          cpuCount={4}
          memoryCount={21348984}
        />
      </div>
    );
  }
}

export default HomeContainer;
