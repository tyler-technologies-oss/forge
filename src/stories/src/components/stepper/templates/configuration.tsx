import { Story } from "@storybook/react";
import { ForgeStepper } from "@tylertech/forge-react";
import React, { useState } from "react";
import { ILimitedStepperProps } from "../stepper-args";

export const ConfigurationTemplate: Story<ILimitedStepperProps> = ({
  linear = false,
  alternative = true,
  layoutMode = 'fixed',
  layoutAlign = 'center',
  disabled = false,
  vertical = false,
}) => {
  const [index, setIndex] = useState<number>(2);
  const stepperProps = {
    linear,
    alternative,
    layoutMode,
    layoutAlign,
    disabled,
    vertical,
    steps: [
      { label: 'Step one', completed: true },
      { label: 'Step two', optionalLabel: 'Optional', completed: true, editable: true },
      { label: 'Step three' },
      { label: 'Step four' },
      { label: 'Done' }
    ],
  };
  return <ForgeStepper 
    {...stepperProps} 
    selectedIndex={index}
    on-forge-stepper-select={(evt: CustomEvent) => setIndex(evt.detail)}
    style={{ flex: 1 }}></ForgeStepper>;
};