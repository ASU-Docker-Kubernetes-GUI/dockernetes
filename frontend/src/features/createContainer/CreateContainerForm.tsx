import { Button, FormGroup, InputGroup } from '@blueprintjs/core';
import React from 'react';

export class CreateContainerForm extends React.PureComponent {
  private containerNameInput = React.createRef<HTMLInputElement>();
  private imageNameInput = React.createRef<HTMLInputElement>();

  render() {
    return (
      <>
        <h2>Create a Container</h2>
        <FormGroup
          label="Container Name"
          label-for="parsedContainer-name-input"
          labelInfo="(leave blank if no name desired)"
        >
          <InputGroup
            id="parsedContainer-name-input"
            large
            inputRef={this.containerNameInput}
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
            inputRef={this.imageNameInput}
          />
        </FormGroup>
        {this.deployContainerButton}
      </>
    );
  }

  private deployContainerButton = (
    <Button large icon="layers" onClick={this.handleDeployContainer}>
      Deploy this parsedContainer
    </Button>
  );

  private handleDeployContainer() {
    console.log('Hello world');
    alert('Deployed the parsedContainer');
  }
}
