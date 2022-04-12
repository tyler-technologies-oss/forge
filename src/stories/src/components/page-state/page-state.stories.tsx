import { Meta } from '@storybook/react';
import { DefaultTemplate } from './templates/default';
import { IPageStateProps, argTypes } from './page-state-args';
const MDX = require('./page-state.mdx').default;

export default {
  title: 'Components/Page State',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  hasGraphic: true,
  hasTitle: true,
  hasMessage: true,
  hasActions: true,
} as IPageStateProps;
