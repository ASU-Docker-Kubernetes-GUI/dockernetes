import React, { ReactElement } from 'react';
import { IconName, NonIdealState } from '@blueprintjs/core';
import { checkApiStatus, checkDockerStatus, Status } from './HomeSlice';

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

type DockerStatusProps = {
  dockerStatus: Status;
  apiStatus: Status;
};

function DockerStatus(
  props: DockerStatusProps,
): React.ReactElement | undefined {
  const { dockerStatus, apiStatus } = props;
  return <>{apiStatus + ' ' + dockerStatus}</>;
}

class HomeContainer extends React.PureComponent {
  componentDidMount() {
    checkDockerStatus();
    checkApiStatus();
  }

  description = (
    <>
      You currently have no containers running.
      <br />
      Try creating a container in the "Create Container" tab.
    </>
  );

  render() {
    return (
      <div style={{ paddingTop: '1rem' }}>
        <NoContainersFound
          icon="cross"
          description={this.description}
          message="No Containers Found"
        />
      </div>
    );
  }
}

export default HomeContainer;
