import { Story } from "@storybook/react";
import { ForgeSkeleton } from "@tylertech/forge-react";
import React from "react";

export const ChipsTemplate: Story = () => (
  <div style={{ flex: 1 }}>
    <ForgeSkeleton chip></ForgeSkeleton>
    <ForgeSkeleton chip></ForgeSkeleton>
    <ForgeSkeleton chip></ForgeSkeleton>
  </div>
);
