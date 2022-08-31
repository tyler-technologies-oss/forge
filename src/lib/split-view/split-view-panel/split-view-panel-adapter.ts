import { getShadowElement, playKeyframeAnimation, toggleAttribute } from '@tylertech/forge-core';

import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { getCursor, getHandleIcon, getSplitViewPanelSibling } from '../core/split-view-core-utils';
import { ISplitViewPanelComponent } from './split-view-panel';
import { ISplitViewPanelCursorConfig, SplitViewPanelPosition, SPLIT_VIEW_PANEL_CONSTANTS } from './split-view-panel-constants';
import { SplitViewOrientation, SPLIT_VIEW_CONSTANTS } from '../split-view/split-view-constants';
import { ISplitViewComponent } from '../split-view/split-view';
import { IIconComponent } from '../../icon';
import { IRippleComponent } from '../../ripple';

export interface ISplitViewPanelAdapter extends IBaseAdapter {
  initialize(): void;
  setPointerdownListener(listener: (evt: PointerEvent) => void): void;
  setPointerupListener(listener: (evt: PointerEvent) => void): void;
  removePointerupListener(listener: (evt: PointerEvent) => void): void;
  setPointermoveListener(listener: (evt: PointerEvent) => void): void;
  removePointermoveListener(listener: (evt: PointerEvent) => void): void;
  setKeydownListener(listener: (evt: KeyboardEvent) => void): void;
  setKeyupListener(listener: (evt: KeyboardEvent) => void): void;
  removeKeyupListener(listener: (evt: KeyboardEvent) => void): void;
  getParentProperty(name: keyof ISplitViewComponent): unknown;
  setAccessibleLabel(value: string): void;
  setDisabled(value: boolean): void;
  setPosition(value: SplitViewPanelPosition): void;
  setOrientation(value: SplitViewOrientation): void;
  setOpen(value: boolean, withAnimation?: boolean): void;
  setGrabbed(value: boolean): void;
  setHandleCursor(orientation: SplitViewOrientation, config?: ISplitViewPanelCursorConfig): void;
  setBodyCursor(orientation: SplitViewOrientation, config?: ISplitViewPanelCursorConfig): void;
  getContentSize(orientation: SplitViewOrientation): number;
  setContentSize(value: number): void;
  setValue(value: number): void;
  focusHandle(): void;
  getAvailableSpace(orientation: SplitViewOrientation, position: SplitViewPanelPosition): number;
  getSiblingContentSize(): number;
  setSiblingContentSize(value: number): void;
  getParentSize(orientation: SplitViewOrientation): number;
  updateParentAccessibility(): void;
  setParentCursors(): void;
  activateRipple(defaultActivated: boolean): void;
  deactivateRipple(): void;
}

export class SplitViewPanelAdapter extends BaseAdapter<ISplitViewPanelComponent> implements ISplitViewPanelAdapter {
  private _root: HTMLElement;
  private _handle: HTMLElement;
  private _icon: IIconComponent;
  private _ripple: IRippleComponent;
  private _content: HTMLElement;
  private _parent?: ISplitViewComponent;

  constructor(component: ISplitViewPanelComponent) {
    super(component);
    this._root = getShadowElement(component, SPLIT_VIEW_PANEL_CONSTANTS.selectors.ROOT);
    this._handle = getShadowElement(component, SPLIT_VIEW_PANEL_CONSTANTS.selectors.HANDLE);
    this._icon = getShadowElement(component, SPLIT_VIEW_PANEL_CONSTANTS.selectors.ICON) as IIconComponent;
    this._ripple = getShadowElement(component, SPLIT_VIEW_PANEL_CONSTANTS.selectors.RIPPLE) as IRippleComponent;
    this._content = getShadowElement(component, SPLIT_VIEW_PANEL_CONSTANTS.selectors.CONTENT);
  }

  public initialize(): void {
    // Set the parent split view
    const parent = this._component.parentElement;
    if (parent?.tagName.toLowerCase() === SPLIT_VIEW_CONSTANTS.elementName) {
      this._parent = parent as ISplitViewComponent;
    }
  }

  public setPointerdownListener(listener: (evt: PointerEvent) => void): void {
    this._handle.addEventListener('pointerdown', listener);
  }

  public setPointerupListener(listener: (evt: PointerEvent) => void): void {
    document.addEventListener('pointerup', listener);
  }

  public removePointerupListener(listener: (evt: PointerEvent) => void): void {
    document.removeEventListener('pointerup', listener);
  }

  public setPointermoveListener(listener: (evt: PointerEvent) => void): void {
    document.addEventListener('pointermove', listener);
  }

  public removePointermoveListener(listener: (evt: PointerEvent) => void): void {
    document.removeEventListener('pointermove', listener);
  }

  public setKeydownListener(listener: (evt: KeyboardEvent) => void): void {
    this._handle.addEventListener('keydown', listener);
  }

  public setKeyupListener(listener: (evt: KeyboardEvent) => void): void {
    this._handle.addEventListener('keyup', listener);
  }

  public removeKeyupListener(listener: (evt: KeyboardEvent) => void): void {
    this._handle.removeEventListener('keyup', listener);
  }

  /**
   * Gets the specified property value from the parent split view.
   * @param name The property name.
   * @returns The value of the property.
   */
  public getParentProperty(name: keyof ISplitViewComponent): unknown {
    return this._parent?.[name];
  }

  /**
   * Sets the accessible label of the resize handle.
   * @param value The label text.
   */
  public setAccessibleLabel(value: string): void {
    this._handle.setAttribute('aria-label', value);
  }

  /**
   * Sets the disabled state of the component.
   * @param value Whether the component is disabled.
   */
  public setDisabled(value: boolean): void {
    this._root.classList.toggle(SPLIT_VIEW_PANEL_CONSTANTS.classes.DISABLED, value);
    if (this._handle) {
      this._handle.setAttribute('tabindex', value ? '-1' : '0');
      toggleAttribute(this._handle, value, 'aria-disabled', 'true');
    }
  }

  /**
   * Sets the position of the component including its ARIA attributes and the DOM order of
   * elements.
   * @param value The component's position.
   */
  public setPosition(value: SplitViewPanelPosition): void {
    this._root.setAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.POSITION, value.toString());
    toggleAttribute(this._handle, value !== 'default', 'aria-valuemin', '0');
    toggleAttribute(this._handle, value !== 'default', 'aria-valuemax', '100');

    if (value === 'default') {
      return;
    }

    this._handle.remove();
    if (value === 'start') {
      // Place the handle after the content
      this._root.append(this._handle);
    } else {
      // Place the handle before the content
      this._root.prepend(this._handle);
    }
  }

  /**
   * Sets the orientation of the component including ARIA attributes and the resize handle icon.
   * @param value The component's orientation.
   */
  public setOrientation(value: SplitViewOrientation): void {
    this._root.setAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.ORIENTATION, value);
    // The divider's orientation is perpendicular to the layout of the component
    this._handle.setAttribute('aria-orientation', value === 'horizontal' ? 'vertical' : 'horizontal');
    this._icon.setAttribute('name', getHandleIcon(value));
  }

  /**
   * Opens or closes the component.
   * @param value Whether the component is open.
   * @param withAnimation Whether to use the animation. Defaults to `true`.
   */
  public setOpen(value: boolean, withAnimation = true): void {
    if (value && this._root.classList.contains(SPLIT_VIEW_PANEL_CONSTANTS.classes.CLOSED)) {
      this._root.classList.remove(SPLIT_VIEW_PANEL_CONSTANTS.classes.CLOSED);

      if (!withAnimation) {
        this._parent?.updateSlottedPanelsAccessibility(this._component);
        this.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.DID_OPEN);
        return;
      }

      this._parent?.layerSlottedPanels(this._component);
      playKeyframeAnimation(this._root, SPLIT_VIEW_PANEL_CONSTANTS.classes.OPENING, true).then(() => {
        this._parent?.unlayerSlottedPanels();
        this._parent?.updateSlottedPanelsAccessibility(this._component);
        this.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.DID_OPEN);
      });
    } else if (!value && !this._root.classList.contains(SPLIT_VIEW_PANEL_CONSTANTS.classes.CLOSED)) {

      if (!withAnimation) {
        this._root.classList.add(SPLIT_VIEW_PANEL_CONSTANTS.classes.CLOSED);
        this._parent?.updateSlottedPanelsAccessibility(this._component);
        this.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.DID_CLOSE);
        return;
      }

      this._parent?.layerSlottedPanels(this._component);
      playKeyframeAnimation(this._root, SPLIT_VIEW_PANEL_CONSTANTS.classes.CLOSING, true).then(() => {
        this._root.classList.add(SPLIT_VIEW_PANEL_CONSTANTS.classes.CLOSED);
        this._parent?.unlayerSlottedPanels();
        this._parent?.updateSlottedPanelsAccessibility(this._component);
        this.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.DID_CLOSE);
      });
    }
  }

  /**
   * Sets the components appearance and accessibility to indicated whether it is currently grabbed
   * by the user. Applies a cursor style to the document body.
   * @param value Whether the component is currently being resized via pointer interaction.
   */
  public setGrabbed(value: boolean): void {
    this._root.classList.toggle(SPLIT_VIEW_PANEL_CONSTANTS.classes.GRABBED, value);
    this._handle.setAttribute('aria-grabbed', value.toString());
    this._parent?.unsetSlottedPanelsCursors();

    if (!value) {
      document.body.style.removeProperty('cursor');
    }
  }

  /**
   * Applies a cursor style to the resize handle. 
   * @param orientation The component's orientation.
   * @param config The component's position and whether it's at the min or max value.
   */
  public setHandleCursor(orientation: SplitViewOrientation, config?: ISplitViewPanelCursorConfig): void {
    this._root.style.setProperty(SPLIT_VIEW_PANEL_CONSTANTS.customCssProperties.CURSOR, getCursor(orientation, config));
  }

  /**
   * Applies a cursor style to the document body.
   * @param orientation The component's orientation.
   * @param config The component's position and whether it's at the min or max value.
   */
  public setBodyCursor(orientation: SplitViewOrientation, config?: ISplitViewPanelCursorConfig): void {
    document.body.style.setProperty('cursor', getCursor(orientation, config));
  }

  /**
   * Gets the size of the content along the orientation axis. Does not include the resize handle.
   * @param orientation The component's orientation.
   * @returns The width or height of the content in pixels.
   */
  public getContentSize(orientation: SplitViewOrientation): number {
    return orientation === 'horizontal' ? this._content.clientWidth : this._content.clientHeight;
  }

  /**
   * Sets the size of the content not including the resize handle.
   * @param value The width or height of the content in pixels.
   */
  public setContentSize(value: number): void {
    this._component.style.setProperty(SPLIT_VIEW_PANEL_CONSTANTS.customCssProperties.SIZE, `${value}px`);
  }

  /**
   * Sets the ARIA attribute representing the size of the content compared to its min and max.
   * @param value The content size scaled from 0 to 100.
   */
  public setValue(value: number): void {
    this._handle.setAttribute('aria-valuenow', value.toFixed(2));
  }

  /**
   * Sets focus on the handle element.
   */
  public focusHandle(): void {
    this._handle.focus();
  }

  /**
   * Gets the amount of space that the component is allowed to take. This includes the current
   * size of the component and the size of the sibling it resizes into along the axis of
   * orientation. The sibling's min and max values are taken into account but the component's are
   * not.
   * @param orientation The component's orientation.
   * @param position The component's position.
   * @returns The amount of space available for the component to resize into in pixels.
   */
  public getAvailableSpace(orientation: SplitViewOrientation, position: SplitViewPanelPosition): number {
    if (position === 'default') {
      // Return -1 if the panel is static (i.e. can't be user resized)
      return -1;
    }
    const sibling = getSplitViewPanelSibling(this._component);
    if (sibling) {
      const siblingSize = sibling.getCollapsibleSize();
      return siblingSize + this.getContentSize(orientation);
    } else {
      return this.getParentSize(orientation);
    }
  }

  /**
   * Gets the content size of the sibling panel the component resizes into along its axis of
   * orientation.
   * @returns The sibling's content size in pixels or 0 if the sibling does not exist.
   */
  public getSiblingContentSize(): number {
    const sibling = getSplitViewPanelSibling(this._component);
    return sibling?.getContentSize() ?? 0;
  }

  /**
   * Sets the content size of the sibling panel the component resizes into along its axis of
   * orientation.
   * @returns The sibling's content size in pixels.
   */
  public setSiblingContentSize(value: number): void {
    const sibling = getSplitViewPanelSibling(this._component);
    sibling?.setContentSize(value);
  }

  /**
   * Gets the size of the parent split view along the axis of orientation.
   * @param orientation The component's orientation.
   * @returns The parent's size in pixels.
   */
  public getParentSize(orientation: SplitViewOrientation): number {
    const parentSize = orientation === 'horizontal' ? this._parent?.clientWidth : this._parent?.clientHeight;
    return parentSize ?? 0;
  }

  /**
   * Prompts the parent split view to notify all split view panels to recalculate and reset
   * accessibility attributes.
   */
  public updateParentAccessibility(): void {
    this._parent?.updateSlottedPanelsAccessibility(this._component);
  }

  /**
   * Prompts the parent split view to notify all split view panels to set the appropriate cursor.
   */
  public setParentCursors(): void {
    this._parent?.setSlottedPanelsCursors();
  }

  /**
   * Runs the ripple animation.
   * @param defaultActivated Whether the ripple starts from and should end in an activated state.
   */
  public activateRipple(defaultActivated: boolean): void {
    if (defaultActivated) {
      this._ripple.deactivate();
      // Wait a short amount of time so the animation is distinguishable
      window.setTimeout(() => {
        this._ripple.activate();
      }, SPLIT_VIEW_PANEL_CONSTANTS.numbers.RIPPLE_ACTIVATION_WAIT);
    } else {
      this._ripple.activate();
      this._ripple.deactivate();
    }
  }

  /**
   * Deactivates the ripple.
   */
  public deactivateRipple(): void {
    this._ripple.deactivate();
  }
}
