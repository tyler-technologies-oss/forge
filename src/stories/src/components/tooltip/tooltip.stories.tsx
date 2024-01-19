import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ForgeButton, ForgeTooltip } from '@tylertech/forge-react';
import { ITooltipProps, argTypes } from './tooltip-args';
import { TOOLTIP_CONSTANTS } from '@tylertech/forge';

const MDX = require('./tooltip.mdx').default;

export default {
  title: 'Components/Tooltip',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<ITooltipProps> = ({
  text = 'Forge components are awesome!',
  delay = TOOLTIP_CONSTANTS.defaults.DELAY,
  placement = TOOLTIP_CONSTANTS.defaults.PLACEMENT
}) => (
  <>
    <ForgeButton variant="raised">Hover me</ForgeButton>
    <ForgeTooltip delay={delay} placement={placement}>{text}</ForgeTooltip>
  </>
);
Default.args = {
  text: 'Forge components are awesome!',
  delay: TOOLTIP_CONSTANTS.defaults.DELAY,
  placement: TOOLTIP_CONSTANTS.defaults.PLACEMENT
} as ITooltipProps;
