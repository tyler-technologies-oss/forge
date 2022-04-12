import React, { MutableRefObject, useEffect, useRef } from 'react';
import { Story } from "@storybook/react";
import { ForgeIconButton, ForgeTextField } from "@tylertech/forge-react";
import { ITextFieldProps } from "../text-field-args";

export const SearchFieldTemplate: Story<ITextFieldProps> = props => {
  const textfieldProps = {
    density: props.density,
    floatLabelType: props.floatLabelType,
    shape: props.shape,
    invalid: props.invalid,
    required: props.required,
    disabled: props.disabled,
  };
  const inputRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    const input = inputRef.current as HTMLInputElement;
    input.disabled = props.disabled;
    input.required = props.required;
    input.placeholder = 'Search...';
  });
  return (
    <ForgeTextField {...textfieldProps}>
      <ForgeIconButton slot="leading" dense="true">
        <button className="tyler-icons">search</button>
      </ForgeIconButton>
      <input ref={inputRef} type="text" id="search-field" />
      <ForgeIconButton slot="trailing" dense="true">
        <button className="tyler-icons">close</button>
      </ForgeIconButton>
    </ForgeTextField>
  );
};
