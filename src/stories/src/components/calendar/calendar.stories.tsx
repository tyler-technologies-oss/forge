import { Meta } from '@storybook/react';
import { argTypes, ICalendarProps } from './calendar-args';
import { DefaultTemplate } from './templates/default';
const MDX = require('./calendar.mdx').default;

export default {
  title: 'Components/Calendar',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  month: undefined,
  year: undefined,
  mode: 'single',
  readonly: false,
  allowSingleDateRange: true,
  showToday: true,
  showOtherMonths: false,
  fixedHeight: false,
  view: undefined,
  showHeader: true,
  selectionFollowsMonth: false,
  yearRange: '-50:+50',
  listYears: true,
  menuAnimation: 'scale',
  clearButton: false,
  todayButton: false,
  min: null,
  max: null,
  disabledDates: null,
  disabledDaysOfWeek: null,
  constrainToEnabled: true,
  events: null,
  locale: undefined,
  firstDayOfWeek: undefined,
  weekendDays: null,
  preventFocus: false,
} as ICalendarProps;
