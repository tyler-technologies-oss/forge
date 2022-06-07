import React from 'react';
import { Meta, Story } from '@storybook/react';
import { argTypes, IFilePickerProps } from './file-picker-args';
import { ForgeButton, ForgeFilePicker } from '@tylertech/forge-react';

const MDX = require('./file-picker.mdx').default;

export default {
  title: 'Components/File Picker',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IFilePickerProps> = ({
  accept = '',
  maxSize = 0,
  multiple = false,
  disabled = false,
  compact = false,
  borderless = false,
  hasHelperText = false
}) => {
  const styles = {
    '--forge-file-picker-width': '320px',
    width: '320px'
  };
  return (
    <ForgeFilePicker
      accept={accept}
      maxSize={maxSize}
      multiple={multiple}
      disabled={disabled}
      compact={compact}
      borderless={borderless}
      style={styles}>
      <span slot="primary">Drag files here or</span>
      <span slot="secondary">Secondary text here</span>
      <ForgeButton type="outlined">
        <button type="button">Select files</button>
      </ForgeButton>
      {hasHelperText && <span slot="helper-text">Helper text goes here</span>}
    </ForgeFilePicker>
  );
};
Default.args = {
  accept: '',
  maxSize: 0,
  multiple: false,
  disabled: false,
  compact: false,
  borderless: false,
  hasHelperText: false
} as IFilePickerProps;
