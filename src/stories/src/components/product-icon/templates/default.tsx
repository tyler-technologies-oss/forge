import { Story } from '@storybook/react';
import { ForgeProductIcon } from '@tylertech/forge-react';
import React, { FC } from 'react';
import { IProductIconProps } from '../product-icon-args';

export const DefaultTemplate: Story<IProductIconProps> = ({
  color = 'indigo-500',
  size = 64,
  shadow = true,
  iterations = 32,
  contentType = 'icon',
  tylerIcon = 'accessibility',
}) => {
  const Content: FC<{tylerIcon: string}> = ({tylerIcon}) => contentType === 'icon'
    ? (<i className="tyler-icons">{tylerIcon}</i>)
    : (<span slot="text">FB</span>);
  const productIconProps = {
    color,
    size,
    shadow,
    iterations,
  };
  return (
    <ForgeProductIcon {...productIconProps}>
      <Content tylerIcon={tylerIcon}/>
    </ForgeProductIcon>
  );
};
