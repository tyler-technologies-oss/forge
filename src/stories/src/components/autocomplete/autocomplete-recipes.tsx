import { Meta } from '@storybook/react';
const MDX = require('./autocomplete.mdx').default;
import { argTypes } from './autocomplete-args';
import { SearchFieldTemplate } from './templates/search-field';

const autocompleteArgTypes = { 
  filterOnFocus: argTypes.filterOnFocus
};

export default {
  title: 'Components/Autocomplete/Recipes',
  argTypes: autocompleteArgTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const SearchField = SearchFieldTemplate.bind({});
SearchField.args = {
  filterOnFocus: true
};
