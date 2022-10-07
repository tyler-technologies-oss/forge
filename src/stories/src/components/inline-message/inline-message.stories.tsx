import React, { useEffect } from 'react';
import { Meta, Story } from '@storybook/react';
import { IconRegistry } from '@tylertech/forge';
import { ForgeIcon, ForgeInlineMessage } from '@tylertech/forge-react';
import { tylIconCake } from '@tylertech/tyler-icons/standard';
import { argTypes, IInlineMessageProps } from './inline-message-arg';

const MDX = require('./inline-message.mdx').default;

export default {
  title: 'Components/Inline Message',
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IInlineMessageProps> = ({
  hasIcon = true,
  hasTitle = true,
  theme = 'info-primary'
}) => {
  useEffect(() => {
    IconRegistry.define(tylIconCake);
  }, []);

  return (
    <ForgeInlineMessage theme={theme}>
      {hasIcon && <ForgeIcon slot="icon" name="cake" />}
      {hasTitle && <div slot="title">Example</div>}
      <div>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</div>
    </ForgeInlineMessage>
  );
};
Default.argTypes = argTypes;
Default.args = {
  hasIcon: true,
  hasTitle: true,
  theme: 'info-primary'
} as IInlineMessageProps;
