import React, { FC } from 'react';
import { Meta, Story } from '@storybook/react';
import { IProductIconProps, argTypes } from './product-icon-args';
import { ForgeProductIcon } from '@tylertech/forge-react';
import { PRODUCT_ICON_CONSTANTS } from '@tylertech/forge';

const MDX = require('./product-icon.mdx').default;

export default {
  title: 'Components/Product Icon',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IProductIconProps> = ({
  color = 'indigo-500',
  size = PRODUCT_ICON_CONSTANTS.numbers.DEFAULT_SIZE,
  shadow = true,
  iterations = PRODUCT_ICON_CONSTANTS.numbers.DEFAULT_ITERATIONS,
  contentType = 'icon',
  tylerIcon = 'accessibility'
}) => {
  const Content: FC<{tylerIcon: string}> = ({ tylerIcon }) => (
    contentType === 'icon' ? <i className="tyler-icons">{tylerIcon}</i> : <span slot="text">FB</span>
  );
  return (
    <ForgeProductIcon
      color={color}
      size={size}
      shadow={shadow}
      iterations={iterations}>
      <Content tylerIcon={tylerIcon} />
    </ForgeProductIcon>
  );
};
Default.args = {
  color: 'indigo-500',
  size: PRODUCT_ICON_CONSTANTS.numbers.DEFAULT_SIZE,
  shadow: true,
  iterations: PRODUCT_ICON_CONSTANTS.numbers.DEFAULT_ITERATIONS,
  contentType: 'icon',
  tylerIcon: 'accessibility',
} as IProductIconProps;