// The interface that we will use to get Dockernetes API calls from
import axios, { AxiosInstance } from "axios";

export class ProductionDockernetesClient extends DockernetesClient {
  private axiosClient: AxiosInstance;

  constructor(baseURL: string, timeout: number) {
    super();

    this.axiosClient = axios.create({
      baseURL: baseURL,
      timeout: timeout,
    });
  }

  async createContainer(imageName: string): Promise<object> {
    return undefined;
  }

  async getAllContainers(): Promise<object> {
    let response;
    try {
      response = await this.axiosClient.get("/containers");
      if (response.status < 200 || response.status > 300) {
        throw new Error('There was a server error');
      }

    } catch (error) {
      throw new Error(error);
    }

    return response;
  }

  async getContainerById(id: string): Promise<object> {
    let response;
    try {
      response = await this.axiosClient.get(`/containers/${id}`)
      if (response.status < 200 || response.status > 300) {
        throw new Error('There was a server error');
      }

    } catch (error) {
      throw new Error(error);
    }

    return response;
  }

  async getContainerLogs(id: string): Promise<object> {
    return undefined;
  }

  async getStatus(): Promise<object> {
    return undefined;
  }

  async restartContainer(id: string): Promise<object> {
    return undefined;
  }

  async stopAllContainers(): Promise<object> {
    return undefined;
  }

  async stopContainerById(id: string): Promise<object> {
    return undefined;
  }

}

