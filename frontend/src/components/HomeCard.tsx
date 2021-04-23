import { Card, Elevation, Icon, Intent, Tag } from '@blueprintjs/core';
import React from 'react';

export interface IHomeCardProps {
  id: string;
  name: string;
  containerCount: number;
  imageCount: number;
  dockerRootDirectory: string;
  cpuCount: number;
  memoryCount: number;
}

export default function HomeCard(props: IHomeCardProps) {
  const {
    id,
    name,
    containerCount,
    imageCount,
    dockerRootDirectory,
    cpuCount,
    memoryCount,
  } = props;
  return (
    <Card id={id} elevation={Elevation.THREE}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: 'auto',
        }}
      >
        <h2>
          {name}{' '}
          <Tag intent={Intent.SUCCESS} round>
            UP
          </Tag>
        </h2>{' '}
      </div>
      <div>
        <p>
          <Icon icon="layers" /> Containers: {containerCount}
        </p>
        <p>
          <Icon icon="database" />
          Volumes: {containerCount}
        </p>
        <p>
          <Icon icon="folder-close" /> Images: {imageCount}
        </p>
        <p>Docker root directory: {dockerRootDirectory}</p>
        <p>Number of CPUs: {cpuCount}</p>
        <p>Memory in use: {formatBytes(memoryCount, 1)}</p>
      </div>
    </Card>
  );
}

/**
 * Formats the bytes into some human readable format, i.e. 1.2 GB, 3 MB,
 * @param bytes the number of bytes to process
 * @param decimals the number of decimal points to round it out to
 */
export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm: number = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
