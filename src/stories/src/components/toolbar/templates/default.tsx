import { Story } from "@storybook/react";
import { ForgeToolbar } from "@tylertech/forge-react";
import React from "react";
import { IToolbarProps } from "../toolbar-args";

export const DefaultTemplate: Story<IToolbarProps> = ({
  inverted = false,
  hasStart = true,
  hasCenter = true,
  hasEnd = true,
}) => {
  const Start = () => hasStart ? (<div slot="start">Start</div>) : null;
  const Center = () => hasCenter ? (<div slot="center">Center</div>) : null;
  const End = () => hasEnd ? (<div slot="end">End</div>) : null;
  const toolbarProps = {
    inverted,
  };
  return (
    <ForgeToolbar {...toolbarProps}>
      <Start/>
      <Center/>
      <End/>
    </ForgeToolbar>
  );
};
