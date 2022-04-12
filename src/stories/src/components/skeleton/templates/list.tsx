import { Story } from "@storybook/react";
import { ForgeSkeleton } from "@tylertech/forge-react";
import React from "react";

export const ListTemplate: Story = () => (
  <div style={{ flex: 1, width: '256px' }}>
    <ForgeSkeleton list-item></ForgeSkeleton>
    <ForgeSkeleton list-item></ForgeSkeleton>
    <ForgeSkeleton list-item></ForgeSkeleton>
  </div>
);
