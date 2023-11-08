import { Meta, Story } from '@storybook/react';
import React, { useEffect } from 'react';
import { buttonArgTypes, IButtonProps } from './button-args';
import { ForgeButton, ForgeIcon } from '@tylertech/forge-react';
import { IconRegistry } from '@tylertech/forge';
import { tylIconFace, tylIconOpenInNew } from '@tylertech/tyler-icons/standard';

const MDX = require('./button.mdx').default;

export default {
  title: 'Components/Button',
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default: Story<IButtonProps> = ({
  variant = '',
  text = 'Button',
  disabled = false,
  dense = false,
  hasLeadingIcon = false,
  hasTrailingIcon = false
}) => {
  useEffect(() => {
    IconRegistry.define([tylIconFace, tylIconOpenInNew]);
  }, []);

  return (
    <ForgeButton variant={variant} disabled={disabled} dense={dense}>
      {hasLeadingIcon && <ForgeIcon slot="start" name="face" />}
      <span>{text}</span>
      {hasTrailingIcon && <ForgeIcon slot="end" name="open_in_new" />}
    </ForgeButton>
  )
};
Default.argTypes = buttonArgTypes;
Default.args = {
  variant: '',
  text: 'Button',
  disabled: false,
  dense: false,
  hasLeadingIcon: false,
  hasTrailingIcon: false
} as IButtonProps;
