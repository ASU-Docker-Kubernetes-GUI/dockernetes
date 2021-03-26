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

  createContainer = async (
    imageName: string,
    containerName: string,
  ): Promise<object> => {
    if (imageName == null) {
      throw Error('Image names cannot be null');
    }

    let requestParams = {
      imageName: imageName,
      containerName: containerName,
    };

    const response = await this.axiosClient.post(
      'containers/create',
      requestParams,
    );

    const { data, status } = response;

    if (status > 200) {
      throw Error('Request to create container was unsuccessful');
    }

    return data;
  };

  getAllContainers = async (): Promise<object> =>
    await this.axiosClient.get('containers');

  getContainerById = async (containerId: string): Promise<object> => {
    if (containerId == '') {
      throw Error('ContainerId cannot be empty');
    }

    const response = await this.axiosClient.get(`/containers/${containerId}`);

    const { data, status } = response;

    if (status > 200) {
      throw Error('Request to API client unsuccessful');
    }

    return data;
  };

  restartContainer = async (containerId: string): Promise<object> => {
    if (containerId == '') {
      throw Error('ContainerId cannot be empty');
    }

    const response = await this.axiosClient.get(`restart/${containerId}`);

    const { data, status } = response;

    if (status > 200) {
      throw Error('Request to restart containers was unsuccessful');
    }

    return data;
  };

  stopAllContainers = async (): Promise<object> =>
    await this.axiosClient.get('stop');

  stopContainer = async (containerId: string): Promise<object> => {
    if (containerId == '') {
      throw Error('ContainerId cannot be empty');
    }

    const response = await this.axiosClient.get(`stop/${containerId}`);

    const { data, status } = response;

    if (status > 200) {
      throw Error('Request to restart containers was unsuccessful');
    }

    return data;
  };
}
