import { IconExternalType, IIconComponent } from '../icon';
import { IPopupPosition, PopupPlacement } from '../popup';

const attributes = {
  POPUP_CLASSES: 'popup-classes',
  OPTION_LIMIT: 'option-limit',
  OBSERVE_SCROLL: 'observe-scroll',
  OBSERVE_SCROLL_THRESHOLD: 'observe-scroll-threshold',
  SYNC_POPUP_WIDTH: 'sync-popup-width',
  CONSTRAIN_POPUP_WIDTH: 'constrain-popup-width',
  WRAP_OPTION_TEXT: 'wrap-option-text',

  // Internal
  CHECKBOX_ELEMENT: 'data-list-dropdown-checkbox',
  DATA_ALLOW_FOCUS: 'data-list-dropdown-allow-focus'
};

const classes = {
  GROUP_WRAPPER: 'forge-list-dropdown__group-wrapper'
};

export const LIST_DROPDOWN_CONSTANTS = {
  attributes,
  classes
};

export type ListDropdownOptionBuilder<T = HTMLElement> = (option: IListDropdownOption, parentElement: T) => HTMLElement | string | void;
export type ListDropdownHeaderBuilder = () => HTMLElement;
export type ListDropdownFooterBuilder = () => HTMLElement;
export type ListDropdownOptionGroupBuilder<T = any> = (option: IListDropdownOptionGroup<T>) => HTMLElement | string;
export type ListDropdownTransformCallback = (label: string) =>  string | HTMLElement;
export type ListDropdownIconType = 'font' | 'component';

export interface IBaseListDropdownOption<T = any> {
  value: T;
  label: string;
  secondaryLabel?: string;
  disabled?: boolean;
  divider?: boolean;
  optionClass?: string | string[];
  leadingIcon?: string;
  leadingIconClass?: string;
  leadingIconType?: ListDropdownIconType;
  leadingIconComponentProps?: Partial<IIconComponent>;
  trailingIcon?: string;
  trailingIconClass?: string;
  trailingIconType?: ListDropdownIconType;
  trailingIconComponentProps?: Partial<IIconComponent>;
  leadingBuilder?: () => HTMLElement;
  trailingBuilder?: () => HTMLElement;
}

export interface IListDropdownOption<T = any> extends IBaseListDropdownOption<T> {
  options?: Array<IListDropdownOption | IListDropdownOptionGroup>;
  elementAttributes?: Map<string, string>;
}

export interface IListDropdownOptionGroup<T = any, K = any> {
  text?: string;
  value?: K;
  builder?: ListDropdownOptionGroupBuilder;
  options: IListDropdownOption<T>[];
}

export interface IListDropdownSelectEventData {
  value: IListDropdownOption | IListDropdownOption[];
}

export interface IListDropdownConfig<T = any> {
  id: string;
  referenceElement: HTMLElement;
  options: Array<IListDropdownOption | IListDropdownOptionGroup>;
  selectCallback: (value: T) => void;
  
  // Optional values
  activeChangeCallback?: (id: string) => void;
  closeCallback?: () => void;
  syncWidth?: boolean;
  constrainViewportWidth?: boolean;
  wrapOptionText?: boolean;
  selectedValues?: T[];
  multiple?: boolean;
  activeStartIndex?: number;
  visibleStartIndex?: number;
  transform?: ListDropdownTransformCallback;
  allowBusy?: boolean;
  asyncStyle?: ListDropdownAsyncStyle;
  iconClass?: string;
  dense?: boolean;
  type?: ListDropdownType;
  popupClasses?: string | string[];
  popupOffset?: IPopupPosition;
  popupStatic?: boolean;
  popupPlacement?: PopupPlacement;
  popupFallbackPlacements?: PopupPlacement[];
  optionLimit?: number;
  optionBuilder?: ListDropdownOptionBuilder;
  observeScroll?: boolean;
  observeScrollThreshold?: number;
  targetWidthCallback?: () => number;
  scrollEndListener?: () => void;
  headerBuilder?: ListDropdownHeaderBuilder;
  footerBuilder?: ListDropdownFooterBuilder;
  cascade?: boolean;
  cascadingElementFactory?: (config: IListDropdownCascadingElementFactoryConfig) => HTMLElement;
}

export interface IListDropdownCascadingElementFactoryConfig {
  index: number;
  options: Array<IListDropdownOption | IListDropdownOptionGroup>;
  parentValue: any;
}

export const DEFAULT_LIST_DROPDOWN_CONFIG: Partial<IListDropdownConfig> = {
  options: [],
  syncWidth: false,
  selectedValues: [],
  multiple: false
};

export interface IListDropdownOpenConfig extends IListDropdownConfig {}

export enum ListDropdownType {
  None = 'none',
  Standard = 'standard',
  Menu = 'menu'
}

export enum ListDropdownAsyncStyle {
  Spinner = 'spinner',
  Skeleton = 'skeleton'
}
