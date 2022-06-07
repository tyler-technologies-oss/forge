import React, { useEffect } from 'react';
import { Meta, Story } from '@storybook/react';
import { IconRegistry } from '@tylertech/forge';
import { ForgeIcon, ForgeLabelValue } from '@tylertech/forge-react';
import { tylIconPerson } from '@tylertech/tyler-icons/standard';
import { argTypes, ILabelValueProps } from './label-value-args';

const MDX = require('./label-value.mdx').default;

export default {
  title: 'Components/Label Value',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<ILabelValueProps> = ({
  empty = false,
  density = 'default',
  align = 'left',
  ellipsis = false,
  singleLine = false,
  hasIcon = false
}) => {
  useEffect(() => {
    IconRegistry.define(tylIconPerson);
  }, []);

  return (
    <ForgeLabelValue
      single-line={singleLine}
      empty={empty}
      density={density}
      align={align}
      ellipsis={ellipsis}
      style={{ maxWidth: ellipsis ? '100px' : null }}>
      {hasIcon && <ForgeIcon slot="icon" name="person" />}
      <span slot="label">Label</span>
      <span slot="value">{empty ? 'n/a' : (ellipsis ? 'Long value text with ellipsis' : 'Value')}</span>
    </ForgeLabelValue>
  );
};

Default.args = {
  empty: false,
  density: 'default',
  align: 'left',
  ellipsis: false,
  singleLine: false,
  hasIcon: false
} as ILabelValueProps;
