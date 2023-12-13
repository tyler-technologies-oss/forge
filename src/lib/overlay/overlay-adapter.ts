import { autoUpdate } from '@floating-ui/dom';
import { deepQuerySelectorAll, getShadowElement, positionElementAsync } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter, locateTargetHeuristic, replaceElement } from '../core';
import { IOverlayComponent } from './overlay';
import { CAN_USE_POPOVER, IOverlayOffset, OverlayPlacement, OverlayPositionStrategy, OverlayToggleEvent, OVERLAY_CONSTANTS } from './overlay-constants';

export interface IOverlayAdapter extends IBaseAdapter {
  setOpen(value: boolean): void;
  locateTargetElement(id: string | null): HTMLElement | null;
  positionElement(config: IPositionElementConfig): void;
  tryCleanupAutoUpdate(): void;
  addPopoverLightDismissListener(listener: EventListener): void;
  removePopoverLightDismissListener(listener: EventListener): void;
  addDialogLightDismissListener(listener: EventListener | (() => void)): void;
  removeDialogLightDismissListener(listener: EventListener): void;
  addCustomLightDismissListener(listener: () => void): void;
  removeCustomLightDismissListener(): void;
  setDialog(value: boolean): void;
  isMostRecentOpenOverlay(): boolean;
}

export interface IPositionElementConfig {
  targetElement: HTMLElement;
  strategy: OverlayPositionStrategy;
  placement: OverlayPlacement;
  hide: boolean;
  offset: IOverlayOffset;
  shift: boolean;
  auto: boolean;
  flip: boolean;
}

declare global {
  interface HTMLElement {
    popover: 'manual' | 'auto' | null | undefined;
    showPopover(): void;
    hidePopover(): void;
    togglePopover(): boolean;
  }
}

export class OverlayAdapter extends BaseAdapter<IOverlayComponent> implements IOverlayAdapter {
  private _rootElement: HTMLElement | HTMLDialogElement;
  private _autoUpdateCleanup: undefined | (() => void);
  private _lightDismissCleanup: undefined | (() => void);
  private _dialogLightDismissCleanup: undefined | (() => void);

  constructor(component: IOverlayComponent) {
    super(component);
    this._rootElement = getShadowElement(component, OVERLAY_CONSTANTS.selectors.ROOT);
  }

  public setOpen(value: boolean): void {
    if (value) {
      if (!this._component.inline && CAN_USE_POPOVER) {
        if (this._component.modal && this._rootElement.tagName === 'DIALOG') {
          this._rootElement.removeAttribute('popover');
          (this._rootElement as HTMLDialogElement).showModal();
        } else {
          this._rootElement.popover = this._component.static ? 'manual' : 'auto';
          this._rootElement.showPopover();
        }
      } else {
        this._rootElement.removeAttribute('popover');
      }
    } else {
      this.tryCleanupAutoUpdate();
      if (this._rootElement.tagName === 'DIALOG') {
        (this._rootElement as HTMLDialogElement).close();
      } else if (CAN_USE_POPOVER && this._rootElement.matches(':popover-open')) {
        this._rootElement.hidePopover();
      }
      this._component.removeAttribute(OVERLAY_CONSTANTS.attributes.POSITION_PLACEMENT);
    }
  }

  public locateTargetElement(id: string | null): HTMLElement | null {
    return locateTargetHeuristic(this._component, id);
  }

  public positionElement({ targetElement, strategy, placement, hide, offset, shift, auto, flip }: IPositionElementConfig): void {
    this.tryCleanupAutoUpdate();
    const originalOffset = { ...offset };
    
    this._autoUpdateCleanup = autoUpdate(targetElement, this._rootElement, async () => {
      const offsetOptions = { ...originalOffset };

      // If we have an arrow element and an offset, we need to adjust the current offset to account for the arrow
      if (this._component.arrowElement && typeof this._component.arrowElementOffset === 'number') {
        if (offsetOptions.mainAxis == null) {
          offsetOptions.mainAxis = 0;
        }
        offsetOptions.mainAxis += this._component.arrowElementOffset;
      }

      const result = await positionElementAsync({
        element: this._rootElement,
        targetElement,
        strategy,
        placement,
        hide,
        shift,
        auto,
        flip: !auto && flip,
        flipOptions: {
          fallbackAxisSideDirection: 'start'
        },
        arrowElement: this._component.arrowElement,
        topLayer: !this._component.inline && CAN_USE_POPOVER,
        offset: Boolean(offsetOptions),
        offsetOptions,
        transform: false
      });

      const side = result.placement.split('-')[0];
      const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[side];
      if (staticSide) {
        // Update the dynamic position "side" via an attribute to allow for state-based position adjustments
        this._component.setAttribute(OVERLAY_CONSTANTS.attributes.POSITION_PLACEMENT, result.placement);
      }

      // Position our optional arrow element
      if (this._component.arrowElement && result.arrow) {
        const { x: arrowX, y: arrowY } = result.arrow;
        const arrowLen = this._component.arrowElement.offsetWidth;
        Object.assign(this._component.arrowElement.style, {
          top: arrowY != null ? `${arrowY}px` : '',
          left: arrowX != null ? `${arrowX}px` : '',
          [staticSide as string]: `${-arrowLen / 2}px`
        });
      }
    });
  }

  public tryCleanupAutoUpdate(): void {
    if (typeof this._autoUpdateCleanup === 'function') {
      this._autoUpdateCleanup();
      this._autoUpdateCleanup = undefined;
    }
  }

  public addPopoverLightDismissListener(listener: EventListener): void {
    this._rootElement.addEventListener('toggle', listener);
  }

  public removePopoverLightDismissListener(listener: EventListener): void {
    this._rootElement.removeEventListener('toggle', listener);
  }

  public addDialogLightDismissListener(listener: EventListener | (() => void)): void {
    if (this._dialogLightDismissCleanup) {
      this.removeDialogLightDismissListener();
    }

    this._rootElement.addEventListener('cancel', listener);

    const backdropClickListener = ({ clientX, clientY }: PointerEvent): void => {
      const rect = this._rootElement.getBoundingClientRect();
      if (clientY < rect.top || clientY > rect.bottom || clientX < rect.left || clientX > rect.right) {
        (listener as () => void)();
      }
    };
    this._rootElement.addEventListener('click', backdropClickListener);
    this._dialogLightDismissCleanup = () => {
      this._rootElement.removeEventListener('cancel', listener);
      this._rootElement.removeEventListener('pointerup', backdropClickListener);
    };
  }

  public removeDialogLightDismissListener(): void {
    this._dialogLightDismissCleanup?.();
    this._dialogLightDismissCleanup = undefined;
  }

  public addCustomLightDismissListener(listener: () => void): void {
    if (this._lightDismissCleanup) {
      this.removeCustomLightDismissListener();
    }
    this._initializeLightDismiss(listener);
  }

  public removeCustomLightDismissListener(): void {
    this._lightDismissCleanup?.();
    this._lightDismissCleanup = undefined;
  }

  public setDialog(value: boolean): void {
    const newElement = value ? this._createDialogElement() : this._createDefaultElement();
    replaceElement(this._rootElement, newElement);
    this._rootElement = newElement;
  }

  private _createDialogElement(): HTMLDialogElement {
    const dialogEl = document.createElement('dialog');
    dialogEl.classList.add(OVERLAY_CONSTANTS.classes.OVERLAY);
    dialogEl.setAttribute('part', 'container');
    return dialogEl;
  }

  private _createDefaultElement(): HTMLElement {
    const divEl = document.createElement('div');
    divEl.classList.add(OVERLAY_CONSTANTS.classes.OVERLAY);
    divEl.setAttribute('part', 'container');
    return divEl;
  }

  /**
   * Finds all open overlays in the document and returns `true` if our overlay is the most recently opened instance.
   */
  public isMostRecentOpenOverlay(): boolean {
    const allOpenOverlays = deepQuerySelectorAll(this._component.ownerDocument.body, OVERLAY_CONSTANTS.selectors.OPEN_OVERLAYS);
    return allOpenOverlays[allOpenOverlays.length - 1] === this._component;
  }

  /**
   * Custom light dismiss. This attempts to mimic the default behavior of popover=auto for non-:top-layer elements.
   * 
   * @param listener The event listener to call when the overlay should be closed.
   */
  private _initializeLightDismiss(listener: EventListener): void {
    const escapeListener = ({ key }: KeyboardEvent): void => {
      if (key === 'Escape') {
        if (this.isMostRecentOpenOverlay()) {
          listener({ newState: 'closed' } as OverlayToggleEvent);
        }
      }
    };
    this._component.ownerDocument.addEventListener('keydown', escapeListener);

    const pointerupListener = (evt: PointerEvent): void => {
      const composedPath = evt.composedPath();
      const isExternal = !composedPath.includes(this._component.targetElement) && !composedPath.includes(this._rootElement);
      if (isExternal) {
        listener({ newState: 'closed' } as OverlayToggleEvent);
      }
    };
    this._component.ownerDocument.addEventListener('pointerup', pointerupListener, { capture: true });

    this._lightDismissCleanup = () => {
      this._component.ownerDocument.removeEventListener('keydown', escapeListener);
      this._component.ownerDocument.removeEventListener('pointerup', pointerupListener, { capture: true });
    };
  }
}
