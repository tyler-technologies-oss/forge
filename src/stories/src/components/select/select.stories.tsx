import React, { useEffect } from 'react';
import { Meta, Story } from '@storybook/react';
import { ForgeIcon, ForgeIconButton, ForgeOption, ForgeSelect } from '@tylertech/forge-react';
import { IconRegistry } from '@tylertech/forge';
import { tylIconFastfood } from '@tylertech/tyler-icons/standard';
import { ISelectProps, argTypes } from './select-args';

const MDX = require('./select.mdx').default;

export default {
  title: 'Components/Select',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<ISelectProps> = ({
  label = 'Food group',
  multiple = false,
  open = false,
  disabled = false,
  invalid = false,
  required = false,
  density = 'default',
  floatLabelType = 'default',
  shape = 'default',
  placeholder = '',
  hasLeadingIcon = false,
  hasHelperText = false,
  hasAddonEnd = false
}) => {
  useEffect(() => {
    IconRegistry.define(tylIconFastfood)
  }, []);

  return (
    <ForgeSelect 
      label={label}
      multiple={multiple}
      open={open}
      disabled={disabled}
      invalid={invalid}
      required={required}
      density={density}
      floatLabelType={floatLabelType}
      shape={shape}
      placeholder={placeholder}
      style={{ width: '259px' }}>
      {hasLeadingIcon && <ForgeIcon slot="leading" name="fastfood" />}
      <ForgeOption value="grains">Bread, Cereal, Rice, and Pasta</ForgeOption>
      <ForgeOption value="vegetables">Vegetables</ForgeOption>
      <ForgeOption value="fruit">Fruit</ForgeOption>
      {hasHelperText && <span slot="helper-text">Food group is required</span>}
      {hasAddonEnd &&
        <ForgeIconButton slot="addon-end" dense density-level={density === 'dense' ? 6 : 3}>
          <button type="button" className="tyler-icons">more_vert</button>
        </ForgeIconButton>}
    </ForgeSelect>
  );
};
Default.args = {
  density: 'default',
  floatLabelType: 'auto',
  shape: 'default',
  invalid: false,
  required: false,
  disabled: false,
  multiple: false,
  open: false,
  label: 'Food group',
  placeholder: '',
  hasLeadingIcon: false,
  hasHelperText: false,
  hasAddonEnd: false,
} as ISelectProps;
