import { Story } from '@storybook/react';
import { ForgeDrawer, ForgeList, ForgeListItem } from '@tylertech/forge-react';
import React from 'react';

export const DrawerTemplate: Story = () => (
  <ForgeDrawer>
    <ForgeList>
      <ForgeListItem>List Item One</ForgeListItem>
      <ForgeListItem selected>List Item Two</ForgeListItem>
      <ForgeListItem>List Item Three</ForgeListItem>
    </ForgeList>
  </ForgeDrawer>
);