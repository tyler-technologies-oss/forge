import { Meta } from '@storybook/react';
import { argTypes, IBackdropProps } from './backdrop-args';
import React, { useRef } from 'react';
import { Story } from '@storybook/react';
import { ForgeBackdrop, ForgeButton } from '@tylertech/forge-react';
import { IBackdropComponent } from '@tylertech/forge';

const MDX = require('./backdrop.mdx').default;

export default {
  title: 'Components/Backdrop',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default: Story<IBackdropProps> = ({
  visible = false
}) => {
  const backdropRef = useRef<IBackdropComponent>();
  
  const openBackdrop = () => {
    const backdrop = backdropRef.current as IBackdropComponent;
    backdrop.style.display = 'block';
    backdrop.fadeIn();
  }

  const closeBackdrop = () => {
    const backdrop = backdropRef.current as IBackdropComponent;
    backdrop.fadeOut().then(() => backdrop.style.display = 'none');
  }

  return (
    <>
      <ForgeButton variant="raised" onClick={openBackdrop}>Show backdrop</ForgeButton>
      <p className="forge-typography--label">(When open, click backdrop to close)</p>
      <ForgeBackdrop
        ref={backdropRef}
        visible={visible}
        click={() => closeBackdrop()}
        style={{display: 'none'}}></ForgeBackdrop>
    </>
  );
};
Default.args = {
  visible: false
} as IBackdropProps;
