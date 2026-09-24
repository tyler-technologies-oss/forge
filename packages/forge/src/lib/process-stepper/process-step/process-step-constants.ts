import { COMPONENT_NAME_PREFIX } from '../../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}process-step`;

const attributes = {
  STATE: 'state',
  DESCRIPTION: 'description',
  NONINTERACTIVE: 'noninteractive'
};

const selectors = {
  ANCHOR: 'a[href]',
  BUTTON_LIKE: ':is(button,[role=button][tabindex]:not([tabindex="-1"]))'
};

const events = {
  SELECT: `${elementName}-select`
};

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const PROCESS_STEP_CONSTANTS = {
  elementName,
  attributes,
  selectors,
  events
};

/** The one-based position of a step within its process, which is set by the parent stepper. */
export const stepIndex = Symbol('stepIndex');

export type ProcessStepState =
  | 'not-started'
  | 'current'
  | 'in-progress'
  | 'completed'
  | 'optional'
  | 'skipped'
  | 'disabled'
  | 'waiting'
  | 'blocked'
  | 'error'
  | 'requires-attention';

/** The states that fill the progress line leading up to and through a step. */
export const PROGRESS_LINE_STATES: ProcessStepState[] = ['completed', 'current', 'in-progress'];

/** The states rendered with the error marker treatment. */
export const ERROR_STATES: ProcessStepState[] = ['error', 'requires-attention', 'blocked'];

/** The states rendered with a partially filled marker. */
export const PARTIAL_STATES: ProcessStepState[] = ['current', 'in-progress'];
