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
  type = 'flat',
  text = 'Button',
  disabled = false,
  hasLeadingIcon = false,
  hasTrailingIcon = false
}) => {
  useEffect(() => {
    IconRegistry.define([tylIconFace, tylIconOpenInNew]);
  }, []);

  return (
    <ForgeButton type={type}>
      <button type="button" disabled={disabled}>
        {hasLeadingIcon && <ForgeIcon name="face" />}
        <span>{text}</span>
        {hasTrailingIcon && <ForgeIcon name="open_in_new" />}
      </button>
    </ForgeButton>
  )
};
Default.argTypes = buttonArgTypes;
Default.args = {
  type: 'flat',
  text: 'Button',
  disabled: false,
  hasLeadingIcon: false,
  hasTrailingIcon: false
} as IButtonProps;
