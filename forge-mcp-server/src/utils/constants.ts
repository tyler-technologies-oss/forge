import { ForgeComponent } from './types.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const FORGE_ROOT = path.resolve(__dirname, '../../../');
export const STORIES_DIR = path.join(FORGE_ROOT, 'src/stories/components');
export const DEV_PAGES_DIR = path.join(FORGE_ROOT, 'src/dev/pages');
export const LIB_DIR = path.join(FORGE_ROOT, 'src/lib');

export const COMPONENT_CATEGORIES = {
  'inputs': ['text-field', 'select', 'checkbox', 'radio', 'switch', 'slider', 'autocomplete', 'date-picker', 'time-picker', 'color-picker', 'file-picker'],
  'buttons': ['button', 'icon-button', 'button-toggle', 'split-button', 'floating-action-button'],
  'navigation': ['app-bar', 'drawer', 'tabs', 'stepper', 'paginator', 'bottom-sheet'],
  'layout': ['scaffold', 'card', 'accordion', 'expansion-panel', 'divider', 'stack', 'split-view'],
  'feedback': ['toast', 'banner', 'dialog', 'tooltip', 'popover', 'inline-message', 'backdrop'],
  'data-display': ['table', 'list', 'avatar', 'badge', 'chip', 'label', 'label-value'],
  'progress': ['linear-progress', 'circular-progress', 'skeleton', 'meter'],
  'utility': ['icon', 'focus-indicator', 'state-layer', 'keyboard-shortcut', 'skip-link']
} as const;

export const THEMES = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'info'] as const;

export const BUTTON_VARIANTS = ['text', 'outlined', 'tonal', 'filled', 'raised', 'link'] as const;

export const COMPONENT_MAP: Map<string, Partial<ForgeComponent>> = new Map([
  ['button', {
    name: 'Button',
    tagName: 'forge-button',
    description: 'Buttons represent actions that a user can take',
    category: 'buttons',
    variants: ['text', 'outlined', 'tonal', 'filled', 'raised', 'link'],
    themes: [...THEMES],
    hasCSSOnly: true,
    dependencies: ['forge-icon', 'forge-focus-indicator', 'forge-state-layer']
  }],
  ['text-field', {
    name: 'Text Field',
    tagName: 'forge-text-field',
    description: 'Text fields allow users to enter and edit text',
    category: 'inputs',
    hasCSSOnly: true,
    dependencies: ['forge-icon', 'forge-floating-label']
  }],
  ['card', {
    name: 'Card',
    tagName: 'forge-card',
    description: 'Cards contain content and actions about a single subject',
    category: 'layout',
    hasCSSOnly: true
  }],
  ['dialog', {
    name: 'Dialog',
    tagName: 'forge-dialog',
    description: 'Dialogs inform users about a task and can contain critical information',
    category: 'feedback',
    dependencies: ['forge-backdrop', 'forge-icon-button']
  }],
  ['app-bar', {
    name: 'App Bar',
    tagName: 'forge-app-bar',
    description: 'App bars provide content and actions related to the current screen',
    category: 'navigation',
    dependencies: ['forge-icon', 'forge-icon-button', 'forge-app-bar-menu-button', 'forge-app-bar-search']
  }],
  ['select', {
    name: 'Select',
    tagName: 'forge-select',
    description: 'Select components allow users to choose from a list of options',
    category: 'inputs',
    dependencies: ['forge-list', 'forge-option', 'forge-popover']
  }],
  ['tabs', {
    name: 'Tabs',
    tagName: 'forge-tab-bar',
    description: 'Tabs organize content across different screens and data sets',
    category: 'navigation',
    dependencies: ['forge-tab', 'forge-icon']
  }],
  ['checkbox', {
    name: 'Checkbox',
    tagName: 'forge-checkbox',
    description: 'Checkboxes allow users to select one or more items from a set',
    category: 'inputs',
    hasCSSOnly: true
  }],
  ['switch', {
    name: 'Switch',
    tagName: 'forge-switch',
    description: 'Switches toggle the state of a single setting on or off',
    category: 'inputs',
    hasCSSOnly: true
  }],
  ['avatar', {
    name: 'Avatar',
    tagName: 'forge-avatar',
    description: 'Avatars represent users or entities',
    category: 'data-display',
    hasCSSOnly: true
  }]
]);