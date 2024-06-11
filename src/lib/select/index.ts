export * from './select-dropdown';
export * from './select';
export * from './select-component-delegate';
export * from './option';
export * from './option-group';
export * from './core';

export interface IOption<T = any> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface IOptionGroup<T = any> {
  text?: string;
  options: Array<IOption<T>>;
}
