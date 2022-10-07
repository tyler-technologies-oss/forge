import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ForgePaginator } from '@tylertech/forge-react';
import { PAGINATOR_CONSTANTS } from '@tylertech/forge';
import { IPaginatorProps, argTypes } from './paginator-args';

const MDX = require('./paginator.mdx').default;

export default {
  title: 'Components/Paginator',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IPaginatorProps> = ({
  pageIndex = PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_INDEX,
  pageSize = PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE,
  offset = 0,
  total = 100,
  pageSizeOptions = PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE_OPTIONS,
  label = PAGINATOR_CONSTANTS.strings.DEFAULT_LABEL,
  firstLast = false,
  first = false,
  disabled = false,
  alternative = false,
  alignment = 'space-between'
}) => (
  <ForgePaginator
    pageIndex={pageIndex}
    pageSize={pageSize}
    offset={offset}
    total={total}
    pageSizeOptions={pageSizeOptions}
    label={label}
    firstLast={firstLast}
    first={first}
    disabled={disabled}
    alternative={alternative}
    alignment={alignment} />
);
Default.args = {
  pageIndex: PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_INDEX,
  pageSize: PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE,
  offset: 0,
  total: 100,
  pageSizeOptions: PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE_OPTIONS,
  label: PAGINATOR_CONSTANTS.strings.DEFAULT_LABEL,
  firstLast: false,
  first: false,
  disabled: false,
  alternative: false,
  alignment: 'space-between'
} as IPaginatorProps;
