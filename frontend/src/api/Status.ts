export interface Status {
  id: string;
  environmentName: string;
  containers: number;
  volumes: number;
  images: number;
  dockerRootDirectory: string;
  cpuCount: number;
  memoryInUse: number;
}
