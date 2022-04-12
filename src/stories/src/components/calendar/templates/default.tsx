import { Story } from '@storybook/react';
import { ForgeCalendar } from '@tylertech/forge-react';
import React from 'react';
import { ICalendarProps } from '../calendar-args';

export const DefaultTemplate: Story<ICalendarProps> = ({
  allowSingleDateRange = true,
  clearButton = false,
  constrainToEnabled = true,
  disabledDates = null,
  disabledDaysOfWeek = null,
  events = null,
  firstDayOfWeek = undefined,
  fixedHeight = false,
  listYears = true,
  locale = undefined,
  max = null,
  menuAnimation = 'scale',
  min = null,
  mode = 'single',
  month = undefined,
  preventFocus = false,
  readonly = false,
  selectionFollowsMonth = false,
  showHeader = true,
  showOtherMonths = false,
  showToday = true,
  todayButton = false,
  view,
  weekendDays = null,
  year = undefined,
  yearRange = '-50:+50',
}) => {
  const calendarProps = {
    allowSingleDateRange,
    clearButton,
    constrainToEnabled,
    disabledDates,
    disabledDaysOfWeek,
    events,
    firstDayOfWeek,
    fixedHeight,
    listYears,
    locale,
    max,
    menuAnimation,
    min,
    mode,
    month,
    preventFocus,
    readonly,
    selectionFollowsMonth,
    showHeader,
    showOtherMonths,
    showToday,
    todayButton,
    view,
    weekendDays,
    year,
    yearRange,
  };
  const style = {
    width: '400px',
    maxWidth: '100%'
  }
  return <ForgeCalendar style={style} {...calendarProps} />;
}
