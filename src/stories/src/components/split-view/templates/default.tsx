import { Story } from "@storybook/react";
import { createElementProxy } from "@tylertech/forge-react";
import React from "react";
import { ISplitViewProps } from "../split-view-args";

export const DefaultTemplate: Story<ISplitViewProps> = ({
  position = 'end',
  disabled = false,
  label = 'Split view pane',
  max = undefined,
  min = 0,
  open = true,
  orientation = 'horizontal',
  size = 200
}) => {
  const splitViewProps = {
    position,
    disabled,
    label,
    max,
    min,
    open,
    orientation,
    size
  };
  const ForgeSplitView = createElementProxy('forge-split-view');
  const ForgeSplitViewPanel = createElementProxy('forge-split-view-panel');
  return (
    <ForgeSplitView style={{ height: '400px' }} orientation={splitViewProps.orientation} disabled={splitViewProps.disabled}>
      <ForgeSplitViewPanel>
        <div style={{ height: '100%', width: '100%', backgroundColor: 'lightskyblue' }}></div>
      </ForgeSplitViewPanel>
      <ForgeSplitViewPanel position={splitViewProps.position} open={splitViewProps.open} size={splitViewProps.size} min={splitViewProps.min} max={splitViewProps.max} label={splitViewProps.label}>
        <div style={{ height: '100%', width: '100%', backgroundColor: 'salmon' }}></div>
      </ForgeSplitViewPanel>
    </ForgeSplitView>);
}