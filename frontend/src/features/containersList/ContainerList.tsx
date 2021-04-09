import React from 'react';
import ContainerListItem from '../../components/ContainerListItem';
import { transformObj } from '../../utils/util';

export interface IContainerListProps {
  id?: string;
}

export function ContainerList() {
  const obj = {
    Id: 'cdca9b76a4180c44234e4911ae0675b63d94a7b9586348bc2297934561bacd79',
    Names: ['/portainer_agent'],
    Image: 'portainer/agent',
    ImageID:
      'sha256:c81206f03f4ab591bc8db5782d2a45d0546d5df9ba0ebb55e55fd33bf7f7aed7',
    Command: './agent',
    Created: 1616304716,
    Ports: [
      { IP: '0.0.0.0', PrivatePort: 9001, PublicPort: 9001, Type: 'tcp' },
    ],
    Labels: {
      'desktop.docker.io/binds/1/Source': '/var/run/docker.sock',
      'desktop.docker.io/binds/1/SourceKind': 'dockerSocketProxied',
      'desktop.docker.io/binds/1/Target': '/var/run/docker.sock',
    },
    State: 'running',
    Status: 'Up 25 hours',
    HostConfig: { NetworkMode: 'default' },
    NetworkSettings: {
      Networks: {
        bridge: {
          IPAMConfig: null,
          Links: null,
          Aliases: null,
          NetworkID:
            'bc566736e7d43c51b453589ebf18962599a247291516bc02e6ffcec0356dc6a0',
          EndpointID:
            '2a0ac7121cfdc493b7128c64a63c2608ce561dabbd77ec065676fe01fa43279a',
          Gateway: '172.17.0.1',
          IPAddress: '172.17.0.2',
          IPPrefixLen: 16,
          IPv6Gateway: '',
          GlobalIPv6Address: '',
          GlobalIPv6PrefixLen: 0,
          MacAddress: '02:42:ac:11:00:02',
          DriverOpts: null,
        },
      },
    },
    Mounts: [
      {
        Type: 'bind',
        Source: '/var/lib/docker/volumes',
        Destination: '/var/lib/docker/volumes',
        Mode: '',
        RW: true,
        Propagation: 'rslave',
      },
      {
        Type: 'bind',
        Source: '/run/host-services/docker.proxy.sock',
        Destination: '/var/run/docker.sock',
        Mode: '',
        RW: true,
        Propagation: 'rprivate',
      },
    ],
  };

  console.log(transformObj(obj));
  return (
    <>
      <ContainerListItem />
      <ContainerListItem />
      <ContainerListItem />
    </>
  );
}
