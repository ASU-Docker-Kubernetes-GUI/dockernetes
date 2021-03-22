import { Card, Elevation, Tag, Intent, Divider } from '@blueprintjs/core';
import React, { Component } from 'react';
import { ContainerButtons } from './ContainerButtons';

type ContainerStatusProps = { status: string };

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
  id?: string;
  name?: string; // the name of the container
  status?: string; // The status will either be: running/stopped
  image?: string; // the name of the image
  created?: string; // when the image was created
  host?: string; // who is hosting this container
  publishedPorts?: string; // what ports are public
  ownership?: string; // who owns this damn container
}

class ContainerListItem extends Component<ContainerListItemProps, any> {
  render() {
    const {
      id,
      name,
      status,
      image,
      created,
      host,
      publishedPorts,
      ownership,
    } = this.props;

    return (
      <Card id={id} elevation={Elevation.THREE}>
        <div>
          <h2 className={'bp3-heading'}>
            {`${name}`}{' '}
            <ContainerStatus
              status={status === undefined ? 'running' : status}
            />
          </h2>
          <Divider />
          <br />
          <p className={'bp3-running-text'}>ID: {id}</p>
          <p className={'bp3-running-text'}>Image Name: {image}</p>
          <p className={'bp3-running-text'}>Created Time: {created}</p>
          <p className={'bp3-running-text'}>Host: {host}</p>
          <p className={'bp3-running-text'}>
            Published Ports: {publishedPorts}
          </p>
          <p className={'bp3-running-text'}>Ownership: {ownership}</p>
        </div>
        <Divider />
        <ContainerButtons containerId={'1234'} />
      </Card>
    );
  }
}

export default ContainerListItem;
