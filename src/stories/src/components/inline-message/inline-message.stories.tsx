import { Meta } from '@storybook/react';
import { argTypes, IInlineMessageProps } from './inline-message-arg';
import { DefaultTemplate } from './templates/default';
const MDX = require('./inline-message.mdx').default;

export default {
  title: 'Components/Inline Message',
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.argTypes = argTypes;
Default.args = {
  hasIcon: false,
  hasTitle: false,
  theme: 'info-primary',
} as IInlineMessageProps;
