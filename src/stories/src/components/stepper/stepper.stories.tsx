import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { argTypes, ILimitedStepperProps, IStepperProps, limitedArgTypes } from './stepper-args';
import { ForgeStep, ForgeStepper } from '@tylertech/forge-react';

const MDX = require('./stepper.mdx').default;

export default {
  title: 'Components/Stepper',
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IStepperProps> = ({
  linear = false,
  alternative = false,
  layoutMode = 'fixed',
  layoutAlign = 'center',
  disabled = false,
  vertical = false,
  editable = false,
  completed = false,
  error = false
}) => (
  <ForgeStepper
    linear={linear}
    alternative={alternative}
    layoutMode={layoutMode}
    layoutAlign={layoutAlign}
    disabled={disabled}
    vertical={vertical}>
    <ForgeStep editable={editable} completed={completed} error={error}>Step One</ForgeStep>
    <ForgeStep editable={editable} completed={completed} error={error}>
      Step Two
      <span slot="optional">Optional</span>
    </ForgeStep>
    <ForgeStep editable={editable} completed={completed} error={error}>Step Three</ForgeStep>
    <ForgeStep editable={editable} completed={completed} error={error}>Step Four</ForgeStep>
    <ForgeStep editable={editable} completed={completed} error={error}>Done</ForgeStep>
  </ForgeStepper>
);
Default.argTypes = argTypes;
Default.args = {
  linear: false,
  alternative: false,
  layoutMode: 'fixed',
  layoutAlign: 'center',
  disabled: false,
  vertical: false,
  editable: false,
  completed: false,
  error: false
} as IStepperProps;

export const Configuration: Story<ILimitedStepperProps> = ({
  linear = false,
  alternative = true,
  layoutMode = 'fixed',
  layoutAlign = 'center',
  disabled = false,
  vertical = false
}) => {
  const [index, setIndex] = useState<number>(2);
  return (
    <ForgeStepper 
      linear={linear}
      alternative={alternative}
      layoutMode={layoutMode}
      layoutAlign={layoutAlign}
      disabled={disabled}
      vertical={vertical}
      steps={[
        { label: 'Step one', completed: true },
        { label: 'Step two', optionalLabel: 'Optional', completed: true, editable: true },
        { label: 'Step three' },
        { label: 'Step four' },
        { label: 'Done' }
      ]}
      selectedIndex={2}
      on-forge-stepper-select={(evt: CustomEvent) => setIndex(evt.detail)} />
  );
};
Configuration.argTypes = limitedArgTypes;
Configuration.args = {
  linear: false,
  alternative: false,
  layoutMode: 'fixed',
  layoutAlign: 'center',
  disabled: false,
  vertical: false
} as ILimitedStepperProps;
