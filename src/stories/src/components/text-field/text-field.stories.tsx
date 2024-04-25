import React, { useEffect } from 'react';
import { Meta, Story } from '@storybook/react';
import { textFieldArgTypes, textFieldTextareaArgTypes, ITextFieldProps, ITextFieldTextareaProps } from './text-field-args';
import { ForgeIcon, ForgeIconButton, ForgeTextField } from '@tylertech/forge-react';
import { IconRegistry } from '@tylertech/forge';
import { tylIconEvent, tylIconMoreVert, tylIconSend } from '@tylertech/tyler-icons/standard';

const MDX = require('./text-field.mdx').default;

export default {
  title: 'Components/Text field',
  parameters: {
    docs: { page: MDX }
  }
} as Meta;

export const Default: Story<ITextFieldProps> = ({
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

      {hasLabel && <label htmlFor="input-text" slot="label">{label}</label>}
      <input autoComplete="off" type="text" id="input-text" disabled={disabled} placeholder={hasPlaceholder ? 'Enter first name...' : undefined} />

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
Default.argTypes = textFieldArgTypes;
Default.args = {
  density: 'default',
  floatLabelType: 'auto',
  shape: 'default',
  label: 'First name',
  invalid: false,
  required: false,
  disabled: false,
  hasPlaceholder: false,
  hasLabel: true,
  hasLeading: false,
  hasTrailing: false,
  hasHelperText: false,
  hasAddonEnd: false,
} as ITextFieldProps;

export const Textarea: Story<ITextFieldTextareaProps> = ({
  floatLabelType = 'auto',
  invalid = false,
  required = false,
  disabled = false,
  hasPlaceholder = false,
  hasLabel = true,
  hasHelperText = false
}) => (
  <ForgeTextField floatLabelType={floatLabelType} invalid={invalid} required={required} style={{width: '512px'}}>
    {hasLabel && <label htmlFor="input-textarea" slot="label">Description</label>}
    <textarea autoComplete="off" id="input-textarea" disabled={disabled} rows={10} placeholder={hasPlaceholder ? 'Enter description...' : undefined}></textarea>
    {hasHelperText && <span slot="helper-text">Please enter a description</span>}
  </ForgeTextField>
);
Textarea.argTypes = textFieldTextareaArgTypes;
Textarea.args = {
  floatLabelType: 'auto',
  invalid: false,
  required: false,
  disabled: false,
  hasPlaceholder: false,
  hasLabel: true,
  hasHelperText: false
} as ITextFieldTextareaProps;
