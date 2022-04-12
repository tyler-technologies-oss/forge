import { Meta } from '@storybook/react';
import { argTypes, ILimitedStepperProps, IStepperProps, limitedArgTypes } from './stepper-args';
import { DefaultTemplate } from './templates/default';
import { ConfigurationTemplate } from './templates/configuration';
const MDX = require('./stepper.mdx').default;

export default {
  title: 'Components/Stepper',
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
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
  error: false,
} as IStepperProps;

export const Configuration = ConfigurationTemplate.bind({});
Configuration.argTypes = limitedArgTypes;
Configuration.args = {
  linear: false,
  alternative: false,
  layoutMode: 'fixed',
  layoutAlign: 'center',
  disabled: false,
  vertical: false,
} as ILimitedStepperProps;
