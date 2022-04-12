import { Story } from "@storybook/react";
import { ForgeButton, ForgeDrawer, ForgeList, ForgeListItem, ForgeScaffold } from "@tylertech/forge-react";
import React, { CSSProperties, useState } from "react";
import { IDrawerProps } from "../drawer-args";

export const DrawerTemplate: Story<IDrawerProps> = ({
  open = true,
  direction = 'left'
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const scaffoldStyles = {
    '--forge-scaffold-height': '500px',
    '--forge-scaffold-width': '100%',
    borderBottom: '1px solid var(--forge-theme-border-color)'
  };
  const viewStyles: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'var(--mdc-theme-background)'
  };

  return (
    <ForgeScaffold style={scaffoldStyles}>
      <ForgeDrawer slot={direction} open={isOpen} direction={direction}>
        <ForgeList>
          <ForgeListItem>Home</ForgeListItem>
          <ForgeListItem>Details</ForgeListItem>
          <ForgeListItem>Settings</ForgeListItem>
        </ForgeList>
      </ForgeDrawer>

      <div style={viewStyles} slot="body">
        <ForgeButton type="raised">
          <button type="button" onClick={() => setIsOpen(!isOpen)}>Toggle drawer</button>
        </ForgeButton>
      </div>
    </ForgeScaffold>
  );
};
