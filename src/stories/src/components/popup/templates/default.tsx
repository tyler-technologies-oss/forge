import { Story } from '@storybook/react';
import { IPopupPosition, PopupAnimationType } from '@tylertech/forge';
import { ForgeButton, ForgePopup, ForgePopupOptions } from '@tylertech/forge-react';
import React, { CSSProperties, useRef, useState } from 'react';
import { IPopupProps } from '../popup-arg';

export const DefaultTemplate: Story<IPopupProps> = ({
  placement = 'bottom-start',
  manageFocus = false,
  animationType = PopupAnimationType.Dropdown,
  offset
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const targetRef = useRef<any>();
  const demoContainer: CSSProperties = {
    padding: '256px',
    textAlign: 'center'
  };
  const popupProps: ForgePopupOptions & { offset: IPopupPosition } = {
    placement,
    manageFocus,
    animationType,
    offset
  };
  return (
    <div style={demoContainer}>
      <ForgeButton type="raised" ref={targetRef}>
        <button type="button" onClick={() => setIsOpen(!isOpen)}>Open popup</button>
      </ForgeButton>
      <ForgePopup targetElementRef={targetRef} open={isOpen} onDismiss={() => setIsOpen(false)} options={{ ...popupProps }}>
        <div style={{ width: '256px', padding: '16px' }} className="forge-typography--body1">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum, est iste.
          Tempore iure iste molestias expedita, laboriosam magni a nostrum, ullam molestiae,
          obcaecati dicta ipsam provident aut praesentium eius dolore!
        </div>
      </ForgePopup>
    </div>
  );
};
