import { Story } from "@storybook/react";
import { ForgeRadio } from "@tylertech/forge-react";
import React from "react";
import { IRadioButtonProps } from "../radio-button-args";

export const DefaultTemplate: Story<IRadioButtonProps> = ({
  dense = false,
}) => {
  const radioProps = {
    dense,
  };
  return (
    <div role="radiogroup" aria-label="Choose radio option">
      <ForgeRadio {...radioProps}>
        <input type="radio" id="radio-1" name="radios" value="one" />
        <label htmlFor="radio-1">Option 1</label>
      </ForgeRadio>
      <ForgeRadio {...radioProps}>
        <input type="radio" id="radio-2" name="radios" value="two" />
        <label htmlFor="radio-2">Option 2</label>
      </ForgeRadio>
      <ForgeRadio {...radioProps}>
        <input type="radio" id="radio-3" name="radios" value="three" />
        <label htmlFor="radio-3">Option 3</label>
      </ForgeRadio>
    </div>
  );
}
