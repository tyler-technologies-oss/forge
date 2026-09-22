import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}confirmation-dialog`;

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const CONFIRMATION_DIALOG_CONSTANTS = {
  elementName
};

export type ConfirmationDialogActionEventReason = 'action' | 'light-dismiss';

export interface ConfirmationDialogActionEventData {
  value: boolean;
  reason: ConfirmationDialogActionEventReason;
}
