import React from 'react';
import { Meta, Story } from '@storybook/react';
import { argTypes, ICalendarProps } from './calendar-args';
import { ForgeCalendar } from '@tylertech/forge-react';

const MDX = require('./calendar.mdx').default;

export default {
  title: 'Components/Calendar',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<ICalendarProps> = ({
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
  const style = {
    width: '400px',
    maxWidth: '100%'
  }
  return <ForgeCalendar
    style={style}
    allowSingleDateRange={allowSingleDateRange}
    clearButton={clearButton}
    constrainToEnabled={constrainToEnabled}
    disabledDates={disabledDates}
    disabledDaysOfWeek={disabledDaysOfWeek}
    events={events}
    firstDayOfWeek={firstDayOfWeek}
    fixedHeight={fixedHeight}
    listYears={listYears}
    locale={locale}
    max={max}
    menuAnimation={menuAnimation}
    min={min}
    mode={mode}
    month={month}
    preventFocus={preventFocus}
    readonly={readonly}
    selectionFollowsMonth={selectionFollowsMonth}
    showHeader={showHeader}
    showOtherMonths={showOtherMonths}
    showToday={showToday}
    todayButton={todayButton}
    view={view}
    weekendDays={weekendDays}
    year={year}
    yearRange={yearRange} />;
}
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
