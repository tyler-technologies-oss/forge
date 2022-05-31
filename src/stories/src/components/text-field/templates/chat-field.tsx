import React, { MutableRefObject, useEffect, useRef } from 'react';
import { Story } from "@storybook/react";
import { ForgeIcon, ForgeIconButton, ForgeTextField } from "@tylertech/forge-react";
import { ITextFieldProps } from "../text-field-args";
import { IconRegistry } from '@tylertech/forge';
import { tylIconSend } from '@tylertech/tyler-icons/standard';

export const ChatFieldTemplate: Story<ITextFieldProps> = ({
  density,
  floatLabelType,
  shape,
  invalid,
  required,
  disabled
}) => {
  const inputRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    IconRegistry.define(tylIconSend);
  }, []);

  useEffect(() => {
    const input = inputRef.current as HTMLInputElement;
    input.disabled = disabled;
    input.required = required;
    input.placeholder = 'Type a message...';
  });

  return (
    <ForgeTextField
      density={density}
      floatLabelType={floatLabelType}
      shape={shape}
      invalid={invalid}
      required={required}
      disabled={disabled}>
      <label htmlFor="chat-field" slot="label">Message</label>
      <input ref={inputRef} type="text" id="chat-field" />
      <ForgeIconButton slot="trailing">
        <button type="button">
          <ForgeIcon name="send" />
        </button>
      </ForgeIconButton>
    </ForgeTextField>
  );
};
