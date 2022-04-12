import React from 'react';
import { Story } from "@storybook/react";
import { ForgeTextField } from "@tylertech/forge-react";
import { ITextFieldTextareaProps } from "../text-field-args";

export const TextareaTemplate: Story<ITextFieldTextareaProps> = ({
  floatLabelType = 'auto',
  invalid = false,
  required = false,
  disabled = false,
  hasPlaceholder = false,
  hasLabel = true,
  hasHelperText = false
}) => {
  return (
    <ForgeTextField {...{ floatLabelType, invalid, required }} style={{width: '512px'}} placeholder={hasPlaceholder ? 'Enter first name...' : undefined}>
      <textarea autoComplete="off" id="input-textarea" disabled={disabled} rows={10}></textarea>
      {hasLabel && <label htmlFor="input-textarea" slot="label">First name with really really really really really really really really really really really really long label</label>}
      {hasHelperText && <span slot="helper-text">Please enter your first name</span>}
    </ForgeTextField>
  );
};
