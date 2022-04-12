import { Meta } from '@storybook/react';
import { IPaginatorProps, argTypes } from './paginator-args';
import { DefaultTemplate } from './templates/default';
const MDX = require('./paginator.mdx').default;

export default {
  title: 'Components/Paginator',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  pageIndex: 0,
  pageSize: 25,
  offset: 0,
  total: 100,
  pageSizeOptions: [5, 15, 25, 50, 100],
  label: 'Rows per page:',
  firstLast: false,
  first: false,
  disabled: false,
  alternative: false,
  alignment: 'space-between',
} as IPaginatorProps;
