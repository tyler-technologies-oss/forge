import { type Meta, type StoryObj } from '@storybook/web-components';
import { MeterComponent, MeterGroupComponent } from '@tylertech/forge/meter';
import { html } from 'lit';
import { applyArgs, generateCustomElementArgTypes, standaloneStoryParams } from '../../utils';

import '@tylertech/forge/meter';
import '@tylertech/forge/key';

const component = 'forge-meter';

const applyLabel = (element: MeterComponent | MeterGroupComponent) => {
  element.id = 'meter';
  const label = document.createElement('label');
  label.htmlFor = 'meter';
  label.textContent = 'Label';
  element.appendChild(label);
};

const meta = {
  title: 'Components/Meter',
  render: args => {
    const element = document.createElement('forge-meter');
    applyArgs(element, args);
    applyLabel(element);
    return element;
  },
  component,
  subcomponents: {
    ['Meter Group']: 'forge-meter-group'
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['percentage'],
      controls: {
        value: { control: { type: 'number', step: 0.1 } },
        min: { control: { type: 'number', step: 0.1 } },
        max: { control: { type: 'number', step: 0.1 } },
        low: { control: { type: 'number', step: 0.1 } },
        high: { control: { type: 'number', step: 0.1 } },
        optimum: { control: { type: 'number', step: 0.1 } },
        valueMode: { control: { type: 'inline-radio' }, options: ['manual', 'percentage', 'value'] },
        direction: { control: { type: 'inline-radio' }, options: ['horizontal', 'vertical'] },
        shape: { control: { type: 'inline-radio' }, options: ['default', 'rounded', 'squared'] },
        innerShape: { control: { type: 'inline-radio' }, options: ['default', 'inherit'] },
        density: { control: { type: 'select' }, options: ['small', 'medium', 'large'] },
        theme: { control: { type: 'select' }, options: ['default', 'primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'info'] }
      }
    })
  },
  args: {
    value: 0.5,
    min: 0,
    max: 1,
    tickmarks: false,
    valueMode: 'manual',
    direction: 'horizontal',
    shape: 'default',
    innerShape: 'default',
    density: 'medium',
    theme: 'default',
    muted: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Segmented: Story = {
  render: args => {
    const element = document.createElement('forge-meter');
    applyArgs(element, args);
    applyLabel(element);
    element.setAttribute('low', '0.33');
    element.setAttribute('high', '0.67');
    element.setAttribute('optimum', '1');
    return element;
  }
};

export const Tickmarks: Story = {
  ...standaloneStoryParams,
  render: args => {
    const element = document.createElement('forge-meter');
    applyArgs(element, args);
    applyLabel(element);
    element.setAttribute('tickmarks', '');
    element.style.setProperty('--forge-meter-tickmarks', '9');
    return element;
  }
};

export const Grouped: Story = {
  argTypes: {
    min: { control: { type: 'number', step: 0.1 } },
    max: { control: { type: 'number', step: 0.1 } },
    tickmarks: { control: { type: 'boolean' } },
    direction: { control: { type: 'inline-radio' }, options: ['horizontal', 'vertical'] },
    shape: { control: { type: 'inline-radio' }, options: ['default', 'rounded', 'squared'] },
    innerShape: { control: { type: 'inline-radio' }, options: ['default', 'inherit'] },
    density: { control: { type: 'select' }, options: ['small', 'medium', 'large'] }
  },
  args: {
    min: 0,
    max: 1,
    tickmarks: false,
    direction: 'horizontal',
    shape: 'default',
    innerShape: 'default',
    density: 'medium'
  },
  render: args => {
    return html`
      <forge-meter-group
        id="meter-group"
        .min=${args.min}
        .max=${args.max}
        .tickmarks=${args.tickmarks}
        .direction=${args.direction}
        .density=${args.density}
        .shape=${args.shape}
        .innerShape=${args.innerShape}>
        <label slot="label" for="meter-group">Label</label>
        <forge-meter aria-label="First" value="0.25" style="--forge-meter-color: #1E88E5;"></forge-meter>
        <forge-meter aria-label="Second" value="0.15" style="--forge-meter-color: #FDD835;"></forge-meter>
        <forge-meter aria-label="Third" value="0.35" style="--forge-meter-color: #43A047;"></forge-meter>
      </forge-meter-group>
      <forge-key style="margin-block-start: 8px;">
        <forge-key-item style="--forge-key-item-icon-color: #1E88E5;">
          <span>First</span>
          <span slot="value">25%</span>
        </forge-key-item>
        <forge-key-item style="--forge-key-item-icon-color: #FDD835;">
          <span>Second</span>
          <span slot="value">15%</span>
        </forge-key-item>
        <forge-key-item style="--forge-key-item-icon-color: #43A047;">
          <span>Third</span>
          <span slot="value">35%</span>
        </forge-key-item>
      </forge-key>
    `;
  }
};
