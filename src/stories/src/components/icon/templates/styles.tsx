import React from 'react';
import { ForgeIcon } from '@tylertech/forge-react';
import { tylIconFace } from '@tylertech/tyler-icons/standard';
import { Story } from '@storybook/react';

export const StylesTemplate: Story = () => {
  const styles = {
    fontSize: '48px',
    color: 'var(--mdc-theme-primary)'
  }
  return <ForgeIcon src={tylIconFace.data} style={styles}></ForgeIcon>;
};
