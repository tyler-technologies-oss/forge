import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}key-item`;

const observedAttributes = {
  COLOR: 'color',
  INLINE: 'inline'
};

const attributes = {
  ...observedAttributes
};

const cssCustomProperties = {
  ICON_COLOR: '--forge-key-item-icon-color'
};

export const KEY_ITEM_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  cssCustomProperties
};
