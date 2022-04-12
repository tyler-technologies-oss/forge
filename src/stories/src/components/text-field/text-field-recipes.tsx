import { Meta } from '@storybook/react';
import { textFieldArgTypes, ITextFieldProps } from './text-field-args';
import { ChatFieldTemplate } from './templates/chat-field';
import { SearchFieldTemplate } from './templates/search-field';
import { QuestionairreTemplate } from './templates/questionairre';
const MDX = require('./text-field.mdx').default;

export default {
  title: 'Components/Text Field/Recipes',
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const ChatField = ChatFieldTemplate.bind({});
ChatField.argTypes = textFieldArgTypes;
ChatField.args = {
  density: 'default',
  floatLabelType: 'auto',
  shape: 'rounded',
  invalid: false,
  required: false,
  disabled: false,
} as ITextFieldProps;

export const SearchField = SearchFieldTemplate.bind({});
SearchField.argTypes = textFieldArgTypes;
SearchField.args = {
  density: 'default',
  floatLabelType: 'auto',
  shape: 'default',
  invalid: false,
  required: false,
  disabled: false,
} as ITextFieldProps;

export const Questionairre = QuestionairreTemplate.bind({});
Questionairre.argTypes = textFieldArgTypes;
Questionairre.args = {
  density: 'default',
  floatLabelType: 'auto',
  shape: 'default',
  invalid: false,
  required: false,
  disabled: false,
} as ITextFieldProps;
