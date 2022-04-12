import { Story } from '@storybook/react';
import { ForgeButton, ForgeToast, ForgeToastOptions } from '@tylertech/forge-react';
import React, { useState } from 'react';
import { IToastProps } from '../toast-args';

export const DefaultTemplate: Story<IToastProps> = ({
  message = 'Save successful.',
  actionText = '',
  duration = 2750,
  placement = 'bottom',
  showClose = true
}) => {
  const toastProps = {
    message,
    actionText,
    duration,
    placement,
    showClose
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const options: ForgeToastOptions = {
    ...toastProps,
    actionHandler: () => {
      console.log('Toast action clicked');
    }
  }
  return (
    <>
      <ForgeButton type="raised">
        <button onClick={() => setIsOpen(true)}>Show toast</button>
      </ForgeButton>
      <ForgeToast options={options} open={isOpen} onDismiss={() => setIsOpen(false)}></ForgeToast>
    </>
  );
};
