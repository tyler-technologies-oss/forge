import React, { MutableRefObject, useEffect, useRef } from 'react';
import { Story } from "@storybook/react";
import { ForgeIconButton, ForgeTextField } from "@tylertech/forge-react";
import { ITextFieldProps } from "../text-field-args";

export const ChatFieldTemplate: Story<ITextFieldProps> = props => {
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
    input.placeholder = 'Type a message...';
  });
  return (
    <ForgeTextField {...textfieldProps}>
      <label htmlFor="chat-field" slot="label">
        Message
      </label>
      <input ref={inputRef} type="text" id="chat-field" />
      <ForgeIconButton slot="trailing">
        <button className="tyler-icons">send</button>
      </ForgeIconButton>
    </ForgeTextField>
  );
};
