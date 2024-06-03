import { type Meta, type StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit-html';
import { styleMap } from 'lit/directives/style-map.js';
import { OVERLAY_PLACEMENT_OPTIONS, OVERLAY_FLIP_OPTIONS, generateCustomElementArgTypes, getCssVariableArgs } from '../../utils';

import '@tylertech/forge/button';
import '@tylertech/forge/tooltip';
import { TOOLTIP_CONSTANTS } from '@tylertech/forge/tooltip';

const component = 'forge-tooltip';

const meta = {
  title: 'Components/Tooltip',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    return html`
      <forge-button variant="raised">Hover me</forge-button>
      <forge-tooltip
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
    }),
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
