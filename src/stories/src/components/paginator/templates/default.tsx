import { Story } from '@storybook/react';
import { ForgePaginator } from '@tylertech/forge-react';
import React from 'react';
import { IPaginatorProps } from '../paginator-args';

export const DefaultTemplate: Story<IPaginatorProps> = ({
  pageIndex = 0,
  pageSize = 25,
  offset = 0,
  total = 100,
  pageSizeOptions = [5, 15, 25, 50, 100],
  label = 'Rows per page:',
  firstLast = false,
  first = false,
  disabled = false,
  alternative = false,
  alignment = 'space-between',
}) => {
  const paginatorProps = {
    pageIndex,
    pageSize,
    offset,
    total,
    pageSizeOptions,
    label,
    firstLast,
    first,
    disabled,
    alternative,
    alignment,
  };
  return (
    <ForgePaginator {...paginatorProps}></ForgePaginator>
  );
}

