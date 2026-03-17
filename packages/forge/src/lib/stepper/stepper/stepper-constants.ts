import { COMPONENT_NAME_PREFIX } from '../../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}stepper`;

const classes = {
  STEPPER: 'forge-stepper',
  LINEAR: 'linear',
  ALTERNATIVE: 'alternative',
  CLUSTERED: 'clustered',
  FIXED: 'fixed',
  ALIGN_LEFT: 'align-left',
  ALIGN_CENTER: 'align-center',
  ALIGN_RIGHT: 'align-right',
  VERTICAL: 'vertical',
  FOCUSED: 'focused'
};

const selectors = {
  STEPPER: `.${classes.STEPPER}`
};

const attributes = {
  SELECTED_INDEX: 'selected-index',
  LINEAR: 'linear',
  ALTERNATIVE: 'alternative',
  LAYOUT_MODE: 'layout-mode',
  LAYOUT_ALIGN: 'layout-align',
  DISABLED: 'disabled',
  VERTICAL: 'vertical'
};

const strings = {
  ARROW_LEFT_KEY: 'ArrowLeft',
  ARROW_RIGHT_KEY: 'ArrowRight',
  ARROW_UP_KEY: 'ArrowUp',
  ARROW_DOWN_KEY: 'ArrowDown',
  END_KEY: 'End',
  ENTER_KEY: 'Enter',
  HOME_KEY: 'Home',
  SPACE_KEY: 'Space',
  TAB_KEY: 'Tab'
};

const numbers = {
  ARROW_LEFT_KEYCODE: 37,
  ARROW_RIGHT_KEYCODE: 39,
  END_KEYCODE: 35,
  HOME_KEYCODE: 36,
  ENTER_KEYCODE: 13,
  SPACE_KEYCODE: 32
};

const ACCEPTABLE_KEYS = [
  strings.ARROW_LEFT_KEY,
  strings.ARROW_RIGHT_KEY,
  strings.ARROW_DOWN_KEY,
  strings.ARROW_UP_KEY,
  strings.END_KEY,
  strings.HOME_KEY,
  strings.ENTER_KEY,
  strings.SPACE_KEY,
  strings.TAB_KEY
];

const KEYCODE_MAP: Record<number, string> = {
  [numbers.ARROW_LEFT_KEYCODE]: strings.ARROW_LEFT_KEY,
  [numbers.ARROW_RIGHT_KEYCODE]: strings.ARROW_RIGHT_KEY,
  [numbers.END_KEYCODE]: strings.END_KEY,
  [numbers.HOME_KEYCODE]: strings.HOME_KEY,
  [numbers.ENTER_KEYCODE]: strings.ENTER_KEY,
  [numbers.SPACE_KEYCODE]: strings.SPACE_KEY
};

export const STEPPER_CONSTANTS = {
  elementName,
  classes,
  selectors,
  attributes,
  numbers,
  strings,
  ACCEPTABLE_KEYS,
  KEYCODE_MAP
};

export interface IStepConfiguration {
  label: string;
  optionalLabel?: string;
  editable?: boolean;
  completed?: boolean;
  error?: boolean;
  disabled?: boolean;
  vertical?: boolean;
  expanded?: boolean;
  ignoreUserExpansion?: boolean;
}

export interface IStepperConfiguration {
  steps: IStepConfiguration[];
  selectedIndex: number;
  linear: boolean;
  alternative: boolean;
  layoutMode: StepperLayoutMode;
  layoutAlign: StepperLayoutAlign;
  vertical?: boolean;
}

export type StepperLayoutMode = 'fixed' | 'clustered';
export type StepperLayoutAlign = 'left' | 'center' | 'right';
