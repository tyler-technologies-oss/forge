import { Story } from "@storybook/react";
import { ForgeIconButton, ForgeQuantityField, ForgeTextField } from "@tylertech/forge-react";
import React from "react";
import { IQuantityFieldProps } from "../quantity-field-args";

export const DefaultTemplate: Story<IQuantityFieldProps> = ({
  invalid = false,
  required = false,
}) => {
  const quantityFieldProps = {
    invalid,
    required,
  };
  return (
    <ForgeQuantityField {...quantityFieldProps}>
      <label slot="label" htmlFor="input-numeric">Label</label>
      <ForgeIconButton slot="decrement-button">
        <button type="button" className="tyler-icons" aria-label="Decrement">remove_circle_outline</button>
      </ForgeIconButton>
      <ForgeTextField>
        <input type="number" id="input-numeric" style={{ textAlign: 'center' }} defaultValue="4" step="2" min="-10" max="10"/>
      </ForgeTextField>
      <ForgeIconButton slot="increment-button">
        <button type="button" className="tyler-icons" aria-label="Increment">control_point</button>
      </ForgeIconButton>
      <div slot="helper-text">This is helpful text</div>
    </ForgeQuantityField>
  );
}
