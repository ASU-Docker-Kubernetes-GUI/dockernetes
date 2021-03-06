import React from 'react';
import { Spinner } from '@blueprintjs/core';

export interface LoadingScreenProps {
  name: string;
  size?: number;
}

export default function LoadingScreen(props: LoadingScreenProps) {
  const { name, size } = props;
  const spinnerSize = size != null ? size : 100;

  return (
    <>
      <Spinner size={spinnerSize} intent="success" />
      <h1>Loading {name}...</h1>
    </>
  );
}
