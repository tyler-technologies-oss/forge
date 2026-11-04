import { COMPONENT_NAME_PREFIX } from '../../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}process-step`;

const attributes = {
  STATE: 'state',
  DISABLED: 'disabled',
  HREF: 'href'
};

const events = {
  SELECT: `${elementName}-select`,
  STATE_CHANGE: `${elementName}-state-change`
};

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const PROCESS_STEP_CONSTANTS = {
  elementName,
  attributes,
  events
};

/** The one-based position of a step within its process, which is set by the parent stepper. */
export const stepIndex = Symbol('stepIndex');

export type ProcessStepState = 'not-started' | 'current' | 'in-progress' | 'completed' | 'critical';

export const PROCESS_STEP_STATES: ProcessStepState[] = ['not-started', 'current', 'in-progress', 'completed', 'critical'];

/** The states rendered with a partially filled marker. */
export const PARTIAL_STATES: ProcessStepState[] = ['in-progress'];
