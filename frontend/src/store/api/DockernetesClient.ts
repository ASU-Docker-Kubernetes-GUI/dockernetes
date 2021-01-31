abstract class DockernetesClient {
  constructor() {}
  abstract getStatus(): object;
  abstract getAllContainers(): object;
  abstract getContainerById(id: string): object;
  abstract restartContainer(id: string): object;
  abstract createContainer(imageName: string): object;
  abstract stopAllContainers(): object;
  abstract stopContainerById(id: string): object;
  abstract getContainerLogs(id: string): object;
}
