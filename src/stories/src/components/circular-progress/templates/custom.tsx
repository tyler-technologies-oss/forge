import { Story } from "@storybook/react";
import { ForgeCircularProgress } from "@tylertech/forge-react";
import React from "react";
import { ICircularProgressProps } from "../circular-progress-args";

export const CustomTemplate: Story<ICircularProgressProps> = ({
  open = true,
  determinate = false,
  progress = 0
}) => {
  return (
    <ForgeCircularProgress
      {...{ open, determinate, progress }}
      style={{
        '--forge-theme-tertiary': 'var(--forge-theme-success)',
        '--forge-circular-progress-track-color': determinate ? 'var(--mdc-theme-text-disabled-on-background)' : null,
        '--forge-circular-progress-size': '150px',
        '--forge-circular-progress-stroke-width': '1px',
      }} />
  )
}
