import React from 'react';
import AxiosClient from '../../api/Client';
import { Container } from '../../api/Container';
import { Card, Divider, Elevation, Intent, Tag } from '@blueprintjs/core';
import { ContainerButtons } from '../../components/ContainerButtons';
import { transformID } from '../../utils/util';

interface ContainerStatusProps {
  status: string;
  state: number;
}

function ContainerStatus(props: ContainerStatusProps) {
  const { status } = props;
  const intentOptions = new Map([['running', Intent.SUCCESS]]);

  const intent = intentOptions.get(status);

  return (
    <Tag intent={intent} round title={status} large>
      {status}
    </Tag>
  );
}

interface ContainerListItemProps {
  containerId: string;
  containerNames: string[];
  imageName: string;
  ipAddress: string;
  privatePort: number;
  publicPort?: number;
  type: string;
  path: string;
  created: string;
  finished?: string;
  status: string;
  state: number;
  restartCount: number;
  isLoading: boolean;
}

function ContainerListItem(props: ContainerListItemProps) {
  const {
    containerId,
    containerNames,
    imageName,
    ipAddress,
    privatePort,
    publicPort,
    type,
    path,
    created,
    finished,
    status,
    state,
    restartCount,
    isLoading,
  } = props;

  const ContainerFinished = () =>
    finished != null ? (
      <p className={`bp3-running-text ${isLoading ? 'bp3-skeleton' : ''}`}>
        Container path: {path}
      </p>
    ) : null;

  const ContainerDataItem = (info: string, isItemLoading: boolean) =>
    info != null ? (
      <p className={`bp3-running-text ${isItemLoading ? 'bp3-skeleton' : ''}`}>
        {info}
      </p>
    ) : null;

  return (
    <Card id={containerId} elevation={Elevation.ONE} style={{ margin: '1em' }}>
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <h4 className={'bp3-heading'}>
            {`${containerNames[0].replace('/', '')}`}
          </h4>
          <br />
          <Tag style={{ marginLeft: '0.5em' }}>{status}</Tag>
        </div>
        <Divider />
        <br />
        <p className={'bp3-running-text'}>ID: {transformID(containerId)}</p>
        <p className={'bp3-running-text'}>Image Name: {imageName}</p>
        <p className={'bp3-running-text'}>Created Time: {created}</p>
        <ContainerFinished />
        <p className={'bp3-running-text'}>IP Address: {ipAddress}</p>
        <p className={'bp3-running-text'}>Private Port: {privatePort}</p>
        <p className={'bp3-running-text'}>Public Port: {publicPort}</p>
        <p className={'bp3-running-text'}>Port type: {type}</p>
        <p className={'bp3-running-text'}>Container path: {path}</p>
        <p className={'bp3-running-text'}>Container state: {state}</p>
        {restartCount == null || restartCount == 0 ? null : (
          <p className={'bp3-running-text'}>
            Container restart count: {restartCount}
          </p>
        )}
      </div>
      <Divider />
      <ContainerButtons containerId={containerId} />
    </Card>
  );
}

export function ContainerList() {
  const [responseData, setResponseData] = React.useState<Container[]>(
    Array.of<Container>(),
  );
  const [panelLoading, setPanelLoading] = React.useState<boolean>(true);

  const fetchContainers: () => void = React.useCallback(() => {
    AxiosClient.get('containers')
      .then((response) => {
        setResponseData(response.data);
        setPanelLoading(false);
      })
      .catch((_) => {
        console.log('Error!');
      });
  }, []);

  React.useEffect(() => {
    fetchContainers();
  }, [fetchContainers]);

  return (
    <div style={{ padding: '1em' }}>
      <h2>All Containers</h2>
      {responseData.map(
        (
          {
            containerName,
            created,
            id,
            imageName,
            path,
            ports,
            restartCount,
            state,
            status,
          },
          index,
        ) => (
          <ContainerListItem
            isLoading={panelLoading}
            key={index}
            containerId={id}
            containerNames={containerName}
            imageName={imageName}
            ipAddress={ports[0]?.IP ?? ''}
            privatePort={ports[0]?.PrivatePort ?? ''}
            type={ports[0]?.Type ?? ''}
            path={path}
            created={new Date(created * 1000).toLocaleString()}
            status={status}
            state={state}
            restartCount={restartCount}
          />
        ),
      )}
    </div>
  );
}
