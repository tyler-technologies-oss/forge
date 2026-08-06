import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit-html';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { OVERLAY_PLACEMENT_OPTIONS, OVERLAY_FLIP_OPTIONS, generateCustomElementArgTypes, getCssVariableArgs } from '../../utils.js';
import { TOOLTIP_CONSTANTS } from '@tylertech/forge/tooltip';

import '@tylertech/forge/button';
import '@tylertech/forge/tooltip';

const component = 'forge-tooltip';

const CSS_ONLY_PLACEMENTS = ['right', 'top', 'bottom', 'left'] as const;

const meta = {
  title: 'Components/Tooltip',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    return html`
      <forge-button id="my-button" variant="raised">Hover me</forge-button>
      <forge-tooltip
        anchor="my-button"
        .open=${args.open}
        .type=${args.type}
        .placement=${args.placement}
        .delay=${args.delay}
        .offset=${args.offset}
        .flip=${args.flip}
        .fallbackPlacements=${args.fallbackPlacements?.length ? args.fallbackPlacements : []}
        .triggerType=${args.triggerType}
        style=${style}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </forge-tooltip>
    `;
  },
  component,
  parameters: {
    layout: 'centered',
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['anchor', 'anchorElement', 'target', 'position', 'boundary', 'boundaryElement'],
      controls: {
        type: { control: 'select', options: ['presentation', 'label', 'description'] },
        placement: { control: 'select', options: OVERLAY_PLACEMENT_OPTIONS },
        flip: { control: 'select', options: OVERLAY_FLIP_OPTIONS },
        triggerType: { control: 'multi-select', options: ['hover', 'longpress', 'focus'] },
        fallbackPlacements: { control: 'multi-select', options: OVERLAY_PLACEMENT_OPTIONS }
      }
    })
  },
  args: {
    open: false,
    type: TOOLTIP_CONSTANTS.defaults.TYPE,
    placement: TOOLTIP_CONSTANTS.defaults.PLACEMENT,
    delay: TOOLTIP_CONSTANTS.defaults.DELAY,
    offset: TOOLTIP_CONSTANTS.defaults.OFFSET,
    flip: TOOLTIP_CONSTANTS.defaults.FLIP,
    triggerType: TOOLTIP_CONSTANTS.defaults.TRIGGER_TYPES
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const CSSOnly: Story = {
  parameters: {
    controls: { disable: false, exclude: ['open', 'type', 'delay', 'offset', 'flip', 'triggerType', 'fallbackPlacements'] }
  },
  argTypes: {
    placement: { control: 'select', options: CSS_ONLY_PLACEMENTS },
    text: { control: 'text' }
  },
  args: {
    placement: 'right',
    text: 'CSS-only tooltip'
  },
  render: ({ placement, text, ...args }) => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const classes = {
      'forge-tooltip': true,
      [`forge-tooltip--${placement}`]: placement !== 'right'
    };
    return html`
      <span class=${classMap(classes)} data-text=${text} tabindex="0" style=${style}>
        <span style="text-decoration: underline dotted;">Hover or focus me</span>
      </span>
    `;
  }
};
