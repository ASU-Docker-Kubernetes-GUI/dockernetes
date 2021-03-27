import axios, { AxiosInstance } from 'axios';
import { DockernetesClient } from './DockernetesClient';

export class Client implements DockernetesClient {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'http://localhost:8080/api/v1/',
      timeout: 1000,
    });
  }

  ping = async (): Promise<object> => await this.axiosClient.get('ping');

  getStatus = async (): Promise<object> => await this.axiosClient.get('status');

  async createContainer(
    imageName: string,
    containerName: string,
  ): Promise<object> {
    return undefined;
  }

  getAllContainers(): object {
    return undefined;
  }

  getContainerById(containerId: string): object {
    return undefined;
  }

  restartContainer(containerId: string): object {
    return undefined;
  }

  stopAllContainers(): object {
    return undefined;
  }

  stopContainer(containerId: string): object {
    return undefined;
  }
}
