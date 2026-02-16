export * from './select-dropdown/index.js';
export * from './select/index.js';
export * from './select-component-delegate.js';
export * from './option/index.js';
export * from './option-group/index.js';
export * from './core/index.js';

export interface IOption<T = any> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface IOptionGroup<T = any> {
  text?: string;
  options: Array<IOption<T>>;
}
