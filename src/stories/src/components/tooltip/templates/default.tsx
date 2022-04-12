import { Story } from "@storybook/react";
import { ForgeButton, ForgeTooltip } from "@tylertech/forge-react";
import React from "react";
import { ITooltipProps } from "../tooltip-args";

export const DefaultTemplate: Story<ITooltipProps> = ({
  text = 'Some useful tooltip text',
  delay = 500,
  position = 'right',
}) => {
  const tooltipProps = {
    text,
    delay,
    position,
  };
  return (
    <ForgeButton type="raised">
      <button>Hover me</button>
      <ForgeTooltip {...tooltipProps}></ForgeTooltip>
    </ForgeButton>
  );
}
