import React, { MutableRefObject, useEffect, useRef } from 'react';
import { Story } from '@storybook/react';
import { ICheckboxProps } from '../checkbox-args';
import { ForgeCheckbox } from '@tylertech/forge-react';

export const DefaultTemplate: Story<ICheckboxProps> = ({
  checked = false,
  dense = false,
  hasLabel = false
}) => {
  const inputRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
  const checkboxProps = { dense };

  useEffect(() => {
    const input = inputRef.current as HTMLInputElement;
    input.checked = checked;
  });

  return (
    <ForgeCheckbox {...checkboxProps}>
      <input ref={inputRef} type="checkbox" id="checkbox-field" />
      {hasLabel && <label htmlFor="checkbox-field">Label</label>}
    </ForgeCheckbox>
  );
};
