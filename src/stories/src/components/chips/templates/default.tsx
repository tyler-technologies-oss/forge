import React, { useEffect } from 'react';
import { Story } from "@storybook/react";
import { ForgeChip, ForgeChipSet, ForgeIcon } from "@tylertech/forge-react";
import { IChipsProps } from "../chips-args";
import { ChipType, IChipSetComponent, IChipComponent, IconRegistry } from '@tylertech/forge';
import { tylIconBookmark, tylIconDirections, tylIconEvent } from '@tylertech/tyler-icons/standard';

export const DefaultTemplate: Story<IChipsProps> = ({
  dense = false,
  type = 'action' as ChipType,
  vertical = false,
  disabled = false,
  invalid = false,
  hasLeading = false,
  hasTrailing = false,
}) => {
  useEffect(() => {
    IconRegistry.define([
      tylIconEvent,
      tylIconBookmark,
      tylIconDirections
    ]);
  }, []);

  const chipSetProps: Partial<IChipSetComponent> = {
    dense,
    type,
    vertical,
    disabled
  };

  const chipProps: Partial<IChipComponent> = {
    invalid
  };

  return (
    <ForgeChipSet {...chipSetProps}>
      <ForgeChip {...chipProps}>
        {hasLeading && <ForgeIcon slot="leading" name="event" />}
        Small
        {hasTrailing && <ForgeIcon slot="trailing" name="event" />}
      </ForgeChip>
      <ForgeChip {...chipProps} selected>
        {hasLeading && <ForgeIcon slot="leading" name="bookmark" />}
        Medium
        {hasTrailing && <ForgeIcon slot="trailing" name="bookmark" />}
      </ForgeChip>
      <ForgeChip {...chipProps}>
        {hasLeading && <ForgeIcon slot="leading" name="directions" />}
        Large
        {hasTrailing && <ForgeIcon slot="trailing" name="directions" />}
      </ForgeChip>
    </ForgeChipSet>
  );
}
