import React, { useState } from 'react';
import { Story } from '@storybook/react';
import { ForgeBottomSheet, ForgeButton } from '@tylertech/forge-react';
import { IBottomSheetProps } from '../bottom-sheet-args';
import { LOREM_IPSUM } from '../../../mock/lorem-ipsum';

export const DefaultTemplate: Story<IBottomSheetProps> = ({
  showBackdrop = false,
  backdropClose = true,
  escapeClose = true,
  fullscreen = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);  
  const hide = () => setIsOpen(false);
  const show = () => setIsOpen(true);
  const bottomSheetProps = {
    showBackdrop,
    backdropClose,
    escapeClose,
    fullscreen
  };
  return (
    <>
      <ForgeButton type="raised">
        <button onClick={show}>Show bottom sheet</button>
      </ForgeButton>

      <ForgeBottomSheet open={isOpen} options={bottomSheetProps} onDismiss={hide}>
        <header className="forge-dialog__header">
          <h2 className="forge-dialog__title">Bottom sheet header</h2>
        </header>
        <section className="forge-dialog__body forge-bottom-sheet__body">
          {LOREM_IPSUM.p1.slice(0, 162)}
        </section>
        <footer className="forge-dialog__footer">
          <ForgeButton type="raised" style={{ marginRight: 16 }}>
            <button id="close-button" onClick={hide}>Close</button>
          </ForgeButton>
        </footer>
      </ForgeBottomSheet>
    </>
  );
};
