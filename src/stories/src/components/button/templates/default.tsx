import React from 'react';
import { Story } from "@storybook/react";
import { ForgeButton } from "@tylertech/forge-react";
import { IButtonProps } from "../button-args";

export const DefaultTemplate: Story<IButtonProps> = ({
  type = 'flat',
  text = 'Button',
}) => {
  const buttonProps = {
    type,
  };
  return (
    <ForgeButton {...buttonProps}>
      <button>
        {text}
      </button>
    </ForgeButton>
  )
};
