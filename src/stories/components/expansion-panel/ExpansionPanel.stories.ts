import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { generateCustomElementArgTypes, getCssVariableArgs } from '../../utils';
import { styleMap } from 'lit/directives/style-map.js';
import { createRef, ref } from 'lit/directives/ref.js';

import '@tylertech/forge/expansion-panel';
import '@tylertech/forge/card';

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
