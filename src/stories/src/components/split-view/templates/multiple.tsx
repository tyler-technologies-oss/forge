import { Story } from "@storybook/react";
import { createElementProxy } from "@tylertech/forge-react";
import React from "react";
import { ISplitViewProps } from "../split-view-args";

export const MultipleTemplate: Story<ISplitViewProps> = ({
  orientation = 'horizontal',
  disabled = false
}) => {
  const splitViewProps = {
    orientation,
    disabled
  };
  const ForgeSplitView = createElementProxy('forge-split-view');
  const ForgeSplitViewPanel = createElementProxy('forge-split-view-panel');
  return (
    <ForgeSplitView style={{ height: '400px' }} orientation={splitViewProps.orientation} disabled={splitViewProps.disabled}>
      <ForgeSplitViewPanel>
        <div style={{ height: '100%', width: '100%', backgroundColor: 'lightskyblue' }}></div>
      </ForgeSplitViewPanel>
      <ForgeSplitViewPanel>
        <div style={{ height: '100%', width: '100%', backgroundColor: 'darkseagreen' }}></div>
      </ForgeSplitViewPanel>
      <ForgeSplitViewPanel>
        <div style={{ height: '100%', width: '100%', backgroundColor: 'salmon' }}></div>
      </ForgeSplitViewPanel>
    </ForgeSplitView>);
}