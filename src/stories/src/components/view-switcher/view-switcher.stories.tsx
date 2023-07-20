import { Meta, Story } from '@storybook/react';
import { ForgeTab, ForgeTabBar, ForgeView, ForgeViewSwitcher } from '@tylertech/forge-react';
import React, { CSSProperties, useState } from "react";
import { IViewSwitcherProps, argTypes } from './view-switcher-args';
const MDX = require('./view-switcher.mdx').default;

export default {
  title: 'Components/View Switcher',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IViewSwitcherProps> = ({
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
        <ForgeTabBar underline activeTab={index} on-forge-tab-bar-change={(evt: CustomEvent<number>) => setIndex(evt.detail)}>
          <ForgeTab id="tab-1" aria-controls="tabpanel-1">View one</ForgeTab>
          <ForgeTab id="tab-2" aria-controls="tabpanel-2">View two</ForgeTab>
          <ForgeTab id="tab-3" aria-controls="tabpanel-3">View three</ForgeTab>
        </ForgeTabBar>

        <ForgeViewSwitcher {...viewSwitcherProps} index={index}>
          <ForgeView id="tabpanel-1" aria-labelledby="tab-1" role="tabpanel">
            <div style={viewStyles} className="forge-typography--body1">View one</div>
          </ForgeView>
          <ForgeView id="tabpanel-2" aria-labelledby="tab-2" role="tabpanel">
            <div style={viewStyles} className="forge-typography--body1">View two</div>
          </ForgeView>
          <ForgeView id="tabpanel-3" aria-labelledby="tab-3" role="tabpanel">
            <div style={viewStyles} className="forge-typography--body1">View three</div>
          </ForgeView>
        </ForgeViewSwitcher>
      </div>
    </div>
  );
};
Default.args = {
  animationType: 'slide'
} as IViewSwitcherProps;
