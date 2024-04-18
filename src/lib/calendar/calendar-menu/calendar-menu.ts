import { CustomElement, attachShadowTemplate, ICustomElement, FoundationProperty, coerceBoolean, elementParents } from '@tylertech/forge-core';
import { FocusIndicatorComponent } from '../../focus-indicator/focus-indicator';
import { StateLayerComponent } from '../../state-layer/state-layer';

import { CalendarMenuAdapter } from './calendar-menu-adapter';
import { CalendarDirection, CalendarMenuAnimationType, CALENDAR_MENU_CONSTANTS, ICalendarMenuOption } from './calendar-menu-constants';
import { CalendarMenuFoundation } from './calendar-menu-foundation';

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
 * The web component class behind the `<forge-calendar-menu>` custom element.
 * 
 * @internal
 * @tag forge-calendar-menu
 */
@CustomElement({
  name: CALENDAR_MENU_CONSTANTS.elementName,
  dependencies: [
    StateLayerComponent,
    FocusIndicatorComponent
  ]
})
export class CalendarMenuComponent extends HTMLElement implements ICalendarMenuComponent {
  public static get observedAttributes(): string[] {
    return [
      CALENDAR_MENU_CONSTANTS.attributes.ANIMATION_TYPE,
      CALENDAR_MENU_CONSTANTS.attributes.PREVENT_FOCUS
    ];
  }

  private _foundation: CalendarMenuFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new CalendarMenuFoundation(new CalendarMenuAdapter(this));
  }

  public connectedCallback(): void {
    // To simulate the :host-context() selector for Firefox until they implement it, we need to determine if the
    // calendar is within a popup for auto-styling the calendar when included within a popup. Check to see if
    // any of the parents of this element are a popup.
    if (!this.hasAttribute(CALENDAR_MENU_CONSTANTS.attributes.POPOVER_CONTEXT) && elementParents(this).some(el => el.tagName.toLowerCase() === 'forge-popover')) {
      this.setAttribute(CALENDAR_MENU_CONSTANTS.attributes.POPOVER_CONTEXT, 'true');
    }

    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
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

  @FoundationProperty()
  public declare animationType: CalendarMenuAnimationType;

  @FoundationProperty()
  public declare preventFocus: boolean;

  public animateIn(options: ICalendarMenuOption[], direction: CalendarDirection, setFocus = false): void {
    this._foundation.animateIn(options, direction, setFocus);
  }

  public close(): void {
    this._foundation.close();
  }

  public moveFocusDown(): void {
    this._foundation.moveFocusDown();
  }

  public moveFocusBackward(): boolean {
    return this._foundation.moveFocusBackward();
  }

  public moveFocusForward(): boolean {
    return this._foundation.moveFocusForward();
  }

  public moveFocusUp(): void {
    this._foundation.moveFocusUp();
  }

  public openAsGrid(options: ICalendarMenuOption[], setFocus = false): void {
    this._foundation.openAsGrid(options, setFocus);
  }

  public openAsList(options: ICalendarMenuOption[], setFocus = false): void {
    this._foundation.openAsList(options, setFocus);
  }

  public selectFocusedItem(): void {
    this._foundation.selectFocusedItem();
  }
}
