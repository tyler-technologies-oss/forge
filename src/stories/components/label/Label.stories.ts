import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { tylIconSettings } from '@tylertech/tyler-icons/standard';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';

import '@tylertech/forge/label';
import '@tylertech/forge/checkbox';
import '@tylertech/forge/icon-button';
import { storyStyles } from '../../decorators';

const component = 'forge-label';

IconRegistry.define(tylIconSettings);

const meta = {
  title: 'Components/Label',
  component,
  decorators: [
    storyStyles(`
    .align {
      display: flex;
      align-items: center;
    }
  `)
  ],
  parameters: {
    controls: { disable: true },
    actions: { disable: true }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const IDAssociated: Story = {
  render: () => {
    return html`
      <div class="align">
        <forge-label for="my-checkbox">Label</forge-label>
        <forge-checkbox id="my-checkbox"></forge-checkbox>
      </div>
    `;
  }
};

export const Nested: Story = {
  render: () => {
    return html`
      <forge-label class="align">
        <span>Label</span>
        <forge-checkbox></forge-checkbox>
      </forge-label>
    `;
  }
};

export const Legend: Story = {
  render: () => {
    return html`
      <forge-radio-group class="align">
        <forge-label legend>Choose an option</forge-label>
        <forge-radio name="default">Option 1</forge-radio>
        <forge-radio name="default">Option 2</forge-radio>
        <forge-radio name="default">Option 3</forge-radio>
      </forge-radio-group>
    `;
  }
};

export const AlignedList: Story = {
  decorators: [
    storyStyles(`
    .grid {
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      width: fit-content;

      forge-label {
        width: 100%;
      }
    }
  `)
  ],
  render: () => {
    return html`
      <div class="grid">
        <forge-label for="one">Item One</forge-label>
        <forge-checkbox id="one"></forge-checkbox>
        <forge-label for="two">Item Two with a longer label</forge-label>
        <forge-checkbox id="two"></forge-checkbox>
        <forge-label for="three">Item Three</forge-label>
        <forge-checkbox id="three"></forge-checkbox>
        <forge-label for="four">Item Four</forge-label>
        <forge-checkbox id="four"></forge-checkbox>
        <forge-label for="five">Item 5</forge-label>
        <forge-checkbox id="five"></forge-checkbox>
      </div>
    `;
  }
};

export const WithIconButton: Story = {
  decorators: [
    storyStyles(`
    .with-label {
      display: inline-flex;
      align-items: center;
      flex-direction: column;
    }
  `)
  ],
  render: () => {
    return html`
      <forge-label class="with-label">
        <forge-icon-button>
          <forge-icon name="settings"></forge-icon>
        </forge-icon-button>
        <span>Settings</span>
      </forge-label>
    `;
  }
};
