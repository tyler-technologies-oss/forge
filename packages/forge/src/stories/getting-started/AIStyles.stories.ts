import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { standaloneStoryParams } from '../utils.js';

import '@tylertech/forge/forge-ai.scss';
import '@tylertech/forge/autocomplete';
import '@tylertech/forge/checkbox';
import '@tylertech/forge/chip-field';
import '@tylertech/forge/chips';
import '@tylertech/forge/date-picker';
import '@tylertech/forge/date-range-picker';
import '@tylertech/forge/radio';
import '@tylertech/forge/select';
import '@tylertech/forge/stack';
import '@tylertech/forge/switch';
import '@tylertech/forge/text-field';
import '@tylertech/forge/time-picker';

const SUGGESTIONS = ['Summarize', 'Translate', 'Rewrite', 'Explain'].map(label => ({ label, value: label }));
const VARIANTS = ['outlined', 'tonal', 'filled', 'raised', 'plain'];

const filterSuggestions = (filter?: string): typeof SUGGESTIONS =>
  SUGGESTIONS.filter(({ label }) => label.toLowerCase().includes((filter ?? '').toLowerCase()));

const meta = {
  title: 'Getting Started/AI Styles Examples',
  tags: ['hidden']
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Fields: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-stack gap="24" style="max-width: 400px">
      <forge-text-field class="forge-ai">
        <label slot="label" for="ai-text-field">Prompt</label>
        <input type="text" id="ai-text-field" value="Summarize this document" />
        <span slot="support-text">Describe what you want to generate</span>
      </forge-text-field>

      <forge-text-field class="forge-ai">
        <label slot="label" for="ai-textarea">Notes</label>
        <textarea id="ai-textarea">Keep it short and friendly.</textarea>
      </forge-text-field>

      <forge-select class="forge-ai" label="Tone" value="friendly">
        <forge-option value="friendly">Friendly</forge-option>
        <forge-option value="formal">Formal</forge-option>
        <forge-option value="concise">Concise</forge-option>
      </forge-select>

      <forge-chip-field class="forge-ai">
        <label slot="label" for="ai-chip-field">Topics</label>
        <input type="text" id="ai-chip-field" />
        <forge-chip slot="member" type="field">Reports</forge-chip>
        <forge-chip slot="member" type="field">Budgets</forge-chip>
      </forge-chip-field>
    </forge-stack>
  `
};

export const Variants: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-stack gap="24" style="max-width: 400px">
      ${VARIANTS.map(
        variant => html`
          <forge-text-field class="forge-ai" variant=${variant}>
            <label slot="label" for=${`ai-variant-${variant}`}>${variant[0].toUpperCase()}${variant.slice(1)}</label>
            <input type="text" id=${`ai-variant-${variant}`} />
          </forge-text-field>
        `
      )}
    </forge-stack>
  `
};

export const States: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-stack gap="24" style="max-width: 400px">
      <forge-text-field class="forge-ai" invalid>
        <label slot="label" for="ai-invalid">Invalid</label>
        <input type="text" id="ai-invalid" />
        <span slot="support-text">Invalid fields keep their error styling</span>
      </forge-text-field>

      <forge-text-field class="forge-ai" disabled>
        <label slot="label" for="ai-disabled">Disabled</label>
        <input type="text" id="ai-disabled" disabled />
      </forge-text-field>
    </forge-stack>
  `
};

export const Pickers: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-stack gap="24" style="max-width: 400px">
      <forge-autocomplete class="forge-ai" .filter=${filterSuggestions}>
        <forge-text-field popover-icon>
          <label for="ai-autocomplete">Suggested action</label>
          <input type="text" id="ai-autocomplete" />
        </forge-text-field>
      </forge-autocomplete>

      <forge-date-picker class="forge-ai">
        <forge-text-field>
          <label for="ai-date-picker">Date</label>
          <input type="text" id="ai-date-picker" autocomplete="off" />
        </forge-text-field>
      </forge-date-picker>

      <forge-date-range-picker class="forge-ai">
        <forge-text-field>
          <label for="ai-date-range-start">Date range</label>
          <input type="text" id="ai-date-range-start" autocomplete="off" />
          <input type="text" id="ai-date-range-end" autocomplete="off" />
        </forge-text-field>
      </forge-date-range-picker>

      <forge-time-picker class="forge-ai">
        <forge-text-field>
          <label for="ai-time-picker">Time</label>
          <input type="text" id="ai-time-picker" autocomplete="off" />
        </forge-text-field>
      </forge-time-picker>
    </forge-stack>
  `
};

export const Controls: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-stack gap="24">
      <forge-stack inline wrap gap="16">
        <forge-checkbox class="forge-ai">Unchecked</forge-checkbox>
        <forge-checkbox class="forge-ai" checked>Checked</forge-checkbox>
        <forge-checkbox class="forge-ai" indeterminate>Indeterminate</forge-checkbox>
      </forge-stack>

      <forge-radio-group class="forge-ai" name="ai-radio">
        <forge-stack inline wrap gap="16">
          <forge-radio value="1">One</forge-radio>
          <forge-radio value="2" checked>Two</forge-radio>
          <forge-radio value="3">Three</forge-radio>
        </forge-stack>
      </forge-radio-group>

      <forge-stack inline wrap gap="16">
        <forge-switch class="forge-ai">Off</forge-switch>
        <forge-switch class="forge-ai" on>On</forge-switch>
      </forge-stack>
    </forge-stack>
  `
};

export const Customization: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-stack gap="24" style="max-width: 400px; --forge-ai-gradient-start: #ffd8a8; --forge-ai-gradient-end: #a5d8ff">
      <forge-text-field class="forge-ai">
        <label slot="label" for="ai-custom">Custom colors</label>
        <input type="text" id="ai-custom" />
      </forge-text-field>

      <forge-stack inline wrap gap="16">
        <forge-checkbox class="forge-ai" checked>Checkbox</forge-checkbox>
        <forge-switch class="forge-ai" on>Switch</forge-switch>
      </forge-stack>
    </forge-stack>
  `
};
