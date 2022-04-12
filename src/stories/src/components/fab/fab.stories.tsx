import { Meta } from '@storybook/react';
const MDX = require('./fab.mdx').default;
import { DefaultTemplate } from './templates/default';
import { argTypes, IFabProps } from './fab-args';

export default {
  title: 'Components/Floating Action Button',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;


export const Default = DefaultTemplate.bind({});
Default.args = {
  extended: false,
  mini: false,
  exited: false,
  theme: 'none',
} as IFabProps;
