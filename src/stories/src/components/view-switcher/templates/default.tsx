import { Story } from "@storybook/react";
import { ITabBarActivateEventData } from '@tylertech/forge';
import { ForgeDivider, ForgeTab, ForgeTabBar, ForgeView, ForgeViewSwitcher } from "@tylertech/forge-react";
import React, { CSSProperties, useState } from "react";
import { IViewSwitcherProps } from "../view-switcher-args";

export const DefaultTemplate: Story<IViewSwitcherProps> = ({
  animationType = 'slide'
}) => {
  const [index, setIndex] = useState<number>(0);
  const viewSwitcherProps = {
    animationType,
  };
  const viewStyles: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '250px',
    padding: '16px',
    marginTop: '16px',
    borderRadius: '4px',
    border: '1px dashed var(--mdc-theme-text-secondary-on-background)'
  };
  return (
    <div id="ViewSwitcher" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={{ width: '100%', height: '100%' }}>
        <ForgeTabBar underline activeTab={0} on-forge-tab-bar-activate={(evt: CustomEvent<ITabBarActivateEventData>) => setIndex(evt.detail.index)}>
          <ForgeTab>View one</ForgeTab>
          <ForgeTab>View two</ForgeTab>
          <ForgeTab>View three</ForgeTab>
        </ForgeTabBar>

        <ForgeViewSwitcher {...viewSwitcherProps} index={index}>
          <ForgeView role="tabpanel">
            <div style={viewStyles} className="forge-typography--body1">View one</div>
          </ForgeView>
          <ForgeView role="tabpanel">
            <div style={viewStyles} className="forge-typography--body1">View two</div>
          </ForgeView>
          <ForgeView role="tabpanel">
            <div style={viewStyles} className="forge-typography--body1">View three</div>
          </ForgeView>
        </ForgeViewSwitcher>
      </div>
    </div>
  );
};
