import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ForgeCard, ForgeDrawer, ForgeAppBar, ForgeScaffold, ForgeSkeleton } from '@tylertech/forge-react';
import { CSSProperties } from '@storybook/theming/dist/ts3.9/_modules/@emotion-react-node_modules-@emotion-serialize-types-index';
const MDX = require('./skeleton.mdx').default;

export default {
  title: 'Components/Skeleton',
  parameters: { 
    docs: { 
      page: MDX
    },
    controls: {
      disable: true
    }
  }
} as Meta;

export const Profile: Story = () => (
  <div style={{ width: 250 }}>
    <ForgeSkeleton avatar></ForgeSkeleton>
    <ForgeSkeleton text></ForgeSkeleton>
    <ForgeSkeleton text></ForgeSkeleton>
    <ForgeSkeleton text style={{ width: '75%' }}></ForgeSkeleton>
  </div>
);

export const List: Story = () => (
  <div style={{ flex: 1, width: '256px' }}>
    <ForgeSkeleton list-item></ForgeSkeleton>
    <ForgeSkeleton list-item></ForgeSkeleton>
    <ForgeSkeleton list-item></ForgeSkeleton>
  </div>
);

export const Chips: Story = () => (
  <div style={{ flex: 1 }}>
    <ForgeSkeleton chip></ForgeSkeleton>
    <ForgeSkeleton chip></ForgeSkeleton>
    <ForgeSkeleton chip></ForgeSkeleton>
  </div>
);

export const Buttons: Story = () => (
  <div style={{ flex: 1 }}>
    <ForgeSkeleton button></ForgeSkeleton>
  </div>
);

export const FormField: Story = () => (
  <div style={{ flex: 1 }}>
    <ForgeSkeleton form-field></ForgeSkeleton>
    <ForgeSkeleton form-field></ForgeSkeleton>
    <ForgeSkeleton form-field></ForgeSkeleton>
  </div>
);

export const App: Story = () => (
  <div style={{ flex: 1 }}>
    <div style={{ height: '750px' }}>
      <ForgeScaffold stretch>
        <ForgeAppBar slot="header" title-text="Skeleton" />
        <ForgeDrawer slot="body-left" style={{ paddingTop: '8px' }}>
          <div>
            <ForgeSkeleton list-item></ForgeSkeleton>
            <ForgeSkeleton list-item></ForgeSkeleton>
            <ForgeSkeleton list-item></ForgeSkeleton>
          </div>
        </ForgeDrawer>
        <div slot="body" style={{ padding: '16px', backgroundColor: 'var(--mdc-theme-background)', '--forge-card-padding': '16px' } as any}>
          <ForgeCard>
            <ForgeSkeleton avatar></ForgeSkeleton>
            <ForgeSkeleton text></ForgeSkeleton>
            <ForgeSkeleton text></ForgeSkeleton>
            <ForgeSkeleton text style={{ width: '75%' }}></ForgeSkeleton>
          </ForgeCard>
          <ForgeCard>
            <ForgeSkeleton text></ForgeSkeleton>
            <ForgeSkeleton text></ForgeSkeleton>
            <ForgeSkeleton text style={{ width: '75%' }}></ForgeSkeleton>
          </ForgeCard>
          <ForgeCard>
            <ForgeSkeleton text></ForgeSkeleton>
            <ForgeSkeleton text></ForgeSkeleton>
            <ForgeSkeleton text style={{ width: '75%' }}></ForgeSkeleton>
          </ForgeCard>
        </div>
      </ForgeScaffold>
    </div>
  </div>
);
