import axios from 'axios';

const AxiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1/docker',
  timeout: 1000,
});

export default AxiosClient;
