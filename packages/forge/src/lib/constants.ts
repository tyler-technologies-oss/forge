import type { IBaseComponent } from './core/base/base-component';
import { supportsHover } from './core/utils/feature-detection';

export const COMPONENT_NAME_PREFIX = 'forge-';
export const KEYSTROKE_DEBOUNCE_THRESHOLD = 500;
export const ICON_CLASS_NAME = 'tyler-icons';
export const CDN_BASE_URL = 'https://cdn.forge.tylertech.com/';
export const canUserHoverElements = supportsHover();
export const DEFERRED_LABEL_TARGET = 'data-forge-deferred-label-target';

/** A method symbol that gets the submitted value of a form-associated component. */
export const getFormValue = Symbol('getFormValue');

/** A method symbol that gets the form state of a form-associated component. */
export const getFormState = Symbol('getFormState');

/** A method symbol that sets the validity of a form-associated component. */
export const setValidity = Symbol('setValidity');

/** A method symbol that gets the validation message of a form-associated component. */
export const getValidationMessage = Symbol('getValidityMessage');

/** A property symbol that references the `ElementInternals` instance of an element. */
export const internals = Symbol('ElementInternals');

/**
 * A property symbol that sets the type of an internal input element used to create
 * validation messages
 */
export const inputType = Symbol('inputType');

/** A property symbol that indicates whether or not a `Focusable` element can be focused. */
export const isFocusable = Symbol('isFocusable');

/**
 * A method symbol that sets default ARIA on the `ElementInternals` instance of an element if
 * supported or sprouts attributes if not.
 */
export const setDefaultAria = Symbol('setDefaultAria');

/**
 * A method symbol that attempts to set a component's target element.
 */
export const updateTarget = Symbol('updateTarget');

/**
 * A symbol used to store a reference to the label of a component that has not yet been upgraded.
 */
export const forgeLabelRef = Symbol('forgeLabelRef');

export type Theme = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error' | 'info';
export type Density = 'small' | 'medium' | 'large';

export type AbstractConstructor<T> = abstract new (...args: any[]) => T;
export type MixinBase<TBase = IBaseComponent> = AbstractConstructor<TBase>;

/**
 * The `focusVisible` property is an experimental feature that is not yet supported by all browsers.
 *
 * We will use this to allow for setting focus to elements programmatically and showing the focus indicator.
 */
export type ExperimentalFocusOptions = FocusOptions & { focusVisible?: boolean };
