import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { generateCustomElementArgTypes, getCssVariableArgs, standaloneStoryParams } from '../../utils';
import { styleMap } from 'lit/directives/style-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { classMap } from 'lit/directives/class-map.js';

import '@tylertech/forge/expansion-panel';
import '@tylertech/forge/card';
import '@tylertech/forge/open-icon';

const component = 'forge-expansion-panel';

const toggleEventAction = action('forge-expansion-panel-toggle');
const animationCompleteEventAction = action('forge-expansion-panel-animation-complete');

const meta = {
  title: 'Components/Expansion Panel',
  component,
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const buttonRef = createRef();

    function handleToggle(evt: CustomEvent<boolean>) {
      toggleEventAction();
      buttonRef.value?.setAttribute('aria-expanded', evt.detail.toString());
    }

    return html`
      <forge-expansion-panel
        .open=${args.open}
        .animationType=${args.animationType}
        .orientation=${args.orientation}
        style=${style}
        @forge-expansion-panel-toggle=${handleToggle}
        @forge-expansion-panel-animation-complete=${animationCompleteEventAction}>
        <button ${ref(buttonRef)} slot="header" type="button" aria-expanded=${args.open} aria-controls="content">Toggle</button>
        <div id="content" role="group">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem
            nulla quod corporis similique consequuntur facere laborum veniam error eius.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem
            nulla quod corporis similique consequuntur facere laborum veniam error eius.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem
            nulla quod corporis similique consequuntur facere laborum veniam error eius.
          </p>
        </div>
      </forge-expansion-panel>
    `;
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      controls: {
        orientation: { control: 'select', options: ['horizontal', 'vertical'] },
        animationType: { control: 'select', options: ['default', 'none'] }
      }
    })
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
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem
            nulla quod corporis similique consequuntur facere laborum veniam error eius.
          </p>
        </forge-expansion-panel>
      </forge-card>
    `;
  }
};

export const WithUnslottedButton: Story = {
  ...standaloneStoryParams,
  render: () => {
    return html`<button id="button-id">Toggle</button>
      <forge-card>
        <forge-expansion-panel target-button="button-id">
          <div slot="header" role="button" tabindex="0" style="display: flex; justify-content: space-between;">
            <div>Header text</div>
            <forge-open-icon></forge-open-icon>
          </div>
          <p>Content text</p>
        </forge-expansion-panel>
      </forge-card>`;
  }
};

export const CSSOnly: Story = {
  parameters: {
    controls: { include: ['open'] }
  },
  render: ({ open }) => {
    const panelRef = createRef();
    return html`
      <button
        type="button"
        aria-expanded=${open}
        id="my-button"
        @click=${(evt: PointerEvent) => {
          const expanded = !panelRef.value?.classList.contains('forge-expansion-panel--open');
          (evt.target as HTMLButtonElement).setAttribute('aria-expanded', `${expanded}`);
          panelRef.value?.classList.toggle('forge-expansion-panel--open', expanded);
        }}>
        Toggle
      </button>
      <div
        ${ref(panelRef)}
        class=${classMap({
          'forge-expansion-panel': true,
          'forge-expansion-panel--open': open
        })}>
        <div class="forge-expansion-panel__content">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae recusandae ullam facilis ipsa deleniti temporibus modi nam, eveniet, dolore aut rem,
          tempore excepturi! Porro corporis culpa quis modi ab corrupti?
        </div>
      </div>
    `;
  }
};
