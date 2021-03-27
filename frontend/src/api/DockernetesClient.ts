export interface DockernetesClient {
  /**
   * ping establishes a connection to the Dockernetes server.
   */
  ping(): Promise<object>;

  /**
   * getStatus returns the current Docker environment.
   */
  getStatus(): Promise<object>;

  /**
   * getAllContainers returns all containers in a Docker environment.
   */
  getAllContainers(): object;

  /**
   * GetContainerById gets a container by a given ID.
   */
  getContainerById(containerId: string): object;

  /**
   * stopContainer stops a container given an ID.
   */
  stopContainer(containerId: string): object;

  /**
   * stopAllContainers stops all containers in the environment.
   */
  stopAllContainers(): object;

  /**
   * restartContainer restarts a container with a given ID.
   */
  restartContainer(containerId: string): object;

  /**
   * createContainer creates a container with a given image name and container name.
   */
  createContainer(imageName: string, containerName: string): object;
}
