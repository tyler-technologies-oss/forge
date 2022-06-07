import React from 'react';
import { Meta, Story } from '@storybook/react';
import { IRadioButtonProps, argTypes } from './radio-button-args';
import { ForgeRadio } from '@tylertech/forge-react';

const MDX = require('./radio-button.mdx').default;

export default {
  title: 'Components/Radio Button',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IRadioButtonProps> = ({ dense = false }) => {
  return (
    <div role="radiogroup" aria-label="Choose radio option">
      <ForgeRadio dense={dense}>
        <input type="radio" id="radio-1" name="radios" value="one" />
        <label htmlFor="radio-1">Option 1</label>
      </ForgeRadio>
      <ForgeRadio dense={dense}>
        <input type="radio" id="radio-2" name="radios" value="two" />
        <label htmlFor="radio-2">Option 2</label>
      </ForgeRadio>
      <ForgeRadio dense={dense}>
        <input type="radio" id="radio-3" name="radios" value="three" />
        <label htmlFor="radio-3">Option 3</label>
      </ForgeRadio>
    </div>
  );
};
Default.args = {
  dense: false
} as IRadioButtonProps;
