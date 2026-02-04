import { readFileSync } from 'fs';
import { glob } from 'glob';
import * as sass from 'sass';

export const LICENSE_HEADER = `/**
 * @license
 * Copyright Tyler Technologies, Inc.
 * License: Apache-2.0
 */
`;

export function getPackageJson() {
  return JSON.parse(readFileSync('package.json', 'utf-8'));
}

export function getCdnOutdir() {
  const { version } = getPackageJson();
  return `cdn/v1/libs/@tylertech/forge@${version}`;
}

export function getExternalDeps() {
  return Object.keys(getPackageJson().dependencies || {});
}

export async function getComponentEntryPoints() {
  return glob('src/lib/**/index.ts');
}

export const htmlLoaderPlugin = {
  name: 'html-loader',
  setup(build) {
    build.onLoad({ filter: /\.html$/ }, async args => {
      const contents = readFileSync(args.path, 'utf-8');
      return {
        contents: `export default ${JSON.stringify(contents)};`,
        loader: 'js'
      };
    });
  }
};

export const scssLoaderPlugin = {
  name: 'scss-loader',
  setup(build) {
    build.onLoad({ filter: /\.scss$/ }, async args => {
      const result = sass.compile(args.path, { style: 'compressed' });
      return {
        contents: `export default ${JSON.stringify(result.css)};`,
        loader: 'js'
      };
    });
  }
};
