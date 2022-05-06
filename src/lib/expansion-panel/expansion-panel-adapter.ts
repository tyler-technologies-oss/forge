import { getShadowElement } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { OpenIconComponent } from '../open-icon';
import { IExpansionPanelComponent } from './expansion-panel';
import { EXPANSION_PANEL_CONSTANTS } from './expansion-panel-constants';

export interface IExpansionPanelAdapter extends IBaseAdapter {
  initialize: (open: boolean, orientation: string) => void;
  setHeaderVisibility: (visible: boolean) => void;
  setOpenState: (open: boolean, orientation: string, animate: boolean) => void;
  registerClickListener: (listener: (evt: MouseEvent) => void) => void;
  deregisterClickListener: (listener: (evt: MouseEvent) => void) => void;
  registerKeydownListener: (listener: (evt: KeyboardEvent) => void) => void;
  deregisterKeydownListener: (listener: (evt: KeyboardEvent) => void) => void;
  registerHeaderSlotListener: (listener: (evt: Event) => void) => void;
  deregisterHeaderSlotListener: (listener: (evt: Event) => void) => void;
}

export class ExpansionPanelAdapter extends BaseAdapter<IExpansionPanelComponent> implements IExpansionPanelAdapter {
  private _headerElement: HTMLElement;
  private _contentElement: HTMLElement;
  private _headerSlotElement: HTMLSlotElement;

  constructor(component: IExpansionPanelComponent) {
    super(component);
    this._headerElement = getShadowElement(this._component, EXPANSION_PANEL_CONSTANTS.selectors.HEADER);
    this._contentElement = getShadowElement(this._component, EXPANSION_PANEL_CONSTANTS.selectors.CONTENT);
    this._headerSlotElement = getShadowElement(this._component, EXPANSION_PANEL_CONSTANTS.selectors.HEADER_SLOT) as HTMLSlotElement;
  }

  public initialize(open: boolean, orientation = 'vertical'): void {
    const assignedNodes = (this._headerElement.children[0] as HTMLSlotElement).assignedNodes();
    this.setHeaderVisibility(!!assignedNodes.length);

    if (orientation === EXPANSION_PANEL_CONSTANTS.strings.ORIENTATION_HORIZONTAL) {
      this._contentElement.style.height = '';
      this._contentElement.style.width = '0px';
    }

    if (open) {
      if (orientation === 'vertical') {
        this._contentElement.style.height = '';
      } else {
        this._contentElement.style.width = '';
      }
      this._contentElement.style.removeProperty('opacity');
      this._contentElement.style.removeProperty('visibility');
      const openIconElement = this._component.querySelector(EXPANSION_PANEL_CONSTANTS.selectors.OPEN_ICON) as OpenIconComponent;
      if (openIconElement) {
        openIconElement.open = true;
      }
    }

    this._headerElement.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  public setHeaderVisibility(visible: boolean): void {
    if (visible) {
      this._headerElement.style.display = '';
    } else {
      this._headerElement.style.display = 'none';
    }
  }

  public setOpenState(opening: boolean, orientation = EXPANSION_PANEL_CONSTANTS.strings.ORIENTATION_VERTICAL, animate = true): void {
    const assignedNodes = (this._contentElement.children[0] as HTMLSlotElement).assignedNodes();
    const openIconElement = this._component.querySelector(EXPANSION_PANEL_CONSTANTS.selectors.OPEN_ICON) as OpenIconComponent;

    if (animate && assignedNodes && assignedNodes.length && assignedNodes[0]) {
      const transitionEndListener = ({ propertyName }: TransitionEvent): void => {
        // If the state has changed since it started, then ignore the transition
        if (this._component.open !== opening) {
          this._contentElement.removeEventListener('transitionend', transitionEndListener);
          return;
        }
        if (propertyName === 'height' || propertyName === 'width') {
          this._contentElement.removeEventListener('transitionend', transitionEndListener);
          this._contentElement.style.removeProperty('transition');
          if (opening) {
            if (orientation === EXPANSION_PANEL_CONSTANTS.strings.ORIENTATION_HORIZONTAL) {
              this._contentElement.style.width = '';
            } else {
              this._contentElement.style.height = '';
            }
            this._contentElement.style.removeProperty('opacity');
          } else {
            // We set to hidden to ensure that collapsed elements are non-interactive
            this._contentElement.style.visibility = 'hidden';
          }
        }
      };
      this._contentElement.addEventListener('transitionend', transitionEndListener);

      if (opening) {
        if (orientation === EXPANSION_PANEL_CONSTANTS.strings.ORIENTATION_HORIZONTAL) {
          this._contentElement.style.width = '0px';
        } else {
          this._contentElement.style.height = '0px';
        }
        this._contentElement.style.opacity = '0';
        this._contentElement.style.removeProperty('visibility');
      } else {
        if (orientation === EXPANSION_PANEL_CONSTANTS.strings.ORIENTATION_HORIZONTAL) {
          this._contentElement.style.width = `${this._contentElement.scrollWidth}px`;
        } else {
          this._contentElement.style.height = `${this._contentElement.scrollHeight}px`;
        }
        this._contentElement.style.opacity = '1';
      }

      if (orientation === EXPANSION_PANEL_CONSTANTS.strings.ORIENTATION_HORIZONTAL) {
        this._contentElement.style.transition = EXPANSION_PANEL_CONSTANTS.strings.EXPANSION_HORIZONTAL_TRANSITION;
      } else {
        this._contentElement.style.transition = EXPANSION_PANEL_CONSTANTS.strings.EXPANSION_VERTICAL_TRANSITION;
      }

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          if (opening) {
            if (orientation === EXPANSION_PANEL_CONSTANTS.strings.ORIENTATION_HORIZONTAL) {
              this._contentElement.style.width = `${this._contentElement.scrollWidth}px`;
            } else {
              this._contentElement.style.height = `${this._contentElement.scrollHeight}px`;
            }
            this._contentElement.style.opacity = '1';
            this._headerElement.setAttribute('aria-expanded', 'true');
            if (openIconElement) {
              openIconElement.open = true;
            }
          } else {
            if (orientation === EXPANSION_PANEL_CONSTANTS.strings.ORIENTATION_HORIZONTAL) {
              this._contentElement.style.width = '0px';
            } else {
              this._contentElement.style.height = '0px';
            }
            this._contentElement.style.opacity = '0';
            this._headerElement.setAttribute('aria-expanded', 'false');
            if (openIconElement) {
              openIconElement.open = false;
            }
          }
        });
      });
    } else {
      this._contentElement.style.removeProperty('transition');
      if (opening) {
        if (orientation === EXPANSION_PANEL_CONSTANTS.strings.ORIENTATION_HORIZONTAL) {
          this._contentElement.style.width = '';
        } else {
          this._contentElement.style.height = '';
        }
        this._contentElement.style.removeProperty('visibility');
        this._contentElement.style.removeProperty('opacity');
        this._headerElement.setAttribute('aria-expanded', 'true');
        if (openIconElement) {
          openIconElement.open = true;
        }
      } else {
        if (orientation === EXPANSION_PANEL_CONSTANTS.strings.ORIENTATION_HORIZONTAL) {
          this._contentElement.style.width = '0px';
        } else {
          this._contentElement.style.height = '0px';
        }
        this._contentElement.style.opacity = '0';
        this._contentElement.style.visibility = 'hidden';
        this._headerElement.setAttribute('aria-expanded', 'false');
        if (openIconElement) {
          openIconElement.open = false;
        }
      }
    }
  }

  public registerClickListener(listener: (evt: MouseEvent) => void): void {
    this._headerElement.addEventListener('click', listener);
  }

  public deregisterClickListener(listener: (evt: MouseEvent) => void): void {
    this._headerElement.removeEventListener('click', listener);
  }

  public registerKeydownListener(listener: (evt: KeyboardEvent) => void): void {
    this._headerElement.addEventListener('keydown', listener);
  }

  public deregisterKeydownListener(listener: (evt: KeyboardEvent) => void): void {
    this._headerElement.removeEventListener('keydown', listener);
  }

  public registerHeaderSlotListener(listener: (evt: Event) => void): void {
    this._headerSlotElement.addEventListener('slotchange', listener);
  }

  public deregisterHeaderSlotListener(listener: (evt: Event) => void): void {
    this._headerSlotElement.removeEventListener('slotchange', listener);
  }
}
