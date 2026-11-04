import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import '@tylertech/forge/timestamp';
import '@tylertech/forge/timeline';
import { html } from 'lit';
import { applyArgs, generateCustomElementArgTypes, standaloneStoryParams } from '../../utils.js';

const component = 'forge-timestamp';

const meta = {
  title: 'Components/Timestamp',
  tags: ['new'],
  render: args => {
    const el = document.createElement('forge-timestamp');
    applyArgs(el, args);

    const d = new Date();
    el.setAttribute('datetime', `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
    return el;
  },
  component,
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component
    })
  },
  args: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const WithSeparators: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div>Start separator <forge-timestamp datetime="2024-06-15T14:30:45" separator="start"></forge-timestamp></div>
      <div><forge-timestamp datetime="2024-06-15T14:30:45" separator="end"></forge-timestamp> End separator</div>
      <div>No separator <forge-timestamp datetime="2024-06-15T14:30:45" separator="none"></forge-timestamp></div>
    </div>
  `
};

export const Formats: Story = {
  ...standaloneStoryParams,
  render: () => {
    const testDate = '2024-06-15T14:30:45';
    return html`
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div>
          <div>Default format (MM/dd/yyyy)</div>
          <forge-timestamp datetime=${testDate}></forge-timestamp>
        </div>
        <div>
          <div>ISO format (yyyy-MM-dd)</div>
          <forge-timestamp datetime=${testDate} format="yyyy-MM-dd"></forge-timestamp>
        </div>
        <div>
          <div>European format (dd.MM.yyyy)</div>
          <forge-timestamp datetime=${testDate} format="dd.MM.yyyy"></forge-timestamp>
        </div>
        <div>
          <div>Long format (dd MMM yyyy)</div>
          <forge-timestamp datetime=${testDate} format="dd MMM yyyy"></forge-timestamp>
        </div>
        <div>
          <div>Time only (HH:mm:ss)</div>
          <forge-timestamp datetime=${testDate} format="HH:mm:ss"></forge-timestamp>
        </div>
        <div>
          <div>DateTime (MM/dd/yyyy HH:mm)</div>
          <forge-timestamp datetime=${testDate} format="MM/dd/yyyy HH:mm"></forge-timestamp>
        </div>
      </div>
    `;
  }
};

export const Locales: Story = {
  ...standaloneStoryParams,
  render: () => {
    const testDate = '2024-06-15';
    return html`
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div>
          <div>English (en-US)</div>
          <forge-timestamp datetime=${testDate} locale="en-US" format="dd MMMM yyyy"></forge-timestamp>
        </div>
        <div>
          <div>German (de-DE)</div>
          <forge-timestamp datetime=${testDate} locale="de-DE" format="dd MMMM yyyy"></forge-timestamp>
        </div>
        <div>
          <div>French (fr-FR)</div>
          <forge-timestamp datetime=${testDate} locale="fr-FR" format="dd MMMM yyyy"></forge-timestamp>
        </div>
        <div>
          <div>Spanish (es-ES)</div>
          <forge-timestamp datetime=${testDate} locale="es-ES" format="dd MMMM yyyy"></forge-timestamp>
        </div>
        <div>
          <div>Japanese (ja-JP)</div>
          <forge-timestamp datetime=${testDate} locale="ja-JP" format="yyyy年MMMM月dd日 (E)"></forge-timestamp>
        </div>
      </div>
    `;
  }
};
