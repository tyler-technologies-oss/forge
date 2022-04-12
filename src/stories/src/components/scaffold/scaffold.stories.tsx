import { Meta } from '@storybook/react';
import { argTypes, IScaffoldProps } from './scaffold-args';
import { DefaultTemplate } from './templates/default';
const MDX = require('./scaffold.mdx').default;

export default {
  title: 'Components/Scaffold',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  hasLeft: true,
  hasHeader: true,
  hasBody: true,
  hasBodyHeader: true,
  hasBodyLeft: true,
  hasBodyRight: true,
  hasBodyFooter: true,
  hasFooter: true,
  hasRight: true,
} as IScaffoldProps;
