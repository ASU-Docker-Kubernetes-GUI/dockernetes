export interface Port {
  IP: string;
  PrivatePort: number;
  PublicPort: number;
  Type: string;
}

export interface Container {
  id: string;
  containerName: string[];
  imageName: string;
  ports: Port[];
  path: string;
  created: number;
  finished: any;
  status: string;
  state: number;
  restartCount: number;
}
