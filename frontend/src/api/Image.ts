export interface Image {
  id: string;
  tags: string[];
  created: number;
  size: number;
  containers: number;
  author: string;
  architecture: string;
  os: string;
}
