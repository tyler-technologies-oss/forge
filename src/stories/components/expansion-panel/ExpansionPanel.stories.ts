import { html, render } from 'lit';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes } from '../../utils';

import '@tylertech/forge/expansion-panel';
import '@tylertech/forge/card';

const component = 'forge-expansion-panel';

const toggleEventAction = action('forge-expansion-panel-toggle');
const animationCompleteEventAction = action('forge-expansion-panel-animation-complete');

const meta = {
  title: 'Components/Expansion Panel',
  component,
  render: args => {
    // TODO: figure out how to only update args on existing element instance instead of re-rendering the whole thing
    const el = customElementStoryRenderer(component, args);

    // Trigger button
    const triggerButton = document.createElement('button');
    triggerButton.slot = 'header';
    triggerButton.textContent = 'Toggle';
    triggerButton.setAttribute('type', 'button');
    triggerButton.setAttribute('aria-expanded', 'false');
    triggerButton.setAttribute('aria-controls', 'content');
    el.appendChild(triggerButton);

    // Content
    const content = document.createElement('div');
    content.id = 'content';
    content.setAttribute('role', 'group');
    content.innerHTML = `
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet a, minima vero perferendis, neque tempora amet qui blanditiis cumque, nulla deserunt quo veniam facere aspernatur fuga fugit? Perferendis, et eligendi?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet a, minima vero perferendis, neque tempora amet qui blanditiis cumque, nulla deserunt quo veniam facere aspernatur fuga fugit? Perferendis, et eligendi?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet a, minima vero perferendis, neque tempora amet qui blanditiis cumque, nulla deserunt quo veniam facere aspernatur fuga fugit? Perferendis, et eligendi?</p>
    `;
    el.appendChild(content);
    
    // Actions
    el.addEventListener('forge-expansion-panel-toggle', toggleEventAction);
    el.addEventListener('forge-expansion-panel-animation-complete', animationCompleteEventAction);

    return el;
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      controls: {
        orientation: { control: 'select', options: ['horizontal', 'vertical'] },
        animationType: { control: 'select', options: ['default', 'none'] }
      }
    }),
  },
  args: {
    open: false,
    orientation: 'vertical',
    animationType: 'default'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const WithCard: Story = {
  render: ({ open, animationType, orientation }) => {
    return html`
      <forge-card>
        <forge-expansion-panel .open=${open} .animationType=${animationType} .orientation=${orientation}>
          <div slot="header" role="button" tabindex="0" style="display: flex; justify-content: space-between;">
            <div>Header text</div>
            <forge-open-icon></forge-open-icon>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem nulla quod corporis similique consequuntur facere laborum veniam error eius.</p>
        </forge-expansion-panel>
      </forge-card>
    `;
  }
};
