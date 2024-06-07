import { customElement, attachShadowTemplate, ICustomElement, coreProperty, coerceBoolean, elementParents } from '@tylertech/forge-core';
import { FocusIndicatorComponent } from '../../focus-indicator/focus-indicator';
import { StateLayerComponent } from '../../state-layer/state-layer';

import { CalendarMenuAdapter } from './calendar-menu-adapter';
import { CalendarDirection, CalendarMenuAnimationType, CALENDAR_MENU_CONSTANTS, ICalendarMenuOption } from './calendar-menu-constants';
import { CalendarMenuCore } from './calendar-menu-core';

import template from './calendar-menu.html';
import styles from './calendar-menu.scss';

export interface ICalendarMenuComponent extends ICustomElement {
  animationType: CalendarMenuAnimationType;
  preventFocus: boolean;
  animateIn(options: ICalendarMenuOption[], direction: CalendarDirection, setFocus?: boolean): void;
  close(): void;
  moveFocusBackward(): boolean;
  moveFocusDown(): void;
  moveFocusForward(): boolean;
  moveFocusUp(): void;
  openAsGrid(options: ICalendarMenuOption[], setFocus?: boolean): void;
  openAsList(options: ICalendarMenuOption[], setFocus?: boolean): void;
  selectFocusedItem(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-calendar-menu': ICalendarMenuComponent;
  }

  interface HTMLElementEventMap {
    'forge-calendar-menu-focus-change': CustomEvent<number>;
    'forge-calendar-menu-select': CustomEvent<number>;
  }
}

/**
 * @internal
 * @tag forge-calendar-menu
 */
@customElement({
  name: CALENDAR_MENU_CONSTANTS.elementName,
  dependencies: [StateLayerComponent, FocusIndicatorComponent]
})
export class CalendarMenuComponent extends HTMLElement implements ICalendarMenuComponent {
  public static get observedAttributes(): string[] {
    return [CALENDAR_MENU_CONSTANTS.attributes.ANIMATION_TYPE, CALENDAR_MENU_CONSTANTS.attributes.PREVENT_FOCUS];
  }

  private _core: CalendarMenuCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new CalendarMenuCore(new CalendarMenuAdapter(this));
  }

  public connectedCallback(): void {
    // To simulate the :host-context() selector for Firefox until they implement it, we need to determine if the
    // calendar is within a popup for auto-styling the calendar when included within a popup. Check to see if
    // any of the parents of this element are a popup.
    if (
      !this.hasAttribute(CALENDAR_MENU_CONSTANTS.attributes.POPOVER_CONTEXT) &&
      elementParents(this).some(el => el.tagName.toLowerCase() === 'forge-popover')
    ) {
      this.setAttribute(CALENDAR_MENU_CONSTANTS.attributes.POPOVER_CONTEXT, 'true');
    }

    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case CALENDAR_MENU_CONSTANTS.attributes.ANIMATION_TYPE:
        this.animationType = newValue as CalendarMenuAnimationType;
        break;
      case CALENDAR_MENU_CONSTANTS.attributes.PREVENT_FOCUS:
        this.preventFocus = coerceBoolean(newValue);
        break;
    }
  }

  @coreProperty()
  public declare animationType: CalendarMenuAnimationType;

  @coreProperty()
  public declare preventFocus: boolean;

  public animateIn(options: ICalendarMenuOption[], direction: CalendarDirection, setFocus = false): void {
    this._core.animateIn(options, direction, setFocus);
  }

  public close(): void {
    this._core.close();
  }

  public moveFocusDown(): void {
    this._core.moveFocusDown();
  }

  public moveFocusBackward(): boolean {
    return this._core.moveFocusBackward();
  }

  public moveFocusForward(): boolean {
    return this._core.moveFocusForward();
  }

  public moveFocusUp(): void {
    this._core.moveFocusUp();
  }

  public openAsGrid(options: ICalendarMenuOption[], setFocus = false): void {
    this._core.openAsGrid(options, setFocus);
  }

  public openAsList(options: ICalendarMenuOption[], setFocus = false): void {
    this._core.openAsList(options, setFocus);
  }

  public selectFocusedItem(): void {
    this._core.selectFocusedItem();
  }
}
