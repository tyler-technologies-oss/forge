import { BaseComponentDelegate, IBaseComponentDelegateConfig, IBaseComponentDelegateOptions } from '../core/delegates/base-component-delegate';
import { ICalendarComponent } from './calendar';
import {
  CalendarView,
  CALENDAR_CONSTANTS,
  ICalendarDateSelectEventData,
  ICalendarFocusChangeEventData,
  ICalendarMonthChangeEventData
} from './calendar-constants';

export type CalendarComponentDelegateProps = Partial<ICalendarComponent>;
export interface ICalendarComponentDelegateOptions extends IBaseComponentDelegateOptions {}
export interface ICalendarComponentDelegateConfig extends IBaseComponentDelegateConfig<ICalendarComponent, ICalendarComponentDelegateOptions> {}

export class CalendarComponentDelegate extends BaseComponentDelegate<ICalendarComponent, ICalendarComponentDelegateOptions> {
  constructor(config?: ICalendarComponentDelegateConfig) {
    super(config);
  }

  protected _build(): ICalendarComponent {
    return document.createElement(CALENDAR_CONSTANTS.elementName);
  }

  public onDateSelect(listener: (evt: CustomEvent<ICalendarDateSelectEventData>) => void): void {
    this._element.addEventListener(CALENDAR_CONSTANTS.events.DATE_SELECT, listener);
  }

  public onFocusChange(listener: (evt: CustomEvent<ICalendarFocusChangeEventData>) => void): void {
    this._element.addEventListener(CALENDAR_CONSTANTS.events.FOCUS_CHANGE, listener);
  }

  public onMonthChange(listener: (evt: CustomEvent<ICalendarMonthChangeEventData>) => void): void {
    this._element.addEventListener(CALENDAR_CONSTANTS.events.MONTH_CHANGE, listener);
  }

  public onViewChange(listener: (evt: CustomEvent<CalendarView>) => void): void {
    this._element.addEventListener(CALENDAR_CONSTANTS.events.VIEW_CHANGE, listener);
  }
}
