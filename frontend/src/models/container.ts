export class Container {
  Id: string;
  Names: string[];
  Image: string;
  ImageID: string;
  Command: string;
  Created: number;
  State: string;
  Status: string;
  Ports: Port[];
  SizeRw: number;
  SizeRootFs: number;
  HostConfig: HostConfig;
  NetworkSettings: NetworkSettings;
  Mounts: Mount[];
}

export class Port {
  private readonly _PrivatePort: number;
  private readonly _PublicPort: number;
  private readonly _Type: string;

  constructor(PrivatePort: number, PublicPort: number, Type: string) {
    this._PrivatePort = PrivatePort;
    this._PublicPort = PublicPort;
    this._Type = Type;
  }

  get PrivatePort(): number {
    return this._PrivatePort;
  }

  get PublicPort(): number {
    return this._PublicPort;
  }

  get Type(): string {
    return this._Type;
  }
}
