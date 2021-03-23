import React from 'react';
import ContainerListItem from '../../components/ContainerListItem';

export interface IContainerListProps {
  id?: string;
}

// TODO: What we want to do here is grab all of the user data from the backend
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
