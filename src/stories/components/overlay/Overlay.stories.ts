import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/web-components';
import { type IPopoverProperties } from '@tylertech/forge/popover';
import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { classMap } from 'lit/directives/class-map.js';
import { OVERLAY_PLACEMENT_OPTIONS, generateCustomElementArgTypes, getCssVariableArgs, standaloneStoryParams } from '../../utils';
import { storyStyles } from '../../decorators';
import type { IOverlayComponent } from '@tylertech/forge/overlay';

import '@tylertech/forge/button';
import '@tylertech/forge/overlay';
import styles from './Overlay.scss?inline';
import { VirtualElement } from '../../../lib/core/utils/position-utils';

const component = 'forge-overlay';

const lightDismissAction = action('forge-overlay-light-dismiss');

const meta = {
  title: 'Components/Overlay',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const anchorRef = createRef();
    const overlayRef = createRef<IOverlayComponent>();
    const classes = {
      'clipping-container': true,
      'force-containment': args.forceContainment,
      'use-small-container': args.useSmallContainer
    };

    window.requestAnimationFrame(() => {
      anchorRef.value!.scrollIntoView({ block: 'center', inline: 'center' });
    });

    function handleClick() {
      overlayRef.value!.open = !overlayRef.value!.open;
    }

    return html`
      <div class=${classMap(classes)} id="clipping-container">
        <div class="scroll-container">
          <forge-button ${ref(anchorRef)} @click=${handleClick} id="overlay-trigger" variant="raised">Toggle Overlay</forge-button>
          <forge-overlay
            ${ref(overlayRef)}
            anchor="overlay-trigger"
            .open=${args.open}
            .animationType=${args.animationType}
            .triggerType=${args.triggerType}
            .arrow=${args.arrow}
            .inline=${args.inline}
            .placement=${args.placement}
            .positionStrategy=${args.positionStrategy}
            .offset=${args.offset}
            .shift=${args.shift}
            .hide=${args.hide}
            .persistent=${args.persistent}
            .flip=${args.flip}
            style=${style}
            @forge-overlay-light-dismiss=${lightDismissAction}>
            <div class="overlay-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui auctor, ultricies nunc nec, ultricies nunc. Nullam in dui auctor, ultricies
              nunc nec, ultricies nunc.
            </div>
          </forge-overlay>
        </div>
      </div>
    `;
  },
  component,
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['arrowElement', 'arrowElementOffset', 'anchorElement', 'noAnchor', 'anchor', 'boundary', 'boundaryElement', 'positionStrategy', 'inline'],
      controls: {
        placement: { control: 'select', options: OVERLAY_PLACEMENT_OPTIONS },
        offset: { control: 'object' },
        hide: { control: 'select', options: ['anchor-hidden', 'never'] },
        flip: { control: 'select', options: ['auto', 'main', 'cross', 'never'] },
        fallbackPlacements: { control: 'multi-select', options: OVERLAY_PLACEMENT_OPTIONS }
      }
    }),
    useSmallContainer: { control: 'boolean' },
    forceContainment: { control: 'boolean' }
  },
  args: {
    useSmallContainer: false,
    forceContainment: false,
    open: false,
    placement: 'bottom',
    offset: { mainAxis: 0, crossAxis: 0, alignmentAxis: 0 },
    shift: false,
    hide: 'anchor-hidden',
    persistent: false,
    flip: 'auto'
  }
} satisfies Meta<
  Partial<IPopoverProperties> & {
    useSmallContainer: boolean;
    forceContainment: boolean;
  }
>;

export default meta;

type Story = StoryObj<Partial<IPopoverProperties>>;

export const Demo: Story = {
  decorators: [storyStyles(styles)]
};

export const ContextMenu: Story = {
  ...standaloneStoryParams,
  decorators: [
    storyStyles(`
    .context-menu {
      background-color: var(--forge-theme-surface-container);
      border: var(--forge-border-thin) solid var(--forge-theme-outline);
      border-radius: var(--forge-shape-medium);
      padding: var(--forge-spacing-medium);
    }
  `)
  ],
  render: () => {
    document.addEventListener('contextmenu', createContextMenu);
    return html`
      <p>Right-click anywhere to open the context menu.</p>

      <forge-overlay id="context-overlay">
        <div class="context-menu">Context menu</div>
      </forge-overlay>
    `;
  }
};

function createContextMenu(evt: MouseEvent): void {
  evt.preventDefault();

  const contextOverlay = document.getElementById('context-overlay') as IOverlayComponent;

  if (contextOverlay.open) {
    contextOverlay.anchorElement = VirtualElement.fromEvent(evt);
  } else {
    contextOverlay.anchorElement = VirtualElement.fromEvent(evt);
    contextOverlay.open = true;
  }
}
