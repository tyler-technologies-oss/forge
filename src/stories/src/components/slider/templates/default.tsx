import { Story } from "@storybook/react";
import { ForgeSlider } from "@tylertech/forge-react";
import React from "react";
import { ISliderProps } from "../slider-args";

export const DefaultTemplate: Story<ISliderProps> = ({
  type = 'continuous',
  value = 50,
  valueStart = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
}) => {
  const sliderProps = {
    type,
    value,
    valueStart,
    min,
    max,
    step,
    disabled
  };
  return (
    <div style={{ minWidth: '250px', marginTop: '24px' }}>
      <ForgeSlider {...sliderProps} />
    </div>
  );
}
