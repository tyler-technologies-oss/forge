const attributes = {
  DENSITY: 'density',
  FLOAT_LABEL_TYPE: 'float-label-type',
  SHAPE: 'shape',
  INVALID: 'invalid',
  REQUIRED: 'required',
  ADDON_END_ALWAYS_ENABLED: `addon-end-always-enabled`,
  HOST_LABEL_FLOATING: `forge-label-floating`
};

const observedInputAttributes = ['disabled', 'readonly', 'value', 'placeholder'];

const classes = {
  DISABLED: 'forge-field--disabled',
  READONLY: 'forge-field--readonly',
  INPUT_FOCUSED: 'forge-field__input--focused',
  LEADING: 'forge-field--leading',
  TRAILING: 'forge-field--trailing',
  ADDON_END: 'forge-field--addon-end',
  ADDON_END_CONTAINER: 'forge-field__addon-end-container',
  FOCUSED: 'forge-field--focused',
  LABEL_FOCUSED: 'forge-field__label--focused',
  SHAPE_ROUNDED: 'forge-field--shape-rounded',
  INVALID: 'forge-field--invalid',
  REQUIRED: 'forge-field--required',
  DENSE: 'forge-field--dense',
  ROOMY: 'forge-field--roomy',
  LABEL: 'forge-field--label',
  ADDON_END_ALWAYS_ENABLED: 'forge-field__addon-end-container--enabled'
};

export const FIELD_CONSTANTS = {
  attributes,
  observedInputAttributes,
  classes
};

export type FieldDensityType = 'roomy' | 'default' | 'dense';
export type FieldFloatLabelType = 'always' | 'auto';
export type FieldShapeType = 'default' | 'rounded';
