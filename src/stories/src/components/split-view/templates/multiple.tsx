import { Story } from "@storybook/react";
import { createElementProxy } from "@tylertech/forge-react";
import React from "react";
import { ISplitViewProps } from "../split-view-args";

export const MultipleTemplate: Story<ISplitViewProps> = ({
  orientation = 'horizontal'
}) => {
  const splitViewProps = {
    orientation
  };
  const ForgeSplitView = createElementProxy('forge-split-view');
  const ForgeSplitViewPane = createElementProxy('forge-split-view-pane');
  return (
    <ForgeSplitView style={{ height: '400px' }} {...splitViewProps}>
      <ForgeSplitViewPane direction="start">
        <div style={{ height: '100%', width: '100%', backgroundColor: 'darkseagreen' }}></div>
      </ForgeSplitViewPane>
      <ForgeSplitViewPane>
        <div style={{ height: '100%', width: '100%', backgroundColor: 'lightskyblue' }}></div>
      </ForgeSplitViewPane>
      <ForgeSplitViewPane direction="end">
        <div style={{ height: '100%', width: '100%', backgroundColor: 'salmon' }}></div>
      </ForgeSplitViewPane>
    </ForgeSplitView>);
}