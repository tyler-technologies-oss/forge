import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ForgeIconButton, ForgeQuantityField, ForgeTextField } from '@tylertech/forge-react';
import { IQuantityFieldProps, argTypes } from './quantity-field-args';

const MDX = require('./quantity-field.mdx').default;

export default {
  title: 'Components/Quantity Field',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IQuantityFieldProps> = ({ invalid = false, required = false }) => {
  return (
    <ForgeQuantityField invalid={invalid} required={required}>
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
};
Default.args = {
  invalid: false,
  required: false
} as IQuantityFieldProps;
