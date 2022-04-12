import React, { useState } from "react";
import { Story } from "@storybook/react";
import { IMiniDrawerProps } from "../drawer-args";
import { ForgeMiniDrawer, ForgeList, ForgeListItem, ForgeTooltip, ForgeButton, ForgeScaffold } from "@tylertech/forge-react";

export const MiniTemplate: Story<IMiniDrawerProps> = ({
  direction = 'left',
  hover = false,
}) => {
  const scaffoldStyles = {
    '--forge-scaffold-height': '500px',
    '--forge-scaffold-width': '100%',
    borderBottom: '1px solid var(--forge-theme-border-color)',
    backgroundColor: 'var(--mdc-theme-background)'
  };

  return (
    <ForgeScaffold style={scaffoldStyles}>
      <ForgeMiniDrawer slot={direction} {...{ direction, hover }}>
        <ForgeList>
          <ForgeListItem id="tooltip-host-1">
            <i className="tyler-icons" slot="leading">inbox</i>
            Inbox
          </ForgeListItem>
          <ForgeListItem id="tooltip-host-2">
            <i className="tyler-icons" slot="leading">send</i>
            Outgoing
          </ForgeListItem>
          <ForgeListItem id="tooltip-host-3">
            <i className="tyler-icons" slot="leading">drafts</i>
            Drafts
          </ForgeListItem>
          {!hover && <ForgeTooltip target="#tooltip-host-1">Inbox</ForgeTooltip>}
          {!hover && <ForgeTooltip target="#tooltip-host-2">Sent</ForgeTooltip>}
          {!hover && <ForgeTooltip target="#tooltip-host-3">Drafts</ForgeTooltip>}
        </ForgeList>
      </ForgeMiniDrawer>
    </ForgeScaffold>
  );
};
