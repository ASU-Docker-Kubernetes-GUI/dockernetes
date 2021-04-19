export interface Image {
  imageId: string;
  repoTags: string[];
  created: number;
  size: number;
  containers: number;
  author: string;
  architecture: string;
  os: string;
}
