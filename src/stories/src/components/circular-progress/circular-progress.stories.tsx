import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ForgeCircularProgress } from '@tylertech/forge-react';
import { ICircularProgressProps, argTypes } from './circular-progress-args';

const MDX = require('./circular-progress.mdx').default;

export default {
  title: 'Components/Circular Progress',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<ICircularProgressProps> = ({ open = true, determinate = false, progress = 0 }) => (
  <ForgeCircularProgress
    open={open}
    determinate={determinate}
    progress={progress}
    progressbar-aria-label="Loading" />
);
Default.args = {
  open: true,
  determinate: false,
  progress: 0.5
} as ICircularProgressProps;

export const Custom: Story<ICircularProgressProps> = ({
  open = true,
  determinate = false,
  progress = 0
}) => (
  <ForgeCircularProgress
    open={open}
    determinate={determinate}
    progress={progress}
    style={{
      '--forge-theme-tertiary': 'var(--forge-theme-success)',
      '--forge-circular-progress-track-color': determinate ? 'var(--mdc-theme-text-disabled-on-background)' : null,
      '--forge-circular-progress-size': '150px',
      '--forge-circular-progress-stroke-width': '1px',
    }} />
);
Custom.args = {
  open: true,
  determinate: false,
  progress: 0.5
} as ICircularProgressProps;
