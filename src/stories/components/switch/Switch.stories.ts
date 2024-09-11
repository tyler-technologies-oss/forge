import { type Meta, type StoryObj } from '@storybook/web-components';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconCheck, tylIconClose } from '@tylertech/tyler-icons/standard';
import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElementStoryRenderer, generateCustomElementArgTypes } from '../../utils';

import '@tylertech/forge/icon';
import '@tylertech/forge/switch';

IconRegistry.define([tylIconCheck, tylIconClose]);

const component = 'forge-switch';

const meta = {
  title: 'Components/Switch',
  render: args => {
    var el = customElementStoryRenderer(component, args);
    el.textContent = 'off/on';
    return el;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['icon', 'form', 'labels', 'name'],
      controls: {
        labelPosition: {
          control: 'select',
          options: ['start', 'end']
        }
      }
    })
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const CSSOnly: Story = {
  parameters: {
    controls: { include: ['on', 'dense', 'disabled'] }
  },
  args: {
    on: false,
    dense: false,
    disabled: false
  },
  render: ({ on, dense, disabled }) => {
    const classes = {
      'forge-switch': true,
      'forge-switch--dense': dense
    };
    return html`
      <label class="forge-typography--label1" style="display: flex; align-items: center;">
        <div class=${classMap(classes)}>
          <input type="checkbox" switch .checked=${on} ?disabled=${disabled} />
          <div class="forge-switch__thumb">
            <forge-icon name="close" class="forge-switch__icon forge-switch__icon--off"></forge-icon>
            <forge-icon name="check" class="forge-switch__icon forge-switch__icon--on"></forge-icon>
          </div>
        </div>
        <span>Toggle me</span>
      </label>
    `;
  }
};
