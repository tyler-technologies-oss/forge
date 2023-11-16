/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Adapted and influenced from [Material Web](https://github.com/material-components/material-web).
 * The original source code can be found at: [GitHub](https://github.com/material-components/material-web/blob/main/labs/behaviors/focusable.ts)
 */

import { isFocusable, MixinBase, MixinReturn } from '../../constants';
import { BaseComponent, IBaseComponent } from './base-component';

/**
 * An element that can enable and disable `tabindex` focusability.
 */
export interface IBaseFocusableComponent extends IBaseComponent {
  /**
   * Whether or not the element can be focused. Defaults to true. Set to false
   * to disable focusing (unless a user has set a `tabindex`).
   */
  [isFocusable]: boolean;

  connectedCallback(): void;
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}

const _privateIsFocusable = Symbol('privateIsFocusable');
const _externalTabIndex = Symbol('externalTabIndex');
const _isUpdatingTabIndex = Symbol('isUpdatingTabIndex');
const _updateTabIndex = Symbol('updateTabIndex');

/**
 * Mixes in focusable functionality into a base component.
 * 
 * @param base The base component to mix into.
 * @returns The mixed-in base component.
 */
export function WithFocusable<T extends MixinBase<BaseComponent>>(base: T): MixinReturn<T, IBaseFocusableComponent> {
  abstract class FocusableComponent extends base implements IBaseFocusableComponent {
    public get [isFocusable](): boolean {
      return this[_privateIsFocusable];
    }
  
    /**
     * Whether or not the element can be focused.
     * 
     * Set this from inheriting components **instead** of directly manipulating `tabIndex`.
     */
    public set [isFocusable](value: boolean) {
      if (this[isFocusable] === value) {
        return;
      }
      this[_privateIsFocusable] = value;
      this[_updateTabIndex]();
    }
  
    private [_privateIsFocusable] = false;
    private [_externalTabIndex]: number | null = null; // Allows for external tabIndex to be stored when internal tabIndex is set to -1
    private [_isUpdatingTabIndex] = false; // Allows for internal tabIndex to be set without triggering attributeChangedCallback

    public connectedCallback(): void {
      // This must be set in the connectedCallback to avoid sprouting a tabindex attribute on the host from the ctor
      this[isFocusable] = true;
    }
  
    public attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
      if (name !== 'tabindex' || this[_isUpdatingTabIndex]) {
        return;
      }
  
      if (!this.hasAttribute('tabindex')) {
        // User removed the attribute, can now use internal tabIndex
        this[_externalTabIndex] = null;
        this[_updateTabIndex]();
        return;
      }
  
      this[_externalTabIndex] = this.tabIndex;
    }

    private [_updateTabIndex](): void {
      const internalTabIndex = this[isFocusable] ? 0 : -1;
      const computedTabIndex = this[_externalTabIndex] ?? internalTabIndex;
      // const computedTabIndex = internalTabIndex === 0 ? this[_externalTabIndex] ?? internalTabIndex : internalTabIndex;
  
      this[_isUpdatingTabIndex] = true;
      this.tabIndex = computedTabIndex;
      this[_isUpdatingTabIndex] = false;
    }
  }
  return FocusableComponent;
}

/**
 * Provides focusable functionality for an element.
 *
 * Elements can enable and disable their focusability with the `isFocusable`
 * symbol property. **Use this instead of changing `tabIndex` directly.**
 *
 * This will preserve externally-set tabindices. If an element sets `tabindex="-1"`,
 * but a user sets `tabindex="0"`, it will still be focusable.
 *
 * To remove user overrides and restore focus control to the element, remove the `tabindex` attribute.
 */
export abstract class BaseFocusableComponent extends WithFocusable(BaseComponent) implements IBaseFocusableComponent {}
