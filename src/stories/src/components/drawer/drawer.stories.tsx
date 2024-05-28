import React, { useEffect, CSSProperties } from 'react';
import { Meta, Story } from '@storybook/react';
import { IconRegistry } from '@tylertech/forge';
import { ForgeButton, ForgeCard, ForgeDrawer, ForgeIcon, ForgeList, ForgeListItem, ForgeMiniDrawer, ForgeModalDrawer, ForgeScaffold, ForgeTooltip } from '@tylertech/forge-react';
import { tylIconDrafts, tylIconInbox, tylIconSend } from '@tylertech/tyler-icons/standard';
import { drawerArgTypes, IDrawerProps, IMiniDrawerProps, miniDrawerArgTypes } from './drawer-args';

const MDX = require('./drawer.mdx').default;

export default {
  title: 'Components/Drawer',
  parameters: { 
    docs: { 
      page: MDX
    },
    layout: 'fullscreen'
  },  
} as Meta;

export const Drawer: Story<IDrawerProps> = ({
  open = true,
  direction = 'left'
}) => {
  const scaffoldStyles = {
    '--forge-scaffold-height': '500px',
    '--forge-scaffold-width': '100%',
    borderBottom: '1px solid var(--forge-theme-outline)'
  };

  return (
    <ForgeScaffold style={scaffoldStyles}>
      <ForgeDrawer slot={direction} open={open} direction={direction}>
        <ForgeList>
          <ForgeListItem>Home</ForgeListItem>
          <ForgeListItem>Details</ForgeListItem>
          <ForgeListItem>Settings</ForgeListItem>
        </ForgeList>
      </ForgeDrawer>
      <div slot="body">
        <ForgeCard style={{margin: '16px', '--forge-card-padding': '16px'}}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda, dolorum omnis. Sint ullam ut eaque est perspiciatis adipisci voluptate minima dignissimos, excepturi similique nam amet iure quaerat, eveniet odit laudantium.
        </ForgeCard>
      </div>
    </ForgeScaffold>
  );
};
Drawer.argTypes = drawerArgTypes;
Drawer.args = {
  open: true,
  direction: 'left'
} as IDrawerProps;

export const Modal: Story<IDrawerProps> = ({
  open = false,
  direction = 'left'
}) => {
  const scaffoldStyles = {
    '--forge-scaffold-height': '500px',
    '--forge-scaffold-width': '100%',
    borderBottom: '1px solid var(--forge-theme-outline)'
  };

  return (
    <ForgeScaffold style={scaffoldStyles}>
      <ForgeModalDrawer slot={direction} open={open} direction={direction} on-forge-modal-drawer-close={() => open = false}>
        <ForgeList>
          <ForgeListItem>Home</ForgeListItem>
          <ForgeListItem>Details</ForgeListItem>
          <ForgeListItem>Settings</ForgeListItem>
        </ForgeList>
      </ForgeModalDrawer>
      <div slot="body">
        <ForgeCard style={{margin: '16px', '--forge-card-padding': '16px'}}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda, dolorum omnis. Sint ullam ut eaque est perspiciatis adipisci voluptate minima dignissimos, excepturi similique nam amet iure quaerat, eveniet odit laudantium.
        </ForgeCard>
      </div>
    </ForgeScaffold>
  );
};
Modal.argTypes = drawerArgTypes;
Modal.args = {
  open: false,
  direction: 'left'
} as IDrawerProps;

export const Mini: Story<IMiniDrawerProps> = ({
  direction = 'left',
  hover = false
}) => {
  useEffect(() => {
    IconRegistry.define([tylIconInbox, tylIconSend, tylIconDrafts]);
  }, []);

  const tooltipPosition = direction === 'left' ? 'right' : 'left';
  const scaffoldStyles = {
    '--forge-scaffold-height': '500px',
    '--forge-scaffold-width': '100%',
    borderBottom: '1px solid var(--forge-theme-outline)',
    backgroundColor: 'var(--mdc-theme-background)'
  };

  return (
    <ForgeScaffold style={scaffoldStyles}>
      <ForgeMiniDrawer slot={direction} direction={direction} hover={hover}>
        <ForgeList>
          <ForgeListItem id="tooltip-host-1">
            <ForgeIcon slot="leading" name="inbox" />
            Inbox
          </ForgeListItem>
          <ForgeListItem id="tooltip-host-2">
            <ForgeIcon slot="leading" name="send" />
            Outgoing
          </ForgeListItem>
          <ForgeListItem id="tooltip-host-3">
            <ForgeIcon slot="leading" name="drafts" />
            Drafts
          </ForgeListItem>
          {!hover && <ForgeTooltip target="#tooltip-host-1" position={tooltipPosition}>Inbox</ForgeTooltip>}
          {!hover && <ForgeTooltip target="#tooltip-host-2" position={tooltipPosition}>Sent</ForgeTooltip>}
          {!hover && <ForgeTooltip target="#tooltip-host-3" position={tooltipPosition}>Drafts</ForgeTooltip>}
        </ForgeList>
      </ForgeMiniDrawer>
      <div slot="body">
        <ForgeCard style={{margin: '16px', '--forge-card-padding': '16px'}}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda, dolorum omnis. Sint ullam ut eaque est perspiciatis adipisci voluptate minima dignissimos, excepturi similique nam amet iure quaerat, eveniet odit laudantium.
        </ForgeCard>
      </div>
    </ForgeScaffold>
  );
};
Mini.argTypes = miniDrawerArgTypes;
Mini.args = {
  direction: 'left',
  hover: false
} as IMiniDrawerProps;
