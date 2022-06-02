import React from 'react';
import { Meta, Story } from '@storybook/react';
import { argTypes, IBusyIndicatorProps } from './busy-indicator-args';
import { ForgeButton, useForgeBusyIndicator } from '@tylertech/forge-react';
import { BUSY_INDICATOR_CONSTANTS, IBusyIndicatorComponent } from '@tylertech/forge';

const MDX = require('./busy-indicator.mdx').default;

export default {
  title: 'Components/Busy Indicator',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IBusyIndicatorProps> = ({
  titleText = 'Title',
  message = 'Message text...',
  cancel = false,
  spinner = true,
  progressBar = false,
  progressBarDeterminate = false,
  progress = 0,
  buffer = 1,
  width = 'auto',
  direction = 'row'
}) => {
  if (typeof width === 'number' && width <= 0) {
    width = 'auto';
  }

  let progressInterval: number;
  
  // We could alternatively use the <ForgeBusyIndicator> React component instead of the hook if desired
  const [showBusyIndicator, hideBusyIndicator] = useForgeBusyIndicator();
  const hide = () => hideBusyIndicator();
  const show = () => {
    const busyIndicatorElement = showBusyIndicator({
      titleText,
      message,
      cancel,
      spinner,
      progressBar,
      progressBarDeterminate,
      progress,
      buffer,
      width,
      direction
    });

    if (cancel) {
      busyIndicatorElement.addEventListener(BUSY_INDICATOR_CONSTANTS.events.CANCEL, () => onCancel(busyIndicatorElement));
    }

    if(busyIndicatorElement.progressBarDeterminate) {
      progressInterval = window.setInterval(() => {
        busyIndicatorElement.progress += 0.05;
        console.log(busyIndicatorElement.progress);
        if (busyIndicatorElement.progress > 1) {
          hide();
          clearInterval(progressInterval);
        }
      }, 100);
    } else {
      setTimeout(() => hide(), 3000);
    }
  };

  function onCancel(busyElement: IBusyIndicatorComponent): void {
    if(busyElement.progressBarDeterminate) {
      clearInterval(progressInterval);
      setTimeout(() => hide(), 1000);
    } else {
      hide();
    }
  };

  return (
    <ForgeButton type="raised">
      <button type="button" onClick={show}>Show busy</button>
    </ForgeButton>
  );
};
Default.args = {
  titleText: 'Title',
  message: 'Message text...',
  cancel: false,
  spinner: true,
  progressBar: false,
  progressBarDeterminate: false,
  progress: 0,
  buffer: 1,
  width: 0,
  direction: 'row',
} as IBusyIndicatorProps;
