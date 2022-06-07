import React, { useEffect } from 'react';
import { Meta, Story } from '@storybook/react';
import { argTypes, IChipsProps } from './chips-args';
import { ForgeChip, ForgeChipSet, ForgeIcon } from '@tylertech/forge-react';
import { ChipType, IconRegistry } from '@tylertech/forge';
import { tylIconBookmark, tylIconDirections, tylIconEvent } from '@tylertech/tyler-icons/standard';

const MDX = require('./chips.mdx').default;

export default {
  title: 'Components/Chips',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IChipsProps> = ({
  dense = false,
  type = 'choice' as ChipType,
  vertical = false,
  disabled = false,
  invalid = false,
  hasLeading = false,
  hasTrailing = false
}) => {
  useEffect(() => {
    IconRegistry.define([tylIconEvent, tylIconBookmark, tylIconDirections]);
  }, []);

  return (
    <ForgeChipSet dense={dense} type={type} vertical={vertical} disabled={disabled}>
      <ForgeChip invalid={invalid}>
        {hasLeading && <ForgeIcon slot="leading" name="event" />}
        Small
        {hasTrailing && <ForgeIcon slot="trailing" name="event" />}
      </ForgeChip>
      <ForgeChip invalid={invalid}>
        {hasLeading && <ForgeIcon slot="leading" name="bookmark" />}
        Medium
        {hasTrailing && <ForgeIcon slot="trailing" name="bookmark" />}
      </ForgeChip>
      <ForgeChip invalid={invalid}>
        {hasLeading && <ForgeIcon slot="leading" name="directions" />}
        Large
        {hasTrailing && <ForgeIcon slot="trailing" name="directions" />}
      </ForgeChip>
    </ForgeChipSet>
  );
};
Default.args = {
  dense: false,
  type: 'choice',
  vertical: false,
  disabled: false,
  invalid: false,
  hasLeading: false,
  hasTrailing: false,
} as IChipsProps;
