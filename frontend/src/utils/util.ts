/** Event handler that exposes the target element's value as a boolean. */
import React from 'react';

export function handleBooleanChange(handler: (checked: boolean) => void) {
  return (event: React.FormEvent<HTMLElement>) =>
    handler((event.target as HTMLInputElement).checked);
}

/** Event handler that exposes the target element's value as a string. */
export function handleStringChange(handler: (value: string) => void) {
  return (event: React.FormEvent<HTMLElement>) =>
    handler((event.target as HTMLInputElement).value);
}

/** Event handler that exposes the target element's value as an inferred generic type. */
export function handleValueChange<T>(handler: (value: T) => void) {
  return (event: React.FormEvent<HTMLElement>) =>
    handler(((event.target as HTMLInputElement).value as unknown) as T);
}

/** Event handler that exposes the target element's value as a number. */
export function handleNumberChange(handler: (value: number) => void) {
  return handleStringChange((value) => handler(+value));
}

export const transformObj = (obj: any) => {
  return Object.keys(obj).reduce((acc: any, key) => {
    if (key.indexOf('.') >= 0) {
      const [parentKey, childKey] = key.split('.');
      acc[parentKey] = acc[parentKey] || {};
      acc[parentKey][childKey] = obj[key];
    } else {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};

/**
 * Transforms those long pesky IDs into something that's actually readable
 * @param s the ID to transform
 */
export const transformID = (s: string) =>
  s.substring(s.length - 10, s.length - 1);
