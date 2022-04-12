import { Story } from "@storybook/react";
import { ForgeCard, ForgeDrawer, ForgeAppBar, ForgeScaffold, ForgeSkeleton } from "@tylertech/forge-react";
import React from "react";

export const AppTemplate: Story = () => (
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
        <div slot="body" style={{ padding: '16px', backgroundColor: 'var(--mdc-theme-background)' }}>
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
  