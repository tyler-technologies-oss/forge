export const COMPONENT_NAME_PREFIX = 'forge-';
export const KEYSTROKE_DEBOUNCE_THRESHOLD = 500;
export const ICON_CLASS_NAME = 'tyler-icons';
export const CDN_BASE_URL = 'https://cdn.forge.tylertech.com/';

/** A property symbol that references the `ElementInternals` instance of an element. */
export const internals = Symbol('ElementInternals');

/** A property symbol that indicates whether or not a `Focusable` element can be focused. */
export const isFocusable = Symbol('isFocusable');

/**
 * A method symbol that sets default ARIA on the `ElementInternals` instance of an element if
 * supported or sprouts attributes if not.
 */
export const setDefaultAria = Symbol('setDefaultAria');

export type Theme = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error' | 'info';
export type Density = 'small' | 'medium' | 'large';

export type MixinBase<ExpectedBase = object> = abstract new (...args: any[]) => ExpectedBase;
export type MixinReturn<TBase extends MixinBase, MixinClass = object> = (abstract new (...args: any[]) => MixinClass) & TBase;

/**
 * The `focusVisible` property is an experimental feature that is not yet supported by all browsers.
 * 
 * We will use this to allow for setting focus to elements programmatically and showing the focus indicator.
 */
export type ExperimentalFocusOptions = FocusOptions & { focusVisible?: boolean };
