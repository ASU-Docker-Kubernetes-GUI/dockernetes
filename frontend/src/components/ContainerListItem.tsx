import { Card, Divider, Elevation, Intent, Tag } from '@blueprintjs/core';
import React from 'react';
import { ContainerButtons } from './ContainerButtons';

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

export interface ContainerListItemProps {
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

export function ContainerListItem(props: ContainerListItemProps) {
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
    <Card
      id={containerId}
      elevation={Elevation.THREE}
      style={{ margin: '1em' }}
    >
      <div>
        <h2 className={'bp3-heading'}>
          {`${containerNames[0].replace('/', '')}`}
        </h2>
        <p>{status}</p>
        <Divider />
        <br />
        <p className={'bp3-running-text'}>ID: {containerId}</p>
        <p className={'bp3-running-text'}>Image Name: {imageName}</p>
        <p className={'bp3-running-text'}>Created Time: {created}</p>
        <ContainerFinished />
        <p className={'bp3-running-text'}>IP Address: {ipAddress}</p>
        <p className={'bp3-running-text'}>Private Port: {privatePort}</p>
        <p className={'bp3-running-text'}>Public Port: {publicPort}</p>
        <p className={'bp3-running-text'}>Port type: {type}</p>
        <p className={'bp3-running-text'}>Container path: {path}</p>
        <p className={'bp3-running-text'}>Container state: {state}</p>
        <p className={'bp3-running-text'}>
          Container restart count: {restartCount}
        </p>
      </div>
      <Divider />
      <ContainerButtons containerId={containerId} />
    </Card>
  );
}
