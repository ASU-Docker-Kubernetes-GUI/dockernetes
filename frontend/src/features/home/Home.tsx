import React, { ReactElement } from 'react';
import { IconName, NonIdealState } from '@blueprintjs/core';
import {checkApiStatus, checkDockerStatus, getApiStatus, getDockerStatus, Status} from './HomeSlice';
import {Intent, Tag} from "@blueprintjs/core/lib/esnext";
import {useSelector} from "react-redux";

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

const statusColor = (status: Status): Intent => {
  switch (status) {
    case Status.ON:
      return "success";
    case Status.DEGRADED:
      return "warning";
    case Status.OFF:
      return "danger";
  }
};



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

  ServerStatusBadge = (status: Status) => {
    <Tag title="  " intent={statusColor(status)} round />
  };

  render() {
    const dockerStatus = useSelector(getDockerStatus);
    const apiStatus = useSelector(getApiStatus);

    return (
      <div style={{ paddingTop: '1rem' }}>
        <NoContainersFound
          icon="cross"
          description={this.description}
          message="No Containers Found"
        />
        <ServerStatusBadge status={dockerStatus}/>
      </div>
    );
  }
}

export default HomeContainer;
