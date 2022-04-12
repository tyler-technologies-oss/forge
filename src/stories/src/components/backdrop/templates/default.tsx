import React, { CSSProperties, MutableRefObject, useRef } from 'react';
import { Story } from '@storybook/react';
import { ForgeBackdrop, ForgeButton } from '@tylertech/forge-react';
import { IBackdropProps } from '../backdrop-args';
import { IBackdropComponent } from '@tylertech/forge';

export const DefaultTemplate: Story<IBackdropProps> = ({
  delay = 0,
  maxOpacity = 0.54,
  appearance = 'dark',
}) => {
  const backdropProps = {
    delay,
    maxOpacity,
    appearance
  };
  const backdropRef = useRef<IBackdropComponent>();
  const backdropLabelRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  
  const openBackdrop = () => {
    const backdrop = backdropRef.current as IBackdropComponent;
    const backdropLabel = backdropLabelRef.current as HTMLDivElement;
    backdrop.style.display = 'block';
    backdrop.fadeIn();    
    backdropLabel.style.opacity = '1';
  }

  const closeBackdrop = () => {
    const backdrop = backdropRef.current as IBackdropComponent;
    const backdropLabel = backdropLabelRef.current as HTMLDivElement;
    backdrop.fadeOut().then(() => backdrop.style.display = 'none');
    backdropLabel.style.opacity = '0';
  }

  const defaultStyles: CSSProperties = {
    opacity: 0,
    zIndex: 7,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    fontSize: '3rem',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  };

  return (
    <>
      <ForgeButton type="raised">
        <button onClick={openBackdrop}>Show backdrop</button>
      </ForgeButton>
      <ForgeBackdrop ref={backdropRef} on-forge-backdrop-click={() => closeBackdrop()} {...backdropProps} style={{display: 'none'}}></ForgeBackdrop>
      <div style={defaultStyles} ref={backdropLabelRef}>Click to close backdrop</div>
    </>
  );
};
