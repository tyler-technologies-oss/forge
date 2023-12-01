import { COMPONENT_NAME_PREFIX } from '../../constants';
import { ARIAAttribute } from '../../core/utils/a11y-utils';
import { supportsElementInternalsAria } from '../../core/utils/feature-detection';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}radio-group`;

const attributes = {
  DISABLED: 'disabled'
};

const observedAriaAttributes: ARIAAttribute[] = supportsElementInternalsAria()
  ? []
  : ['role', 'aria-disabled', 'aria-label'];

export const RADIO_GROUP_CONSTANTS = {
  elementName,
  attributes,
  observedAriaAttributes
};
