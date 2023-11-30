import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}field`;

const attributes = {
  LABEL_POSITION: 'label-position',
  LABEL_ALIGNMENT: 'label-alignment',
  INVALID: 'invalid',
  REQUIRED: 'required',
  DISABLED: 'disabled',
  NO_BORDER: 'no-border',
  THEME: 'theme',
  DENSITY: 'density',
  DENSE: 'dense'
};

export const FIELD_CONSTANTS = {
  elementName,
  attributes
};

export type FieldLabelPosition = 'inline-start' | 'inline-end' | 'block-start' | 'inset' | 'none';
export type FieldLabelAlignment = 'centered' | 'baseline' | 'start' | 'end';
