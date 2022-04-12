import { Story } from '@storybook/react';
import { ForgeCircularProgress } from '@tylertech/forge-react';
import React from 'react';
import { ICircularProgressProps } from '../circular-progress-args';

export const DefaultTemplate: Story<ICircularProgressProps> = ({ open = true, determinate = false, progress = 0 }) => (
  <ForgeCircularProgress progressbar-aria-label="Loading" {...{ open, determinate, progress }}></ForgeCircularProgress>
);
