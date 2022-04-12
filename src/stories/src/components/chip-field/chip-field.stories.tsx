import { Meta } from '@storybook/react';
import { argTypes, IChipFieldProps } from './chip-field-args';
import { DefaultTemplate } from './templates/default';
import { WithAutocompleteTemplate } from './templates/with-autocomplete';
const MDX = require('./chip-field.mdx').default;

export default {
  title: 'Components/Chip Field',
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.argTypes = argTypes;
Default.args = {
  density: 'default',
  floatLabelType: 'auto',
  shape: 'default',
  label: 'Fruits',
  invalid: false,
  required: false,
  disabled: false,
  hasPlaceholder: false,
  hasLabel: true,
  hasLeading: false,
  hasTrailing: false,
  hasHelperText: false,
  hasAddonEnd: false,
} as IChipFieldProps;

export const WithAutocomplete = WithAutocompleteTemplate.bind({});
WithAutocomplete.parameters = {
  controls: { disable: true }
};
