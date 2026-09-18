import { createContext } from '@lit/context';
import { COMPONENT_NAME_PREFIX } from '../constants.js';

export const LISTBOX_TAG_NAME: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}listbox`;

export const LISTBOX_DENSE = createContext<boolean>('forge-listbox-dense');
export const LISTBOX_DRAG_OUT = createContext<boolean>('forge-listbox-drag-out');
export const LISTBOX_REORDERABLE = createContext<boolean>('forge-listbox-reorderable');
