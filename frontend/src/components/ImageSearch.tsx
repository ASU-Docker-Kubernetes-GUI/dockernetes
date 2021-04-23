import { Button, InputGroup, Tag } from '@blueprintjs/core';
import React, { ReactElement } from 'react';
import AxiosClient from '../api/Client';
import { ImageSearch as ImageSearchModel } from '../api/ImageSearch';

type ImageSearchItemProps = {
  name: string;
  isOfficial: boolean;
  starCount: number;
  description: string;
};

const ImageSearchTag = ({ message }: { message: string }) => (
  <Tag round>{message}</Tag>
);

const ImageSearchListItem = (props: ImageSearchItemProps) => (
  <>
    <tr>
      <td>
        {props.name}{' '}
        {props.isOfficial ? <ImageSearchTag message="official" /> : null}
      </td>
      <td>{props.starCount}</td>
      <td>{props.description}</td>
    </tr>
  </>
);

const ImageSearchListHeaders = () => (
  <thead>
    <tr>
      <th>Image name</th>
      <th>Star count</th>
      <th>Description</th>
    </tr>
  </thead>
);

const ImageSearchList = ({
  searchResults,
}: {
  searchResults: ImageSearchModel[];
}) => {
  return (
    <>
      <ImageSearchListHeaders />
      {searchResults.map((searchResult, index) => {
        if (searchResult) {
          return (
            <ImageSearchListItem
              name={searchResult.name}
              isOfficial={searchResult.isOfficial}
              starCount={searchResult.starCount}
              description={searchResult.description}
            />
          );
        }
        return null;
      })}
    </>
  );
};

export const ImageSearch = () => {
  const [searchInput, setSearchInput] = React.useState<string>('');
  const [searchList, setSearchList] = React.useState<ImageSearchModel[]>(
    Array.of<ImageSearchModel>(),
  );
  const [enableSearchResults, setEnableSearchResults] = React.useState<boolean>(
    false,
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const fetchSearchResults = async (searchQuery: string) => {
    if (searchQuery == null) return null;
    setIsLoading(true);

    return AxiosClient.get(`images/search?searchTerm=${searchQuery}`)
      .then((response) => {
        console.log(response.data);
        setSearchList(response.data);
        setIsLoading(false);
        setEnableSearchResults(true);
      })
      .catch((e) => {
        setSearchList([]);
        setIsLoading(false);
        setEnableSearchResults(true);
      });
  };

  const submitSearchQuery = async () => {
    setSearchInput(searchInput);
    await fetchSearchResults(searchInput);
  };

  return (
    <div style={{ paddingTop: '1em' }}>
      <h2>Image Search</h2>
      <p>Search for an image below</p>
      <form className="form" style={{ paddingBottom: '1em' }}>
        <InputGroup
          type="text"
          id="image-search"
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="search for an image"
        />
        <Button
          type="submit"
          onClick={(e: any) => {
            submitSearchQuery().then();
          }}
        >
          Search Images
        </Button>
      </form>
      {enableSearchResults ? (
        <ImageSearchList searchResults={searchList} />
      ) : null}
    </div>
  );
};
