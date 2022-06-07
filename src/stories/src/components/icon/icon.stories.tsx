import { Meta, Story } from '@storybook/react';
import { IconRegistry } from '@tylertech/forge';
import { ForgeIcon } from '@tylertech/forge-react';
import { tylIconActionLauncher } from '@tylertech/tyler-icons/custom';
import { tylIconAccountCircleOutline } from '@tylertech/tyler-icons/extended';
import { tylIconFace } from '@tylertech/tyler-icons/standard';
import React, { useEffect } from 'react';

const MDX = require('./icon.mdx').default;

export default {
  title: 'Components/Icon',
  parameters: { 
    docs: { 
      page: MDX
    },
    controls: {
      disable: true
    }
  },
} as Meta;

export const Default: Story = () => <ForgeIcon src={tylIconFace.data} />;
export const External: Story = () => <ForgeIcon name="account_circle" external />;
export const Registry: Story = () => {
  useEffect(() => {
    IconRegistry.define([tylIconFace, tylIconAccountCircleOutline, tylIconActionLauncher ]);
  }, []);

  return (
    <>
      <ForgeIcon name="face" />
      <ForgeIcon name="account_circle_outline" />
      <ForgeIcon name="action_launcher" />
    </>
  );
};
export const Styles: Story = () => {
  const styles = {
    fontSize: '48px',
    color: 'var(--mdc-theme-primary)'
  }
  return <ForgeIcon src={tylIconFace.data} style={styles} />;
};
