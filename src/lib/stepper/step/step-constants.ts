import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}step`;

const classes = {
  STEP: 'forge-step',
  STEP_CONTAINER: 'container',
  ERROR: 'error',
  SELECTED: 'selected',
  COMPLETED: 'completed',
  EDITABLE: 'editable',
  ALTERNATIVE: 'alternative',
  ICON_CONTENT: 'icon-content',
  ICON: 'icon',
  LABEL_CONTAINER: 'label-container',
  LABEL: 'label',
  OPTIONAL_LABEL: 'optional-label',
  INDEX: 'index',
  CLUSTERED: 'clustered',
  DISABLED: 'disabled',
  VERTICAL: 'vertical',
  EXPANDED: 'expanded',
  EXPANDABLE: 'expandable',
  EXPANSION_PANEL: 'expansion-panel',
  EXPANSION_ICON: 'expanded-icon',
  EXPANSION_ICON_EXPANDED: 'expanded-icon--expanded',
  EXPANSION_CONTENT: 'expansion-content'
};

const attributes = {
  SELECTED: `selected`,
  INDEX: `index`,
  EDITABLE: `editable`,
  COMPLETED: `completed`,
  ERROR: `error`,
  ALTERNATIVE: 'alternative',
  FIRST: 'first',
  LAST: 'last',
  ARIA_SELECTED: 'aria-selected',
  CLUSTERED: `clustered`,
  DISABLED: 'disabled',
  VERTICAL: 'vertical',
  EXPANDED: 'expanded',
  EXPANDABLE: 'expandable',
  IGNORE_USER_EXPANSION: 'ignore-user-expansion'
};

const selectors = {
  STEP: `.${classes.STEP}`,
  STEP_CONTAINER: `.${classes.STEP_CONTAINER}`,
  INDEX: `.${classes.INDEX}`,
  ICON: `.${classes.ICON}`,
  ICON_CONTENT: `.${classes.ICON_CONTENT}`,
  EXPANSION_SLOT: `slot[name="expansion-content"]`,
  EXPANSION_PANEL: `.${classes.EXPANSION_PANEL}`,
  EXPANSION_ICON: `.${classes.EXPANSION_ICON}`
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
  EXPANSION_CONTENT_SLOT_NAME: 'expansion-content'
};

const events = {
  SELECT: `${elementName}-select`,
  EXPANDED_CONTENT_FOCUSIN: `${elementName}-expanded-content-focusin`,
  EXPANDED_CONTENT_FOCUSOUT: `${elementName}-expanded-content-focusout`
};

export const STEP_CONSTANTS = {
  elementName,
  classes,
  selectors,
  attributes,
  events,
  strings
};

export type StepIcons = 'check' | 'block' | 'mode_edit' | 'warning' | '';
