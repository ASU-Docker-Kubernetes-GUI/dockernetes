import { Card, Elevation, Tag, Intent, Divider } from '@blueprintjs/core';
import React, { Component } from 'react';

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

interface ContainerButtonProps {
  containerId: string;
  handlerFunction: Function;
}

function ContainerButton(props: ContainerButtonProps) {
  const { containerId } = props;
}

export type ContainerListItemProps = {
  id?: string;
  name?: string; // the name of the container
  status?: string; // The status will either be: running/stopped
  image?: string; // the name of the image
  created?: string; // when the image was created
  host?: string; // who is hosting this container
  publishedPorts?: string; // what ports are public
  ownership?: string; // who owns this damn container
};

class ContainerListItem extends Component<ContainerListItemProps> {
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
      <Card interactive id={id} elevation={Elevation.THREE}>
        <div>
          <h2>
            {`${name}`}{' '}
            <ContainerStatus
              status={status === undefined ? 'running' : status}
            />
          </h2>
          <Divider />
          <p>Id: {id}</p>
          <p>Image Name: {image}</p>
          <p>Created Time: {created}</p>
          <p>Host: {host}</p>
          <p>Published Ports: {publishedPorts}</p>
          <p>Ownership: {ownership}</p>
        </div>
      </Card>
    );
  }
}

export default ContainerListItem;
