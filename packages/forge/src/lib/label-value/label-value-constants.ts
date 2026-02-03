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

export const LABEL_VALUE_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes
};
