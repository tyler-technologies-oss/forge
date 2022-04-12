import React, { useState } from 'react';
import { Story } from "@storybook/react";
import { ForgeButton, ForgeCircularProgress } from "@tylertech/forge-react";
import { IButtonLoadingOnSubmitProps } from '../button-args';

export const LoadingOnSubmitTemplate: Story<IButtonLoadingOnSubmitProps> = props => {
  const [isBusy, setBusy] = useState<boolean>();

  const showSpinner = () => {
    setBusy(true);
    setTimeout(() => setBusy(false), 3000);
  }

  return (
    <ForgeButton type={props.type}>
      <button 
      type="button" 
      onClick={showSpinner} 
      style={{ width: '140px' }} 
      id="button" 
      disabled={isBusy}>
        <span id="button-text">Button</span>
        { isBusy && <ForgeCircularProgress
          determinate={props.determinate}
          id="circular-progress"
          style={{
            marginLeft: '12px',
            '--forge-circular-progress-size': '24'
          }}></ForgeCircularProgress> }
      </button>
    </ForgeButton>
  );
};
