import React, { CSSProperties, useState } from "react";
import { Story } from "@storybook/react";
import { IDrawerProps } from "../drawer-args";
import { ForgeDivider, ForgeDrawer, ForgeList, ForgeListItem, ForgeToolbar } from "@tylertech/forge-react";

export const NavigationDrawerTemplate: Story<IDrawerProps> = props => {
  const [pageLabel, setPageLabel] = useState<string>('Profile');
  const containerStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  };
  const viewStyles: CSSProperties = {
    display: 'flex',
    flex: '1 1 0.0001px',
    flexDirection: 'column',
  };
  return (
    <div style={containerStyles}>
      <ForgeDrawer {...props}>
        <ForgeList>
          <ForgeListItem on-forge-list-item-select={evt => setPageLabel('Home')}>
            <i className="tyler-icons" slot="leading">home</i>
            Home
          </ForgeListItem>
          <ForgeListItem on-forge-list-item-select={evt => setPageLabel('Profile')}>
            <i className="tyler-icons" slot="leading">person</i>
            Profile
          </ForgeListItem>
          <ForgeDivider/>
          <h2 className={'forge-list-group__subheader'}>Employee information</h2>
          <ForgeListItem on-forge-list-item-select={evt => setPageLabel('Time off')}>
            <i className="tyler-icons" slot="leading">local_airport</i>
            Time off
          </ForgeListItem>
          <ForgeListItem on-forge-list-item-select={evt => setPageLabel('Pay & tax')}>
            <i className="tyler-icons" slot="leading">cash_usd</i>
            Pay & tax
          </ForgeListItem>
          <ForgeListItem on-forge-list-item-select={evt => setPageLabel('Tasks & documents')}>
            <i className="tyler-icons" slot="leading">assignment_turned_in</i>
            Tasks & documents
          </ForgeListItem>
          <ForgeListItem on-forge-list-item-select={evt => setPageLabel('Time entry')}>
            <i className="tyler-icons" slot="leading">calendar_clock</i>
            Time entry
          </ForgeListItem>
          <ForgeListItem on-forge-list-item-select={evt => setPageLabel('Benefits')}>
            <i className="tyler-icons" slot="leading">chart_bar</i>
            Benefits
          </ForgeListItem>
        </ForgeList>
      </ForgeDrawer>
      <div style={viewStyles}>
        <ForgeToolbar>
          <div slot="start">{pageLabel}</div>
        </ForgeToolbar>
      </div>
    </div>
  );
};
