import React, { useEffect } from 'react';
import { ForgeIcon } from '@tylertech/forge-react';
import { tylIconFace } from '@tylertech/tyler-icons/standard';
import { tylIconAccountCircleOutline } from '@tylertech/tyler-icons/extended';
import { tylIconActionLauncher } from '@tylertech/tyler-icons/custom';
import { Story } from '@storybook/react';
import { IconRegistry } from '@tylertech/forge';

// The IconRegistry doesn't support SSR so we have to load the SVG data manually (same effect in the end)
export const RegistryTemplate: Story = () => {
  useEffect(() => {
    IconRegistry.define([
      tylIconFace,
      tylIconAccountCircleOutline,
      tylIconActionLauncher
    ]);
  }, []);

  return (
    <>
      <ForgeIcon name="face" />
      <ForgeIcon name="account_circle_outline" />
      <ForgeIcon name="action_launcher" />
    </>
  );
};
