import { Meta } from '@storybook/react';
const MDX = require('./dialog.mdx').default;
import { EditSettingsTemplate } from './templates/edit-settings';
import { FullscreenResponsiveTemplate } from './templates/fullscreen-responsive';
import { StepperTemplate } from './templates/stepper';
import { SuccessConfirmationTemplate } from './templates/success-confirmation';

export default {
  title: 'Components/Dialog/Recipes',
  parameters: { 
    docs: { 
      page: MDX
    },
    controls: { hideNoControlsWarning: true }
  },
} as Meta;

export const Stepper = StepperTemplate.bind({});
export const EditSettings = EditSettingsTemplate.bind({});
export const FullscreenResponsive = FullscreenResponsiveTemplate.bind({});
export const SuccessConfirmation = SuccessConfirmationTemplate.bind({});
