import React from 'react';
import { Story } from "@storybook/react";
import { ILinearProgressProps } from '../linear-progress-args';
import { ForgeLinearProgress } from '@tylertech/forge-react';

export const DefaultTemplate: Story<ILinearProgressProps> = ({
  determinate = true,
  progress = 0.5,
  buffer = 1,
  visible = true,
}) => {
  const linearProgressProps = {
    determinate,
    progress,
    buffer,
    visible,
  };
  return (    
    <ForgeLinearProgress style={{width: '100%'}} {...linearProgressProps} progressbar-aria-label="Loading" />
  );
}
