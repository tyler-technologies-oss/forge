import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Story } from "@storybook/react";
import { ForgeTextField } from "@tylertech/forge-react";
import { ITextFieldProps } from "../text-field-args";

export const QuestionairreTemplate: Story<ITextFieldProps> = props => {
  const textfieldProps = {
    density: props.density,
    floatLabelType: props.floatLabelType,
    shape: props.shape,
    invalid: props.invalid,
    required: props.required,
    disabled: props.disabled,
  };
  const [count, setCount] = useState<number>(0);
  const textAreaRef = useRef<HTMLTextAreaElement>() as MutableRefObject<HTMLTextAreaElement>;
  useEffect(() => {
    const input = textAreaRef.current as HTMLTextAreaElement;
    input.disabled = props.disabled;
    input.required = props.required;
    input.placeholder = 'Add your description...';
  });
  return (
    <>
      <label
      className="forge-typography--body2">
        Provide a brief description of relevant skillwork for this position.
      </label>
      <ForgeTextField {...textfieldProps}>
        <textarea 
        ref={textAreaRef} 
        onInput={() => {
          const textArea = textAreaRef.current as HTMLTextAreaElement;
          setCount(textArea.value.length);
        }}
        maxLength={500}
        id="questionairre-textarea"></textarea>
        <span slot="helper-text" style={{textAlign: 'end'}}>&lt;{count}/500&gt;</span>
      </ForgeTextField>
    </>
  );
};
