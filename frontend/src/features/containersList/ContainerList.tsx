import { Spinner } from '@blueprintjs/core';
import React from 'react';
import AxiosClient from '../../api/Client';
import { Port } from '../../api/Port';
import { ContainerListItem } from '../../components/ContainerListItem';
import { Container } from '../../api/Container';
import { transformObj } from '../../utils/util';

export interface IContainerListProps {
  id?: string;
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
    <>
      {responseData.map((item, index) => (
        <ContainerListItem
          isLoading={panelLoading}
          key={index}
          containerId={item.id}
          containerNames={item.containerName}
          imageName={item.imageName}
          ipAddress={item.ports[0]?.IP ?? ''}
          privatePort={item.ports[0]?.PrivatePort ?? ''}
          type={item.ports[0]?.Type ?? ''}
          path={item.path}
          created={new Date(item.created).toDateString()}
          status={item.status}
          state={item.state}
          restartCount={item.restartCount ?? 0}
        />
      ))}
    </>
  );
}
