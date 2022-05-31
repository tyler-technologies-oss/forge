import React, { MutableRefObject, useEffect, useRef } from 'react';
import { Story } from "@storybook/react";
import { ForgeIcon, ForgeIconButton, ForgeTextField } from "@tylertech/forge-react";
import { ITextFieldProps } from "../text-field-args";
import { IconRegistry } from '@tylertech/forge';
import { tylIconClose, tylIconSearch } from '@tylertech/tyler-icons/standard';

export const SearchFieldTemplate: Story<ITextFieldProps> = ({
  density,
  floatLabelType,
  shape,
  invalid,
  required,
  disabled
}) => {
  const inputRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    IconRegistry.define([tylIconSearch, tylIconClose]);
  }, []);

  useEffect(() => {
    const input = inputRef.current as HTMLInputElement;
    input.disabled = disabled;
    input.required = required;
    input.placeholder = 'Search...';
  });

  return (
    <ForgeTextField
      density={density}
      floatLabelType={floatLabelType}
      shape={shape}
      invalid={invalid}
      required={required}
      disabled={disabled}>
      <ForgeIconButton slot="leading" dense="true">
        <button type="button">
          <ForgeIcon name="search" />
        </button>
      </ForgeIconButton>
      <input ref={inputRef} type="text" id="search-field" />
      <ForgeIconButton slot="trailing" dense="true">
        <button type="button">
          <ForgeIcon name="close" />
        </button>
      </ForgeIconButton>
    </ForgeTextField>
  );
};
