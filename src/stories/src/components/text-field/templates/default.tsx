import React, { useEffect } from 'react';
import { Story } from '@storybook/react';
import { ForgeIcon, ForgeIconButton, ForgeTextField } from '@tylertech/forge-react';
import { ITextFieldProps } from "../text-field-args";
import { IconRegistry } from '@tylertech/forge';
import { tylIconEvent, tylIconMoreVert, tylIconSend } from '@tylertech/tyler-icons/standard';

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
  useEffect(() => {
    IconRegistry.define([tylIconEvent, tylIconMoreVert, tylIconSend]);
  }, []);

  return (
    <ForgeTextField
      density={density}
      floatLabelType={floatLabelType}
      shape={shape}
      invalid={invalid}
      required={required}
      style={{width:  '259px'}}>
      {hasLeading && <ForgeIcon slot="leading" name="event" />}

      <input autoComplete="off" type="text" id="input-text" disabled={disabled} placeholder={hasPlaceholder ? 'Enter first name...' : undefined} />
      {hasLabel && <label htmlFor="input-text" slot="label">{label}</label>}

      {hasTrailing &&
        <ForgeIconButton slot="trailing" dense densityLevel={density === 'dense' ? 6 : 3}>
          <button type="button">
            <ForgeIcon name="send" />
          </button>
        </ForgeIconButton>}

      {hasAddonEnd &&
        <ForgeIconButton slot="addon-end" dense density-level={density === 'dense' ? 6 : 3}>
          <button type="button">
            <ForgeIcon name="more_vert" />
          </button>
        </ForgeIconButton>}

      {hasHelperText && <span slot="helper-text">Please enter your</span>}
    </ForgeTextField>
  );
};
