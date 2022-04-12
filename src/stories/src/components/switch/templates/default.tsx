import { Story } from "@storybook/react";
import { ForgeSwitch } from "@tylertech/forge-react";
import React from "react";
import { ISwitchProps } from "../switch-args";

export const DefaultTemplate: Story<ISwitchProps> = ({
  dense = false,
  hasLabel = true
}) => {
  const ariaLabel = !hasLabel ? 'Toggle on or off' : undefined;
  return (
    <ForgeSwitch {...{ dense, 'button-aria-label': ariaLabel }}>
      {hasLabel && <span>off/on</span>}
    </ForgeSwitch>
  );
};
