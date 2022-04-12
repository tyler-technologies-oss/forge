import { Story } from '@storybook/react';
import { ForgeButton, ForgeFilePicker } from '@tylertech/forge-react';
import React from 'react';
import { IFilePickerProps } from '../file-picker-args';

export const DefaultTemplate: Story<IFilePickerProps> = ({
  accept = '',
  maxSize = 0,
  multiple = false,
  disabled = false,
  compact = false,
  borderless = false,
}) => {
  const styles = {
    '--forge-file-picker-width': '320px',
    width: '320px',
  };
  const filePickerProps = {
    accept,
    maxSize,
    multiple,
    disabled,
    compact,
    borderless,
  };
  return (
    <ForgeFilePicker {...filePickerProps} style={styles}>
      <span slot="primary">Drag files here or</span>
      <span slot="secondary">Secondary text here</span>
      <ForgeButton type="outlined">
        <button type="button">Select files</button>
      </ForgeButton>
      <span slot="helper-text"></span>
    </ForgeFilePicker>
  );
};
