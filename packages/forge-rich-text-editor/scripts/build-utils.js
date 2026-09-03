import { readFileSync } from 'fs';

export const LICENSE_HEADER = `/**
 * @license
 * Copyright Tyler Technologies, Inc.
 * License: Apache-2.0
 */
`;

export function getPackageJson() {
  return JSON.parse(readFileSync('package.json', 'utf-8'));
}

export function getExternalDeps() {
  const { dependencies, peerDependencies } = getPackageJson();
  return [...Object.keys(dependencies ?? {}), ...Object.keys(peerDependencies ?? {})];
}
