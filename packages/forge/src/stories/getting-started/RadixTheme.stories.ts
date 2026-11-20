import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';
import { standaloneStoryParams } from '../utils.js';
import styles from './RadixTheme.scss?inline';

import '@tylertech/forge/badge';
import '@tylertech/forge/button';
import '@tylertech/forge/card';
import '@tylertech/forge/checkbox';
import '@tylertech/forge/radio';
import '@tylertech/forge/select';
import '@tylertech/forge/stack';
import '@tylertech/forge/switch';
import '@tylertech/forge/text-field';
import '@tylertech/forge/toolbar';

const PANELS = [
  { label: 'Default (light)', className: 'theme-panel theme-panel--default-light' },
  { label: 'Radix (light)', className: 'theme-panel theme-panel--radix-light' },
  { label: 'Default (dark)', className: 'theme-panel theme-panel--default-dark' },
  { label: 'Radix (dark)', className: 'theme-panel theme-panel--radix-dark' }
];

const sample = (id: string): TemplateResult => html`
  <forge-stack gap="16">
    <forge-stack inline gap="8" wrap>
      <forge-button variant="text">Text</forge-button>
      <forge-button variant="tonal">Tonal</forge-button>
      <forge-button variant="outlined">Outlined</forge-button>
      <forge-button variant="filled">Filled</forge-button>
      <forge-button variant="raised">Raised</forge-button>
    </forge-stack>

    <forge-text-field>
      <label slot="label" for="${id}-text">Text field</label>
      <input type="text" id="${id}-text" value="Value" />
    </forge-text-field>

    <forge-text-field variant="filled">
      <label slot="label" for="${id}-filled">Filled text field</label>
      <input type="text" id="${id}-filled" />
    </forge-text-field>

    <forge-select label="Select" value="one">
      <forge-option value="one">One</forge-option>
      <forge-option value="two">Two</forge-option>
    </forge-select>

    <forge-stack inline gap="16" alignment="center" wrap>
      <forge-switch>Switch</forge-switch>
      <forge-checkbox checked>Checkbox</forge-checkbox>
      <forge-radio checked>Radio</forge-radio>
      <forge-radio>Radio</forge-radio>
    </forge-stack>

    <forge-stack inline gap="8">
      <forge-badge>Badge</forge-badge>
      <forge-badge theme="primary">Primary</forge-badge>
    </forge-stack>

    <forge-card>
      <forge-toolbar><span slot="start">Toolbar</span></forge-toolbar>
      <div style="padding: 16px">Card content</div>
    </forge-card>
  </forge-stack>
`;

const meta = {
  title: 'Getting Started/Radix Theme Examples',
  tags: ['hidden']
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Comparison: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <style>
      ${styles}
    </style>
    <div class="theme-grid">
      ${PANELS.map(
        ({ label, className }, index) => html`
          <section class="${className}">
            <h3>${label}</h3>
            ${sample(`radix-${index}`)}
          </section>
        `
      )}
    </div>
  `
};
