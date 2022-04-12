import { Meta } from '@storybook/react';
import { ProfileTemplate } from './templates/profile';
import { ListTemplate } from './templates/list';
import { ChipsTemplate } from './templates/chips';
import { ButtonsTemplate } from './templates/buttons';
import { AppTemplate } from './templates/app';
import { FormFieldTemplate } from './templates/form-field';
const MDX = require('./skeleton.mdx').default;

export default {
  title: 'Components/Skeleton',
  parameters: { 
    docs: { 
      page: MDX
    },
    controls: {
      disable: true
    }
  },
} as Meta;

export const Profile = ProfileTemplate.bind({});
export const List = ListTemplate.bind({});
export const Chips = ChipsTemplate.bind({});
export const Buttons = ButtonsTemplate.bind({});
export const App = AppTemplate.bind({});
export const FormField = FormFieldTemplate.bind({});
