import { Card } from '@blueprintjs/core';
import React from 'react';

/**
 * TODO: We're going to need the following here:
 * - The number of containers that are currently running.
 * - The status of our docker environment
 * - How much is the uptime
 * - When a user clicks on the header tag, then it will take them into their respective environment
 * @constructor
 */
export default function HomeCard() {
  return (
    <Card>
      <h1>Hello world</h1>
    </Card>
  );
}
