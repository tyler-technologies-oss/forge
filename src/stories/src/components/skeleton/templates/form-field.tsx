import { Story } from "@storybook/react";
import { ForgeSkeleton } from "@tylertech/forge-react";
import React from "react";

export const FormFieldTemplate: Story = () => (
  <div style={{ flex: 1 }}>
    <ForgeSkeleton form-field></ForgeSkeleton>
    <ForgeSkeleton form-field></ForgeSkeleton>
    <ForgeSkeleton form-field></ForgeSkeleton>
  </div>
);
