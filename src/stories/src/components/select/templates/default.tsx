import { Story } from "@storybook/react";
import { ForgeIcon, ForgeIconButton, ForgeOption, ForgeSelect } from "@tylertech/forge-react";
import React, { useEffect } from "react";
import { IconRegistry } from '@tylertech/forge';
import { ISelectProps } from "../select-args";
import { tylIconFastfood } from '@tylertech/tyler-icons/standard';

export const DefaultTemplate: Story<ISelectProps> = ({
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
  hasAddonEnd = false,
}) => {
  useEffect(() => {
    IconRegistry.define(tylIconFastfood)
  }, []);

  const selectProps = {
    label,
    multiple,
    open,
    disabled,
    invalid,
    required,
    density,
    floatLabelType,
    shape,
    placeholder,
  };
  return (
    <ForgeSelect {...selectProps} style={{ width: '259px' }}>
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
