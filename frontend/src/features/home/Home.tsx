import { IconName, NonIdealState } from '@blueprintjs/core';
import React, { ReactElement } from 'react';
import AxiosClient from '../../api/Client';
import HomeCard from '../../components/HomeCard';

import { Status } from '../../api/Status';

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

function HomeContainer() {
  const [responseData, setResponseData] = React.useState<Status | null>(null);
  const [panelErrored, setPanelErrored] = React.useState(false);

  // Fetch data from the server. If error occurs then render the error message.
  const fetchInfo: () => void = React.useCallback(() => {
    AxiosClient.get('status')
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((_) => {
        setPanelErrored(true);
      });
  }, []);

  React.useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  return panelErrored ? (
    <NoContainersFound
      description={
        <p>Please check your Docker environment settings. Is Docker running?</p>
      }
      icon={'cross'}
      message={'Unable to fetch Docker environment'}
    />
  ) : (
    <div style={{ padding: '1rem' }}>
      <h1>Dashboard</h1>
      <HomeCard
        id={responseData?.id ?? '1234'}
        name={responseData?.environmentName ?? 'demo-environment'}
        containerCount={responseData?.containers ?? 0}
        imageCount={responseData?.images ?? 0}
        dockerRootDirectory={
          responseData?.dockerRootDirectory ?? '/var/sock/docker'
        }
        cpuCount={responseData?.cpuCount ?? 4}
        memoryCount={responseData?.memoryInUse ?? 21348984}
      />
    </div>
  );
}

export default HomeContainer;
