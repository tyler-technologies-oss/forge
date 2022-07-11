import { Code } from '@tylertech/forge-docs-core';
import React, { FC } from 'react';

interface ILibraryVersionProps {
  packageJson: {
    name: string;
    version: string;
  };
}

const LibraryVersion: FC<ILibraryVersionProps> = ({ packageJson }) => (
  <>
    Current version: <code className="forge-docs-core__inline-code">{`${packageJson.name}@${packageJson.version}`}</code>
  </>
);

export default LibraryVersion;
