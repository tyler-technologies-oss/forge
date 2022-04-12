import React, { FC } from 'react';

export const LiveDemoStage: FC<{}> = ({ children }) => {
  return <div style={{ padding: '24px', backgroundColor: 'var(--mdc-theme-background)' }}>{children}</div>
};
