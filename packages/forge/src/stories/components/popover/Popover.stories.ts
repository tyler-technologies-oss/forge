import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { action } from 'storybook/actions';
import { OVERLAY_PLACEMENT_OPTIONS, generateCustomElementArgTypes, getCssVariableArgs, standaloneStoryParams } from '../../utils.js';
import { IPopoverComponent, IPopoverToggleEventData, type IPopoverProperties } from '@tylertech/forge/popover';
import { styleMap } from 'lit/directives/style-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { ToastComponent } from '@tylertech/forge/toast';
import { type IButtonComponent } from '@tylertech/forge/button';
import { storyStyles } from '../../decorators.js';

import '@tylertech/forge/button';
import '@tylertech/forge/popover';
import '@tylertech/forge/scaffold';
import '@tylertech/forge/toolbar';
import '@tylertech/forge/text-field';
import '@tylertech/forge/drawer';
import '@tylertech/forge/list';

const component = 'forge-popover';

const toggleAction = action('forge-popover-toggle');
const beforeToggleAction = action('forge-popover-beforetoggle');

const meta = {
  title: 'Components/Popover',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const popoverRef = createRef<IPopoverComponent>();

    function handleClose(): void {
      if (popoverRef.value) {
        popoverRef.value.open = false;
      }
    }

    return html`
      <forge-button id="popover-trigger" variant="raised">Show Popover</forge-button>
      <forge-popover
        ${ref(popoverRef)}
        anchor="popover-trigger"
        .open=${args.open}
        .animationType=${args.animationType}
        .triggerType=${args.triggerType}
        .arrow=${args.arrow}
        .longpressDelay=${args.longpressDelay}
        .persistentHover=${args.persistentHover}
        .hoverDelay=${args.hoverDelay}
        .hoverDismissDelay=${args.hoverDismissDelay}
        .preset=${args.preset}
        .inline=${args.inline}
        .placement=${args.placement}
        .positionStrategy=${args.positionStrategy}
        .offset=${args.offset}
        .shift=${args.shift}
        .hide=${args.hide}
        .persistent=${args.persistent}
        .flip=${args.flip}
        style=${style}
        @forge-popover-toggle=${toggleAction}
        @forge-popover-beforetoggle=${beforeToggleAction}>
        <forge-scaffold>
          <forge-toolbar no-border slot="header">
            <h2 class="forge-typography--heading4" slot="start">Popover Title</h2>
          </forge-toolbar>
          <div slot="body" style="width: 300px; padding: var(--forge-spacing-medium);">Popover content</div>
          <forge-toolbar no-border slot="footer">
            <forge-button slot="end" variant="filled" @click=${handleClose}>Close</forge-button>
          </forge-toolbar>
        </forge-scaffold>
      </forge-popover>
    `;
  },
  component,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['overlay', 'anchorElement', 'anchor', 'noAnchor', 'boundary', 'boundaryElement'],
      controls: {
        animationType: { control: 'select', options: ['none', 'zoom', 'fade', 'slide'] },
        triggerType: {
          control: 'multi-select',
          options: ['click', 'hover', 'focus', 'longpress', 'doubleclick', 'contextmenu', 'manual']
        },
        preset: { control: 'select', options: ['popover', 'dropdown', 'list'] },
        positionStrategy: { control: 'select', options: ['absolute', 'fixed'] },
        placement: { control: 'select', options: OVERLAY_PLACEMENT_OPTIONS },
        offset: { control: 'object' },
        hide: { control: 'select', options: ['anchor-hidden', 'never'] },
        flip: { control: 'select', options: ['auto', 'main', 'cross', 'never'] },
        fallbackPlacements: { control: 'multi-select', options: OVERLAY_PLACEMENT_OPTIONS }
      }
    })
  },
  args: {
    open: false,
    animationType: 'zoom',
    triggerType: ['click'],
    arrow: false,
    longpressDelay: 500,
    persistentHover: false,
    hoverDelay: 0,
    hoverDismissDelay: 500,
    preset: 'popover',
    inline: false,
    placement: 'bottom',
    positionStrategy: 'fixed',
    offset: { mainAxis: 0, crossAxis: 0, alignmentAxis: 0 },
    shift: false,
    hide: 'anchor-hidden',
    persistent: false,
    flip: 'auto'
  }
} satisfies Meta<Partial<IPopoverProperties>>;

export default meta;

type Story = StoryObj<Partial<IPopoverProperties>>;

export const Demo: Story = {};

export const NonModal: Story = {
  ...standaloneStoryParams,
  render: () => {
    const popoverRef = createRef<IPopoverComponent>();
    const inputRef = createRef<HTMLInputElement>();
    const saveButtonRef = createRef<IButtonComponent>();

    function handleInput(): void {
      if (saveButtonRef.value) {
        saveButtonRef.value.disabled = !inputRef.value?.value;
      }
    }

    function handleClose(): void {
      if (inputRef.value) {
        inputRef.value.value = '';
      }
      if (saveButtonRef.value) {
        saveButtonRef.value.disabled = true;
      }
      if (popoverRef.value) {
        popoverRef.value.open = false;
      }
    }

    function handleSave(): void {
      if (inputRef.value?.value) {
        ToastComponent.present({ message: `Hello, ${inputRef.value.value}!` });
      }
      handleClose();
    }

    function handleBeforeToggle(evt: CustomEvent<IPopoverToggleEventData>): void {
      if (evt.detail.newState === 'closed') {
        if (inputRef.value?.value) {
          evt.preventDefault();
          ToastComponent.present({ message: 'You have unsaved changes. ' });
        }
      }
    }

    return html`
      <forge-button id="popover-trigger-nonmodal" variant="raised">Show Non-modal Popover</forge-button>
      <forge-popover
        ${ref(popoverRef)}
        anchor="popover-trigger-nonmodal"
        placement="bottom-start"
        arrow
        role="dialog"
        aria-modal="false"
        aria-labelledby="nonmodal-title"
        @forge-popover-beforetoggle=${handleBeforeToggle}>
        <forge-scaffold>
          <forge-toolbar no-border slot="header">
            <h2 class="forge-typography--heading4" slot="start" id="nonmodal-title">Enter Your Name</h2>
          </forge-toolbar>
          <div slot="body" id="nonmodal-description" style="width: 300px; padding: var(--forge-spacing-medium);">
            <form autocomplete="off">
              <forge-text-field>
                <input ${ref(inputRef)} autofocus @input=${handleInput} type="text" name="your-name" value="" required aria-label="Enter your name" />
              </forge-text-field>
            </form>
          </div>
          <forge-toolbar no-border slot="footer">
            <forge-button slot="end" @click=${handleClose} style="margin-right: var(--forge-spacing-medium);">Cancel</forge-button>
            <forge-button ${ref(saveButtonRef)} slot="end" variant="filled" disabled @click=${handleSave}>Save</forge-button>
          </forge-toolbar>
        </forge-scaffold>
      </forge-popover>
    `;
  }
};

export const Distinct: Story = {
  ...standaloneStoryParams,
  parameters: {
    layout: 'padded'
  },
  decorators: [
    storyStyles(`
.popover-content {
  width: 300px;
  padding: var(--forge-spacing-medium);
}
    `)
  ],
  render: () => html`
    <forge-drawer>
      <forge-list navlist>
        <forge-list-item id="li-1"><button type="button">List Item One</button></forge-list-item>
        <forge-popover arrow placement="right" trigger-type="hover" distinct="list-item-nav-popovers">
          <div class="popover-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
        </forge-popover>

        <forge-list-item id="li-2"><button type="button">List Item Two</button></forge-list-item>
        <forge-popover arrow placement="right" trigger-type="hover" distinct="list-item-nav-popovers">
          <div class="popover-content">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </forge-popover>

        <forge-list-item id="li-3"><button type="button">List Item Three</button></forge-list-item>
        <forge-popover arrow placement="right" trigger-type="hover" distinct="list-item-nav-popovers">
          <div class="popover-content">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
            inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </div>
        </forge-popover>
      </forge-list>
    </forge-drawer>
  `
};
