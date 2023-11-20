import { COMPONENT_NAME_PREFIX } from '../../constants';
import { ARIAAttribute } from '../../core/utils/a11y-utils';
import { supportsElementInternalsAria } from '../../core/utils/feature-detection';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}radio`;

const attributes = {
  CHECKED: 'checked',
  DEFAULT_CHECKED: 'default-checked',
  VALUE: 'value',
  DENSE: 'dense',
  DISABLED: 'disabled',
  REQUIRED: 'required',
  READONLY: 'readonly',
  LABEL_POSITION: 'label-position',
  TABINDEX: 'tabindex'
};

const selectors = {
  ROOT: '.forge-radio',
  LABEL: '#label',
  STATE_LAYER: 'forge-state-layer'
};

const events = {
  CHANGE: 'change',
  INPUT: 'input'
};

export const observedAriaAttributes: ARIAAttribute[] = supportsElementInternalsAria()
  ? []
  : [
    'role',
    'aria-checked',
    'aria-disabled',
    'aria-invalid',
    'aria-label',
    'aria-readonly',
    'aria-required'
  ];

export const RADIO_CONSTANTS = {
  elementName,
  attributes,
  selectors,
  events,
  observedAriaAttributes
};

export const tryCheck = Symbol('tryCheck');

export type RadioState = 'checked' | 'unchecked';
export type RadioLabelPosition = 'start' | 'end';
