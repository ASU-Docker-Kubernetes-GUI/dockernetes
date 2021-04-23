import React from 'react';
import AxiosClient from '../api/Client';
import { Image } from '../api/Image';
import { transformID } from '../utils/util';
import { formatBytes } from './HomeCard';

type ImageListItemProps = {
  imageId: string;
  repoTags: string[];
  created: number;
  size: number;
  author: string;
  architecture: string;
  os: string;
};

const ImageListItem = (props: ImageListItemProps) => (
  <>
    <tr>
      <td>{transformID(props.imageId)}</td>
      <td>{props.repoTags?.join(', ') ?? 'undefined'}</td>
      <td>{new Date(props.created * 1000).toLocaleString()}</td>
      <td>{formatBytes(props.size)}</td>
      <td>{props?.author ?? 'No author'}</td>
      <td>{props.architecture}</td>
      <td>{props.os}</td>
    </tr>
  </>
);

const ImageListHeader = () => (
  <>
    <thead>
      <tr>
        <th>ID</th>
        <th>Tags</th>
        <th>Created</th>
        <th>Size</th>
        <th>Author</th>
        <th>Architecture</th>
        <th>OS</th>
      </tr>
    </thead>
  </>
);

const ImageList = ({ imageList }: { imageList: Image[] }) => {
  return (
    <>
      <ImageListHeader />
      {imageList.map((imageResult, index) => {
        if (imageResult) {
          return (
            <ImageListItem
              key={index}
              imageId={imageResult.id}
              repoTags={imageResult.tags}
              created={imageResult.created}
              size={imageResult.size}
              author={imageResult.author}
              architecture={imageResult.architecture}
              os={imageResult.os}
            />
          );
        }
        return null;
      })}
    </>
  );
};

export const Images = () => {
  const [imageList, setImageList] = React.useState<Image[]>(Array.of<Image>());
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isPanelErrored, setPanelErrored] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const fetchImages: () => void = React.useCallback(() => {
    AxiosClient.get('images')
      .then((response) => {
        console.log(response.data);
        setImageList(response.data);
        setIsLoading(false);
      })
      .catch((_) => {
        console.log('Error!');
      });
  }, []);

  React.useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <div>
      <h2>All Images</h2>
      <ImageList imageList={imageList} />
    </div>
  );
};
