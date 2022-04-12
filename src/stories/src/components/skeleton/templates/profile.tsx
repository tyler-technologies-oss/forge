import { Story } from "@storybook/react";
import { ForgeSkeleton } from "@tylertech/forge-react";
import React from "react";

export const ProfileTemplate: Story = () => (
  <div style={{ width: 250 }}>
    <ForgeSkeleton avatar></ForgeSkeleton>
    <ForgeSkeleton text></ForgeSkeleton>
    <ForgeSkeleton text></ForgeSkeleton>
    <ForgeSkeleton text style={{ width: '75%' }}></ForgeSkeleton>
  </div>
);
