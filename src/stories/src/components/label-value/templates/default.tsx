import { Story } from '@storybook/react';
import { ForgeIcon, ForgeLabelValue } from '@tylertech/forge-react';
import React, { useEffect } from 'react';
import { ILabelValueComponent, IconRegistry } from '@tylertech/forge';
import { ILabelValueProps } from '../label-value-args';
import { tylIconPerson } from '@tylertech/tyler-icons/standard';

export const DefaultTemplate: Story<ILabelValueProps> = ({
  empty = false,
  density = 'default',
  align = 'left',
  ellipsis = false,
  singleLine = false,
  hasIcon = false,
}) => {
  useEffect(() => {
    IconRegistry.define([tylIconPerson]);
  }, []);

  const labelValueProps: Partial<ILabelValueComponent> = {
    empty,
    density,
    align,
    ellipsis,
  };

  return (
    <ForgeLabelValue single-line={singleLine} {...labelValueProps} style={{ maxWidth: ellipsis ? '100px' : null }}>
      {hasIcon && <ForgeIcon slot="icon" name="person" />}
      <span slot="label">Label</span>
      <span slot="value">{empty ? 'n/a' : (ellipsis ? 'Long value text with ellipsis' : 'Value')}</span>
    </ForgeLabelValue>
  );
};
