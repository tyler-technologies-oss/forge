import { Meta } from '@storybook/react';
import { DefaultTemplate } from './templates/default';
import { IAppBarSearchProps, argTypes } from './app-bar-search-args';
const MDX = require('./app-bar-search.mdx').default;

export default {
  title: 'Components/App Bar/Search',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  disabled: false,
  placeholder: 'Search',
  combined: false,
  global: false,
} as IAppBarSearchProps;
