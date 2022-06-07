import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ForgeLinearProgress } from '@tylertech/forge-react';
import { argTypes, ILinearProgressProps } from './linear-progress-args';

const MDX = require('./linear-progress.mdx').default;

export default {
  title: 'Components/Linear Progress',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<ILinearProgressProps> = ({
  determinate = true,
  progress = 0.5,
  buffer = 1,
  visible = true
}) => (    
  <ForgeLinearProgress
    determinate={determinate}
    progress={progress}
    buffer={buffer}
    visible={visible}
    progressbar-aria-label="Loading"
    style={{width: '100%'}}/>
);
Default.args = {
  determinate: false,
  progress: 0.5,
  buffer: 1,
  visible: true
} as ILinearProgressProps;
