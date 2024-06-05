import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
import { generateCustomElementArgTypes } from '../../utils';

import '@tylertech/forge/calendar';

const component = 'forge-calendar';

const dateSelectAction = action('forge-calendar-date-select');
const focusChangeAction = action('forge-calendar-focus-change');
const monthChangeAction = action('forge-calendar-month-change');
const viewChangeAction = action('forge-calendar-view-change');

const meta = {
  title: 'Components/Calendar',
  render: args => {
    return html`<forge-calendar
      .month=${args.month}
      .year=${args.year}
      .mode=${args.mode}
      .readonly=${args.readonly}
      .allowSingleDateRange=${args.allowSingleDateRange}
      .showToday=${args.showToday}
      .showOtherMonths=${args.showOtherMonths}
      .fixedHeight=${args.fixedHeight}
      .view=${args.view}
      .showHeader=${args.showHeader}
      .selectionFollowsMonth=${args.selectionFollowsMonth}
      .yearRange=${args.yearRange}
      .listYears=${args.listYears}
      .menuAnimation=${args.menuAnimation}
      .clearButton=${args.clearButton}
      .todayButton=${args.todayButton}
      .min=${args.min}
      .max=${args.max}
      .disabledDates=${args.disabledDates}
      .disabledDaysOfWeek=${args.disabledDaysOfWeek}
      .constrainToEnabled=${args.constrainToEnabled}
      .events=${args.events}
      .locale=${args.locale}
      .firstDayOfWeek=${args.firstDayOfWeek}
      .weekendDays=${args.weekendDays}
      .preventFocus=${args.preventFocus}
      @forge-calendar-date-select=${dateSelectAction}
      @forge-calendar-focus-change=${focusChangeAction}
      @forge-calendar-month-change=${monthChangeAction}
      @forge-calendar-view-change=${viewChangeAction}></forge-calendar>`;
  },
  component,
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: [
        'clearCallback',
        'dateBuilder',
        'dateSelectCallback',
        'dayBuilder',
        'disabledDateBuilder',
        'eventBuilder',
        'todayCallback', 
        'tooltipBuilder',
        'value',
      ],
      controls: {
        activeDate: {
          control: {
            type: 'date',
          },
        },
        disabledDates : {
          control: {
            type: 'object',
          },
        },
        disabledDaysOfWeek: {
          control: {
            type: 'multi-select',
            labels: [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
            ],
          },
          options: [0,1,2,3,4,5,6]
        },
        events: {
          control: {
            type: 'object'
          }
        },
        firstDayOfWeek: {
          control: {
            type: 'select',
            labels: [
              'Default',
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
            ],
          },
          options: [0,1,2,3,4,5,6]
        },
        month: {
          control: {
            type: 'select',
            labels: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ],
          },
          options: [0,1,2,3,4,5,6,7,8,9,10,11]
        },
        weekendDays: {
          control: {
            type: 'multi-select',
            labels: [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
            ],
          },
          options: [0,1,2,3,4,5,6]
        },
        menuAnimation: {
          control: 'select',
          options: [
            'scale',
            'fade',
            'none',
          ],
        },
        mode: {
          control: 'select',
          options: [
            'single',
            'multiple',
            'range',
          ],
        },
        view: {
          control: 'select',
          options: [
            'date',
            'month',
            'year',
          ],
        },
      }
    }),
  },
  args: {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    mode: 'single',
    readonly: false,
    allowSingleDateRange: true,
    showToday: false,
    showOtherMonths: false,
    fixedHeight: false,
    view: 'month',
    showHeader: true,
    selectionFollowsMonth: false,
    yearRange: '-50:+50',
    listYears: true,
    menuAnimation: 'scale',
    clearButton: false,
    todayButton: false,
    disabledDates: [],
    disabledDaysOfWeek: [],
    constrainToEnabled: true,
    events: [],
    locale: 'en-US',  
    preventFocus: false,                                                                              
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
