import { Story } from "@storybook/react";
import { ForgeStep, ForgeStepper } from "@tylertech/forge-react";
import React from "react";
import { IStepperProps } from "../stepper-args";

export const DefaultTemplate: Story<IStepperProps> = ({
  linear = false,
  alternative = false,
  layoutMode = 'fixed',
  layoutAlign = 'center',
  disabled = false,
  vertical = false,
  editable = false,
  completed = false,
  error = false,
}) => {
  const stepperProps = {
    linear,
    alternative,
    layoutMode,
    layoutAlign,
    disabled,
    vertical,
  };
  const stepProps = {
    editable,
    completed,
    error,
  };
  return (
    <ForgeStepper {...stepperProps} style={{ flex: 1 }}>
      <ForgeStep {...stepProps}>Step One</ForgeStep>
      <ForgeStep {...stepProps}>
        Step Two<span slot="optional">Optional</span>
      </ForgeStep>
      <ForgeStep {...stepProps}>Step Three</ForgeStep>
      <ForgeStep {...stepProps}>Step Four</ForgeStep>
      <ForgeStep {...stepProps}>Done</ForgeStep>
    </ForgeStepper>
  );
};
