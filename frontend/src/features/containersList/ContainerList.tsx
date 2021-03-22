import React from 'react';
import ContainerListItem from '../../components/ContainerListItem';

export interface IContainerListProps {
  id?: string;
}

export class ContainerList extends React.Component<IContainerListProps> {
  public render() {
    return (
      <>
        <ContainerListItem />
        <ContainerListItem />
        <ContainerListItem />
      </>
    );
  }
}
