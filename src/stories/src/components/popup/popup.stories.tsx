import { Meta, Story } from '@storybook/react';
import { IButtonComponent, PopupAnimationType } from '@tylertech/forge';
import { ForgeButton, ForgePopup } from '@tylertech/forge-react';
import React, { CSSProperties, useRef, useState } from 'react';
import { argTypes, IPopupProps } from './popup-arg';

const MDX = require('./popup.mdx').default;

export default {
  title: 'Components/Popup',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IPopupProps> = ({
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
  return (
    <div style={demoContainer}>
      <ForgeButton variant="raised" ref={targetRef} onClick={() => setIsOpen(!isOpen)}>Open popup</ForgeButton>

      <ForgePopup
        targetElementRef={targetRef}
        open={isOpen}
        onDismiss={() => setIsOpen(false)}
        options={{ placement, manageFocus, animationType, offset }}>
        <div style={{ width: '256px', padding: '16px' }}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum, est iste.
          Tempore iure iste molestias expedita, laboriosam magni a nostrum, ullam molestiae,
          obcaecati dicta ipsam provident aut praesentium eius dolore!
        </div>
      </ForgePopup>
    </div>
  );
};
Default.args = {
  placement: 'bottom-start',
  manageFocus: false,
  animationType: PopupAnimationType.Dropdown,
  offset: { x: 0, y: 0 }
} as IPopupProps;
