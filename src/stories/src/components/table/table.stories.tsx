import { Meta } from '@storybook/react';
import { CellAlign } from '@tylertech/forge';
import { ITableProps, argTypes } from './table-args';
import { DefaultTemplate } from './templates/default';
const MDX = require('./table.mdx').default;

export default {
  title: 'Components/Table',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  select: false,
  multiselect: true,
  dense: false,
  roomy: false,
  filter: false,
  fixedHeaders: false,
  layoutType: 'auto',
  wrapContent: true,
  resizable: false,
  minResizeWidth: 100,
  allowRowClick: false,
  multiColumnSort: false,
  selectCheckboxAlignment: CellAlign.Center,
} as ITableProps;
