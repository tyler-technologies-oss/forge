import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}label-value`;

const observedAttributes = {
  EMPTY: 'empty',
  ELLIPSIS: 'ellipsis',
  INLINE: 'inline',
  /** @deprecated Use `inset` instead. */
  DENSE: 'dense'
};

const attributes = {
  ...observedAttributes
};

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const LABEL_VALUE_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes
};
