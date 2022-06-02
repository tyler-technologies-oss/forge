import React, { MutableRefObject, useEffect, useRef } from 'react';
import { Meta, Story } from '@storybook/react';
import { argTypes, ICheckboxProps } from './checkbox-args';
import { ForgeCheckbox } from '@tylertech/forge-react';

const MDX = require('./checkbox.mdx').default;

export default {
  title: 'Components/Checkbox',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<ICheckboxProps> = ({
  checked = false,
  dense = false,
  hasLabel = false
}) => {
  const inputRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
  
  useEffect(() => {
    const input = inputRef.current as HTMLInputElement;
    input.checked = checked;
  });

  return (
    <ForgeCheckbox dense={dense}>
      <input ref={inputRef} type="checkbox" id="checkbox-field" />
      {hasLabel && <label htmlFor="checkbox-field" slot="label">Label</label>}
    </ForgeCheckbox>
  );
};
Default.args = {
  checked: false,
  dense: false,
  hasLabel: true,
} as ICheckboxProps;
