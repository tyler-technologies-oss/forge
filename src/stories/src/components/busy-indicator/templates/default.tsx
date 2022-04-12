import { Story } from '@storybook/react';
import { IBusyIndicatorComponent } from '@tylertech/forge';
import { ForgeBusyIndicator, ForgeButton } from '@tylertech/forge-react';
import React, { useState } from 'react';
import { IBusyIndicatorProps } from '../busy-indicator-args';

export const DefaultTemplate: Story<IBusyIndicatorProps> = ({
  titleText = 'Title',
  message = 'Message text...',
  cancel = false,
  spinner = true,
  progressBar = false,
  progressBarDeterminate = false,
  progress = 0,
  buffer = 0,
  width = 0,
  direction = 'row',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const hide = () => setIsOpen(false);
  const show = () => {
    setIsOpen(true);
    setTimeout(() => {
      const busyElement = document.querySelector('forge-busy-indicator') as IBusyIndicatorComponent;
      setBusyStyle(busyElement);

      // BUG(DerekMoss): not sure why progress is not working and cancel is not triggering.
      // same as below on the wrapper component 'on-forge-busy-indicator-cancel={}`
      if(busyElement.progressBarDeterminate) {
        const progressInterval = setInterval(() => {
          busyElement.progress += 0.01;
          console.log(busyElement.progress);
          if (busyElement.progress > 1) {
            hide();
            clearInterval(progressInterval);
          }
        }, 10);  
        clearInterval(progressInterval);
        setTimeout(() => hide(), 5000);
      }
      setTimeout(() => hide(), 5000);
    });
  };

  const setBusyStyle = (busyElement: IBusyIndicatorComponent) => {
    busyElement.style.display = 'block';
    busyElement.style.zIndex = '9999';
    busyElement.style.position = 'fixed';
    busyElement.style.top = '0';
    busyElement.style.bottom = '0';
    busyElement.style.left = '0';
    busyElement.style.right = '0';
  };

  const busyIndicatorProps = {
    titleText,
    message,
    cancel,
    spinner,
    progressBar,
    progressBarDeterminate,
    progress,
    buffer,
    width,
    direction,
  };

  const onCancel = evt => {
    const busyElement = document.querySelector('forge-busy-indicator');
    if(!!busyElement && busyElement.progressBarDeterminate) {
      setBusyStyle(busyElement);
      const progressInterval = setInterval(() => {
        busyElement.progress += 0.01
        if (busyElement.progress > 1) {
          hide();
          clearInterval(progressInterval);
        }
      }, 50);  
      clearInterval(progressInterval);
      setTimeout(() => hide(), 1000);
    }
  }
  return (
    <>
      <ForgeButton type="raised">
        <button onClick={show}>Show busy</button>
      </ForgeButton>
      <ForgeBusyIndicator
      on-forge-busy-indicator-cancel={evt => onCancel(evt)}
      open={isOpen}
      options={busyIndicatorProps}></ForgeBusyIndicator>
    </>
  );
};
