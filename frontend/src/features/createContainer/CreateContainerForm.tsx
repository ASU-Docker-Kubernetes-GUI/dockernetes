import {
  Alert,
  Button,
  FormGroup,
  InputGroup,
  Toast,
  Toaster,
} from '@blueprintjs/core';
import React, { FormEvent, useState } from 'react';
import AxiosClient from '../../api/Client';
import { AppToaster } from '../../components/ContainerButtons';

export function CreateContainerForm() {
  const [containerName, setContainerName] = React.useState<string>('');
  const [imageName, setImageName] = React.useState<string>('');
  const [errorPaneEnabled, setErrorPaneEnabled] = React.useState<boolean>(
    false,
  );
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const handleFormSubmission = (event: React.MouseEvent<HTMLElement>) => {
    console.log('clicked button');
    event.preventDefault();

    if (imageName == '') {
      setErrorPaneEnabled(true);
      setErrorMessage('Image name must not be blank!');
      return;
    }

    AxiosClient.post('containers/create', {
      imageName: imageName,
      containerName: containerName,
    })
      .then((response) => {
        console.log('successful');
        setTimeout(
          () =>
            AppToaster.show({
              message: `Successfully created container: ${response.data.substring(
                response.data.length - 8,
                response.data.length - 1,
              )}`,
              timeout: 3000,
              intent: 'success',
            }),
          3000,
        );
      })
      .catch((e) => {
        console.log(e);
        setErrorPaneEnabled(true);
        setErrorMessage('Server error occured! Try again');
      });

    setImageName('');
    setContainerName('');
  };

  return (
    <>
      <Alert
        confirmButtonText={'OK'}
        isOpen={errorPaneEnabled}
        onClose={(evt) => {
          setErrorPaneEnabled(false);
        }}
      >
        <p>{errorMessage}</p>
      </Alert>

      <h2>Create a Container</h2>
      <FormGroup
        label="Container Name"
        label-for="parsedContainer-name-input"
        labelInfo="(leave blank if no name desired)"
      >
        <InputGroup
          id="parsedContainer-name-input"
          large
          onChange={(e) => setContainerName(e.target.value)}
        />
      </FormGroup>
      <FormGroup
        label="Image Name"
        label-for="parsedContainer-name-input"
        labelInfo="(required)"
      >
        <InputGroup
          id="image-name-input"
          large
          onChange={(e) => setImageName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Button icon={'layers'} onClick={handleFormSubmission}>
          Create this container
        </Button>
      </FormGroup>
    </>
  );
}
