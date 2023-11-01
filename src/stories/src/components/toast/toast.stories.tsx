import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { IToastProps, argTypes } from './toast-args';
import { ForgeButton, ForgeToast, ForgeToastOptions } from '@tylertech/forge-react';
import { TOAST_CONSTANTS } from '@tylertech/forge';
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
  showClose = true
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const options: ForgeToastOptions = {
    message,
    actionText,
    duration,
    placement,
    showClose,
    actionHandler: () => {
      console.log('Toast action clicked');
    }
  }
  return (
    <>
      <ForgeButton variant="raised" onClick={() => setIsOpen(true)}>Show toast</ForgeButton>
      <ForgeToast options={options} open={isOpen} onDismiss={() => setIsOpen(false)} />
    </>
  );
};
Default.args = {
  message: 'Save successful',
  actionText: '',
  duration: TOAST_CONSTANTS.defaults.DURATION,
  placement: TOAST_CONSTANTS.defaults.PLACEMENT,
  showClose: true
} as IToastProps;
