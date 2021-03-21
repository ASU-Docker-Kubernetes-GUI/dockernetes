import { Button, ButtonGroup, Intent, Toast, Toaster } from '@blueprintjs/core';
import React from 'react';

export const AppToaster = Toaster.create({
  position: 'top-right',
  maxToasts: 3,
});

export interface IContainerButtonProps {
  containerId: string;
}

export class ContainerButtons extends React.PureComponent<IContainerButtonProps> {
  public render() {
    return (
      <>
        <div>
          <h3>Container action buttons</h3>
        </div>
        <ButtonGroup large>
          {this.StartButton}
          {this.StopButton}
          {this.KillButton}
        </ButtonGroup>{' '}
        <ButtonGroup large>
          {this.RestartButton}
          {this.ResumeButton}
          {this.DeleteButton}
        </ButtonGroup>
        <Toaster />
      </>
    );
  }

  // TODO: Add network calls to all of these
  private handleStartContainer() {
    // Show the toast optimistically
    this.showToast('Starting container...', 'success');
    // Add logic to start creating the container here
    // Then finally update and let the thing know that the conatiner ist started
    setTimeout(
      () =>
        this.showToast(`Started container ${this.props.containerId}`, 'none'),
      3000,
    );
  }

  private handleStopContainer() {
    this.showToast('Stopping container...', 'warning', 1000);

    setTimeout(() => this.showToast('Stopped container.', 'none'), 3000);
  }

  private handleKillContainer() {
    this.showToast('Killing container...', 'danger', 1000);
    setTimeout(
      () =>
        this.showToast(`Killed container ${this.props.containerId}`, 'none'),
      3000,
    );
  }

  private handleRestartContainer() {
    this.showToast('Restarting container...', 'warning', 1000);
    setTimeout(
      () =>
        this.showToast(`Restarted container ${this.props.containerId}`, 'none'),
      3000,
    );
  }

  private handleResumeContainer() {
    this.showToast('Resuming container...', 'warning', 1000);
    setTimeout(
      () =>
        this.showToast(`Resumed container ${this.props.containerId}`, 'none'),
      3000,
    );
  }

  private handleRemoveContainer() {
    this.showToast('Removing container...', 'warning', 1000);
    setTimeout(
      () =>
        this.showToast(`Removed container ${this.props.containerId}`, 'none'),
      3000,
    );
  }

  private showToast = (message: string, intent: Intent, timeout?: number) => {
    AppToaster.show({ message: message, intent: intent, timeout: timeout });
  };

  private StartButton = (
    <Button
      icon={'play'}
      intent={Intent.SUCCESS}
      onClick={this.handleStartContainer.bind(this)}
    >
      Start
    </Button>
  );

  private StopButton = (
    <Button
      icon={'stop'}
      intent={Intent.DANGER}
      onClick={this.handleStopContainer.bind(this)}
    >
      Stop
    </Button>
  );

  private KillButton = (
    <Button
      icon={'delete'}
      intent={Intent.DANGER}
      onClick={this.handleKillContainer.bind(this)}
    >
      Kill
    </Button>
  );

  private RestartButton = (
    <Button
      icon={'reset'}
      intent={Intent.WARNING}
      onClick={this.handleRestartContainer.bind(this)}
    >
      Restart
    </Button>
  );

  private ResumeButton = (
    <Button
      icon={'pause'}
      intent={Intent.WARNING}
      onClick={this.handleResumeContainer.bind(this)}
    >
      Resume
    </Button>
  );

  private DeleteButton = (
    <Button
      icon={'trash'}
      intent={Intent.DANGER}
      onClick={this.handleRemoveContainer.bind(this)}
    >
      Delete
    </Button>
  );
}
