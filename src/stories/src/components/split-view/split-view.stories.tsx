import { Meta, Story } from '@storybook/react';
import { createElementProxy } from '@tylertech/forge-react';
import React from 'react';
import { ISplitViewProps, argTypes } from './split-view-args';
const MDX = require('./split-view.mdx').default;

const ForgeSplitView = createElementProxy('forge-split-view');
const ForgeSplitViewPanel = createElementProxy('forge-split-view-panel');

const panelContentStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%'
}

export default {
  title: 'Components/Split View',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
    actions: {
      handles: [
        'forge-split-view-panel-will-resize',
        'forge-split-view-panel-resize',
        'forge-split-view-panel-resize-start',
        'forge-split-view-panel-resize-end',
        'forge-split-view-panel-will-open',
        'forge-split-view-panel-will-close',
        'forge-split-view-panel-did-open',
        'forge-split-view-panel-did-close'
      ]
    },
    layout: 'fullscreen'
  },
} as Meta;

export const Default: Story<ISplitViewProps> = ({
  autoClose = false,
  autoCloseThreshold = 0,
  allowClose = false,
  disabled = false,
  orientation = 'horizontal',
  autoClose1 = undefined,
  autoCloseThreshold1 = undefined,
  allowClose1 = undefined,
  disabled1 = undefined,
  accessibleLabel1 = 'Split view panel 1',
  max1 = undefined,
  min1 = 0,
  open1 = true,
  size1 = 200,
  autoClose2 = undefined,
  autoCloseThreshold2 = undefined,
  allowClose2 = undefined,
  disabled2 = undefined,
  accessibleLabel2 = 'Split view panel 2',
  max2 = undefined,
  min2 = 0,
  open2 = true,
  size2 = 200,
}) => {
  const splitViewProps = {
    autoClose,
    autoCloseThreshold,
    allowClose,
    disabled,
    orientation
  };
  const panel1Props = {
    autoClose: autoClose1,
    autoCloseThreshold: autoCloseThreshold1,
    allowClose: allowClose1,
    disabled: disabled1,
    accessibleLabel: accessibleLabel1,
    max: max1,
    min: min1,
    open: open1,
    size: size1
  };
  const panel2Props = {
    autoClose: autoClose2,
    autoCloseThreshold: autoCloseThreshold2,
    allowClose: allowClose2,
    disabled: disabled2,
    accessibleLabel: accessibleLabel2,
    max: max2,
    min: min2,
    open: open2,
    size: size2
  };
  
  return (
    <ForgeSplitView style={{ height: '400px'}} {...splitViewProps}>
      <ForgeSplitViewPanel {...panel1Props}>
        <div style={{...panelContentStyles, backgroundColor: 'lavender'}}>Panel 1</div>
      </ForgeSplitViewPanel>
      <ForgeSplitViewPanel {...panel2Props}>
        <div style={{...panelContentStyles, backgroundColor: 'salmon'}}>Panel 2</div>
      </ForgeSplitViewPanel>
    </ForgeSplitView>
  );
};
Default.parameters = { controls: { exclude: /3/ } };

export const LeadingPanel: Story<ISplitViewProps> = ({
  autoClose = false,
  autoCloseThreshold = 0,
  allowClose = false,
  disabled = false,
  orientation = 'horizontal',
  autoClose1 = undefined,
  autoCloseThreshold1 = undefined,
  allowClose1 = undefined,
  disabled1 = undefined,
  accessibleLabel1 = 'Split view panel 1',
  max1 = undefined,
  min1 = 0,
  open1 = true,
  size1 = 200,
  autoClose2 = undefined,
  autoCloseThreshold2 = undefined,
  allowClose2 = undefined,
  disabled2 = undefined,
  accessibleLabel2 = 'Split view panel 2',
  max2 = undefined,
  min2 = 0,
  open2 = true,
  size2 = 200,
}) => {
  const splitViewProps = {
    autoClose,
    autoCloseThreshold,
    allowClose,
    disabled,
    orientation
  };
  const panel1Props = {
    autoClose: autoClose1,
    autoCloseThreshold: autoCloseThreshold1,
    allowClose: allowClose1,
    disabled: disabled1,
    accessibleLabel: accessibleLabel1,
    max: max1,
    min: min1,
    open: open1,
    size: size1
  };
  const panel2Props = {
    autoClose: autoClose2,
    autoCloseThreshold: autoCloseThreshold2,
    allowClose: allowClose2,
    disabled: disabled2,
    accessibleLabel: accessibleLabel2,
    max: max2,
    min: min2,
    open: open2,
    size: size2
  };
  
  return (
    <ForgeSplitView style={{ height: '400px'}} {...splitViewProps}>
      <ForgeSplitViewPanel resizable="end" {...panel1Props}>
        <div style={{...panelContentStyles, backgroundColor: 'salmon'}}>Panel 1</div>
      </ForgeSplitViewPanel>
      <ForgeSplitViewPanel {...panel2Props}>
        <div style={{...panelContentStyles, backgroundColor: 'lavender'}}>Panel 2</div>
      </ForgeSplitViewPanel>
    </ForgeSplitView>
  );
};
LeadingPanel.parameters = { controls: { exclude: /3/ } };

export const MultiplePanelsSplit: Story<ISplitViewProps> = ({
  autoClose = false,
  autoCloseThreshold = 0,
  allowClose = false,
  disabled = false,
  orientation = 'horizontal',
  autoClose1 = undefined,
  autoCloseThreshold1 = undefined,
  allowClose1 = undefined,
  disabled1 = undefined,
  accessibleLabel1 = 'Split view panel 1',
  max1 = undefined,
  min1 = 0,
  open1 = true,
  size1 = 200,
  autoClose2 = undefined,
  autoCloseThreshold2 = undefined,
  allowClose2 = undefined,
  disabled2 = undefined,
  accessibleLabel2 = 'Split view panel 2',
  max2 = undefined,
  min2 = 0,
  open2 = true,
  size2 = 200,
  autoClose3 = undefined,
  autoCloseThreshold3 = undefined,
  allowClose3 = undefined,
  disabled3 = undefined,
  accessibleLabel3 = 'Split view panel 3',
  max3 = undefined,
  min3 = 0,
  open3 = true,
  size3 = 200,
}) => {
  const splitViewProps = {
    autoClose,
    autoCloseThreshold,
    allowClose,
    disabled,
    orientation
  };
  const panel1Props = {
    autoClose: autoClose1,
    autoCloseThreshold: autoCloseThreshold1,
    allowClose: allowClose1,
    disabled: disabled1,
    accessibleLabel: accessibleLabel1,
    max: max1,
    min: min1,
    open: open1,
    size: size1
  };
  const panel2Props = {
    autoClose: autoClose2,
    autoCloseThreshold: autoCloseThreshold2,
    allowClose: allowClose2,
    disabled: disabled2,
    accessibleLabel: accessibleLabel2,
    max: max2,
    min: min2,
    open: open2,
    size: size2
  };
  const panel3Props = {
    autoClose: autoClose3,
    autoCloseThreshold: autoCloseThreshold3,
    allowClose: allowClose3,
    disabled: disabled3,
    accessibleLabel: accessibleLabel3,
    max: max3,
    min: min3,
    open: open3,
    size: size3
  };
  
  return (
    <ForgeSplitView style={{ height: '400px'}} {...splitViewProps}>
      <ForgeSplitViewPanel resizable="end" {...panel1Props}>
        <div style={{...panelContentStyles, backgroundColor: 'salmon'}}>Panel 1</div>
      </ForgeSplitViewPanel>
      <ForgeSplitViewPanel {...panel2Props}>
        <div style={{...panelContentStyles, backgroundColor: 'lavender'}}>Panel 2</div>
      </ForgeSplitViewPanel>
      <ForgeSplitViewPanel resizable="start" {...panel3Props}>
        <div style={{...panelContentStyles, backgroundColor: 'salmon'}}>Panel 3</div>
      </ForgeSplitViewPanel>
    </ForgeSplitView>
  );
};

export const MultiplePanelsStacked: Story<ISplitViewProps> = ({
  autoClose = false,
  autoCloseThreshold = 0,
  allowClose = false,
  disabled = false,
  orientation = 'horizontal',
  autoClose1 = undefined,
  autoCloseThreshold1 = undefined,
  allowClose1 = undefined,
  disabled1 = undefined,
  accessibleLabel1 = 'Split view panel 1',
  max1 = undefined,
  min1 = 0,
  open1 = true,
  size1 = 200,
  autoClose2 = undefined,
  autoCloseThreshold2 = undefined,
  allowClose2 = undefined,
  disabled2 = undefined,
  accessibleLabel2 = 'Split view panel 2',
  max2 = undefined,
  min2 = 0,
  open2 = true,
  size2 = 200,
  autoClose3 = undefined,
  autoCloseThreshold3 = undefined,
  allowClose3 = undefined,
  disabled3 = undefined,
  accessibleLabel3 = 'Split view panel 3',
  max3 = undefined,
  min3 = 0,
  open3 = true,
  size3 = 200,
}) => {
  const splitViewProps = {
    autoClose,
    autoCloseThreshold,
    allowClose,
    disabled,
    orientation
  };
  const panel1Props = {
    autoClose: autoClose1,
    autoCloseThreshold: autoCloseThreshold1,
    allowClose: allowClose1,
    disabled: disabled1,
    accessibleLabel: accessibleLabel1,
    max: max1,
    min: min1,
    open: open1,
    size: size1
  };
  const panel2Props = {
    autoClose: autoClose2,
    autoCloseThreshold: autoCloseThreshold2,
    allowClose: allowClose2,
    disabled: disabled2,
    accessibleLabel: accessibleLabel2,
    max: max2,
    min: min2,
    open: open2,
    size: size2
  };
  const panel3Props = {
    autoClose: autoClose3,
    autoCloseThreshold: autoCloseThreshold3,
    allowClose: allowClose3,
    disabled: disabled3,
    accessibleLabel: accessibleLabel3,
    max: max3,
    min: min3,
    open: open3,
    size: size3
  };
  
  return (
    <ForgeSplitView style={{ height: '400px'}} {...splitViewProps}>
      <ForgeSplitViewPanel {...panel1Props}>
        <div style={{...panelContentStyles, backgroundColor: 'lavender'}}>Panel 1</div>
      </ForgeSplitViewPanel>
      <ForgeSplitViewPanel resizable="start" {...panel2Props}>
        <div style={{...panelContentStyles, backgroundColor: 'salmon'}}>Panel 2</div>
      </ForgeSplitViewPanel>
      <ForgeSplitViewPanel resizable="start" {...panel3Props}>
        <div style={{...panelContentStyles, backgroundColor: 'salmon'}}>Panel 3</div>
      </ForgeSplitViewPanel>
    </ForgeSplitView>
  );
};
