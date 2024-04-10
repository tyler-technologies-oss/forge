import React from 'react';
import { Meta, Story } from '@storybook/react';
import { IToastProps, argTypes } from './toast-args';
import { ForgeButton } from '@tylertech/forge-react';
import { ToastComponent, TOAST_CONSTANTS } from '@tylertech/forge';
const MDX = require('./toast.mdx').default;

export default {
  title: 'Components/Toast',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IToastProps> = ({
  message = 'Save successful',
  actionText = '',
  duration = 2750,
  placement = 'bottom',
  dismissible = true
}) => {

  function showToast(): void {
    ToastComponent.present({
      message,
      actionText,
      duration,
      placement,
      dismissible
    });
  }

  return (
    <>
      <ForgeButton variant="raised" onClick={showToast}>Show toast</ForgeButton>
    </>
  );
};
Default.args = {
  message: 'Save successful',
  actionText: '',
  duration: TOAST_CONSTANTS.defaults.DURATION,
  placement: TOAST_CONSTANTS.defaults.PLACEMENT,
  dismissible: true
} as IToastProps;
