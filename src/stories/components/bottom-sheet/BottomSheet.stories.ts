import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { generateCustomElementArgTypes, getCssVariableArgs } from '../../utils';
import { storyStyles } from '../../decorators';
import { styleMap } from 'lit/directives/style-map.js';
import { ref, createRef } from 'lit/directives/ref.js';
import { type IBottomSheetComponent } from '@tylertech/forge/bottom-sheet';

import '@tylertech/forge/bottom-sheet';
import '@tylertech/forge/button';
import '@tylertech/forge/toolbar';

const component = 'forge-bottom-sheet';

const meta = {
  title: 'Components/Bottom Sheet',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const bottomSheetRef = createRef<IBottomSheetComponent>();

    function handleClick() {
      bottomSheetRef.value!.open = !bottomSheetRef.value!.open;
    }

    function handleClose() {
      bottomSheetRef.value!.open = false;
    }

    return html`
      <forge-button variant="raised" @click=${handleClick}>Show Bottom Sheet</forge-button>
      <forge-bottom-sheet
        ${ref(bottomSheetRef)}
        aria-labelledby="title"
        aria-describedby="message"
        .open=${args.open}
        .mode=${args.mode}
        .persistent=${args.persistent}
        .fullscreen=${args.fullscreen}
        aria-labelledby="title"
        aria-describedby="message"
        style=${style}>
        <div class="content">
          <h2 id="title">Bottom Sheet Title</h2>
          <p id="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec urna et felis.</p>
        </div>
        <forge-toolbar>
          <forge-button slot="end" @click=${handleClose}>Close</forge-button>
        </forge-toolbar>
      </forge-bottom-sheet>
    `;
  },
  component,
  decorators: [
    storyStyles(`
    .content {
      padding: var(--forge-spacing-medium);
    }
  `)
  ],
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      controls: {
        mode: { control: 'select', options: ['modal', 'inline-modal', 'nonmodal'] }
      }
    })
  },
  args: {
    open: false,
    mode: 'modal',
    persistent: false,
    fullscreen: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
