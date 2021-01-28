import React, { ReactElement } from 'react';
import { IconName, NonIdealState } from '@blueprintjs/core';

type NoContainersFoundProps = {
    icon: IconName;
    description: ReactElement;
    message: string;
};

function NoContainersFound(props: NoContainersFoundProps): ReactElement {
    const { icon, description, message } = props;
    return (
        <NonIdealState icon={icon} title={message} description={description} />
    );
}

type DockerStatusProps = {};

function DockerStatus(
    props: DockerStatusProps,
): React.ReactElement | undefined {
    return undefined;
}

class HomeContainer extends React.PureComponent {
    description = (
        <>
            You currently have no containers running.
            <br />
            Try creating a container in the "Create Container" tab.
        </>
    );

    render() {
        return (
            <div style={{ paddingTop: '1rem' }}>
                <NoContainersFound
                    icon="cross"
                    description={this.description}
                    message="No Containers Found"
                />
            </div>
        );
    }
}

export default HomeContainer;
