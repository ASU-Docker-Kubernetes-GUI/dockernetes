import {
  Button,
  Card,
  Elevation,
  Colors,
  Tag,
  Intent,
  Divider,
} from '@blueprintjs/core';
import { stat } from 'fs';
import React, { Component, ReactElement } from 'react';

export type ContainerListItemProps = {
  name?: string; // the name of the container
  status?: string; // The status will either be: running/stopped
  image?: string;
  created?: string;
  host?: string;
  publishedPorts?: string;
  ownership?: string;
};

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

class ContainerListItem extends Component<ContainerListItemProps> {
  render() {
    const {
      name,
      status,
      image,
      created,
      host,
      publishedPorts,
      ownership,
    } = this.props;

    return (
      <Card interactive elevation={Elevation.THREE}>
        <div>
          <h2>
            {'PrivateName  '}
            <ContainerStatus status={'running'} />
          </h2>
          <Divider />
          <p>Image Name: {image}</p>
        </div>
      </Card>
    );
  }
}

export default ContainerListItem;
