import React from 'react';
import { Meta } from '@storybook/react';
import { DefaultTemplate } from './templates/default';
import { argTypes, ICardProps } from './card-args';
import { StyledTemplate } from './templates/styled';
const MDX = require('./card.mdx').default;

export default {
  title: 'Components/Card',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '24px', backgroundColor: 'var(--mdc-theme-background)', }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  outlined: false,
} as ICardProps;

export const Styled = StyledTemplate.bind({});
Styled.args = {
  outlined: false,
} as ICardProps;
