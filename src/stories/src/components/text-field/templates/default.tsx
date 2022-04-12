import React from 'react';
import { Story } from "@storybook/react";
import { ForgeIconButton, ForgeTextField } from "@tylertech/forge-react";
import { ITextFieldProps } from "../text-field-args";

export const DefaultTemplate: Story<ITextFieldProps> = ({
  density = 'default',
  floatLabelType = 'auto',
  shape = 'default',
  label = 'First name',
  invalid = false,
  required = false,
  disabled = false,
  hasPlaceholder = false,
  hasLabel = true,
  hasLeading = false,
  hasTrailing = false,
  hasHelperText = false,
  hasAddonEnd = false,
}) => {
  return (
    <ForgeTextField {...{ density, floatLabelType, shape, invalid, required }} style={{width:  '259px'}}>
      {hasLeading && <i className="tyler-icons" slot="leading">event</i>}

      <input autoComplete="off" type="text" id="input-text" disabled={disabled} placeholder={hasPlaceholder ? 'Enter first name...' : undefined} />
      {hasLabel && <label htmlFor="input-text" slot="label">{label}</label>}

      {hasTrailing &&
        <ForgeIconButton slot="trailing" dense densityLevel={density === 'dense' ? 6 : 3}>
          <button className="tyler-icons">send</button>
        </ForgeIconButton>}

      {hasAddonEnd &&
        <ForgeIconButton slot="addon-end" dense density-level={density === 'dense' ? 6 : 3}>
          <button type="button" className="tyler-icons">more_vert</button>
        </ForgeIconButton>}

      {hasHelperText && <span slot="helper-text">Please enter your</span>}
    </ForgeTextField>
  );
};
