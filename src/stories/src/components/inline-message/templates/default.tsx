import { Story } from '@storybook/react';
import { ForgeInlineMessage } from '@tylertech/forge-react';
import React from 'react';
import { IInlineMessageProps } from '../inline-message-arg';

export const DefaultTemplate: Story<IInlineMessageProps> = ({
  hasIcon = false,
  hasTitle = false,
  theme = 'info-primary',
}) => {
  const Icon = () => hasIcon ? (<i slot="icon" className={'tyler-icons'}>cake</i>) : null;
  const Title = () => hasTitle ? (<div slot="title">Example</div>) : null;
  const inlineMessageProps = {
    theme
  };
  return (
    <ForgeInlineMessage {...inlineMessageProps}>
      <Icon/>
      <Title/>
      <div>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</div>
    </ForgeInlineMessage>
  );
};
