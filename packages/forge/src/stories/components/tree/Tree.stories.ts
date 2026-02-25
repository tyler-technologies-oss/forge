import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { generateCustomElementArgTypes } from '../../utils.js';

import '@tylertech/forge/tree/tree';
import '@tylertech/forge/tree/tree-item';

const component = 'forge-tree';

const meta = {
  title: 'Components/Tree',
  render: args => html`
    <forge-tree .accordion=${args.accordion} .indentLines=${args.indentLines} .mode=${args.mode} .selectionFollowsFocus=${args.selectionFollowsFocus}>
      <forge-tree-item>
        <span>Item 1</span>
        <forge-tree-item>
          <span>Item 1.1</span>
          <forge-tree-item>
            <span>Item 1.1.1</span>
          </forge-tree-item>
          <forge-tree-item>
            <span>Item 1.1.2</span>
          </forge-tree-item>
          <forge-tree-item>
            <span>Item 1.1.3</span>
          </forge-tree-item>
        </forge-tree-item>
        <forge-tree-item>
          <span>Item 1.2</span>
          <forge-tree-item>
            <span>Item 1.2.1</span>
          </forge-tree-item>
          <forge-tree-item>
            <span>Item 1.2.2</span>
          </forge-tree-item>
          <forge-tree-item>
            <span>Item 1.2.3</span>
          </forge-tree-item>
        </forge-tree-item>
      </forge-tree-item>
      <forge-tree-item>
        <span>Item 2</span>
        <forge-tree-item>
          <span>Item 2.1</span>
          <forge-tree-item>
            <span>Item 2.1.1</span>
          </forge-tree-item>
          <forge-tree-item>
            <span>Item 2.1.2</span>
          </forge-tree-item>
          <forge-tree-item>
            <span>Item 2.1.3</span>
          </forge-tree-item>
        </forge-tree-item>
        <forge-tree-item>
          <span>Item 2.2</span>
          <forge-tree-item>
            <span>Item 2.2.1</span>
          </forge-tree-item>
          <forge-tree-item>
            <span>Item 2.2.2</span>
          </forge-tree-item>
          <forge-tree-item>
            <span>Item 2.2.3</span>
          </forge-tree-item>
        </forge-tree-item>
      </forge-tree-item>
      <forge-tree-item>
        <span>Item 3</span>
        <forge-tree-item>
          <span>Item 3.1</span>
          <forge-tree-item>
            <span>Item 3.1.1</span>
          </forge-tree-item>
          <forge-tree-item>
            <span>Item 3.1.2</span>
          </forge-tree-item>
          <forge-tree-item>
            <span>Item 3.1.3</span>
          </forge-tree-item>
        </forge-tree-item>
        <forge-tree-item>
          <span>Item 3.2</span>
          <forge-tree-item>
            <span>Item 3.2.1</span>
          </forge-tree-item>
          <forge-tree-item>
            <span>Item 3.2.2</span>
          </forge-tree-item>
          <forge-tree-item>
            <span>Item 3.2.3</span>
          </forge-tree-item>
        </forge-tree-item>
      </forge-tree-item>
    </forge-tree>
  `,
  component,
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      controls: {
        accordion: {
          control: {
            type: 'boolean'
          }
        },
        indentLines: {
          control: {
            type: 'boolean'
          }
        },
        mode: {
          control: {
            type: 'select',
            options: ['single', 'multiple', 'leaf', 'off']
          }
        },
        selectionFollowsFocus: {
          control: {
            type: 'boolean'
          }
        },
        value: {
          control: {
            type: 'text'
          }
        }
      }
    })
  },
  args: {
    accordion: false,
    indentLines: false,
    mode: 'single',
    selectionFollowsFocus: false,
    value: ''
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
