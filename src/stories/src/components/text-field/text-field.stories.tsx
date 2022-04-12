import { Meta } from '@storybook/react';
import { textFieldArgTypes, textFieldTextareaArgTypes, ITextFieldProps, ITextFieldTextareaProps } from './text-field-args';
import { DefaultTemplate } from './templates/default';
import { TextareaTemplate } from './templates/textarea';
const MDX = require('./text-field.mdx').default;

export default {
  title: 'Components/Text field',
  parameters: {
    docs: { page: MDX }
  }
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.argTypes = textFieldArgTypes;
Default.args = {
  density: 'default',
  floatLabelType: 'auto',
  shape: 'default',
  label: 'First name',
  invalid: false,
  required: false,
  disabled: false,
  hasPlaceholder: false,
  hasLabel: true,
  hasLeading: false,
  hasTrailing: false,
  hasHelperText: false,
  hasAddonEnd: false,
} as ITextFieldProps;

export const Textarea = TextareaTemplate.bind({});
Textarea.argTypes = textFieldTextareaArgTypes;
Textarea.args = {
  floatLabelType: 'auto',
  invalid: false,
  required: false,
  disabled: false,
  hasPlaceholder: false,
  hasLabel: true,
  hasHelperText: false
} as ITextFieldTextareaProps;
