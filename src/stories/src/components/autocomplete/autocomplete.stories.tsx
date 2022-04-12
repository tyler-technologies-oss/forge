import { Meta } from '@storybook/react';
const MDX = require('./autocomplete.mdx').default;
import { argTypes, IAutocompleteProps } from './autocomplete-args';
import { DefaultTemplate } from './templates/default';

export default {
  title: 'Components/Autocomplete',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  allowUnmatched: false,
  debounce: 500,
  filterOnFocus: true,
  mode: 'default',
  multiple: false,
  observeScroll: false,
  observeScrollThreshold: 0,
  optionLimit: 0,
} as IAutocompleteProps;
