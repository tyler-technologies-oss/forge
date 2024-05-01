import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}chip-field`;

const observedAttributes = {
  ADD_ON_BLUR: 'add-on-blur'
};

const attributes = {
  ...observedAttributes
};

const selectors = {
  CONTAINER: '.container',
  INPUT: 'input',
  MEMBER_SLOT: 'slot[name=member]',
  MEMBER: '[slot=member]'
};

const classes = {
  HAS_MEMBERS: 'has-members'
};

const events = {
  MEMBER_ADDED: `${elementName}-member-added`,
  MEMBER_REMOVED: `${elementName}-member-removed`
};

const observedInputAttributes = ['disabled', 'placeholder'] as const;

const tagNames = {
  TEXTAREA: 'TEXTAREA',
  LABEL: 'LABEL'
};

export const CHIP_FIELD_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  selectors,
  classes,
  events,
  observedInputAttributes,
  tagNames
};


export {
  type FieldDensity as ChipFieldDensityType,
  type FieldShape as ChipFieldShapeType
} from '../field/base/base-field-constants';

export type ChipFieldObservedInputAttributes = typeof observedInputAttributes[number];
export type ChipFieldInputAttributeObserver = (name: ChipFieldObservedInputAttributes, value: string | null) => void;
export type ChipFieldValueChangeListener = (value: string | null) => void;
