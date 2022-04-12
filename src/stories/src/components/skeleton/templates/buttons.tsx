import { Story } from "@storybook/react";
import { ForgeSkeleton } from "@tylertech/forge-react";
import React from "react";

export const ButtonsTemplate: Story = () => (
  <div style={{ flex: 1 }}>
    <ForgeSkeleton button></ForgeSkeleton>
  </div>
);
