import React, { useState } from "react";
import { Story } from "@storybook/react";
import { ForgeButton, ForgeDialog } from "@tylertech/forge-react";
import { IDialogProps } from "../dialog-args";
import { LOREM_IPSUM } from "../../../mock/lorem-ipsum";
import { DialogPositionType, IDialogComponent } from '@tylertech/forge';

export const SimpleTemplate: Story<IDialogProps> = ({
  backdropClose = true,
  escapeClose = true,
  fullscreen = false,
  moveable = true,
  customPosition = false,
  positionX = 0,
  positionY = 0,
  positionType = 'absolute' as DialogPositionType,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);  
  const hide = () => setIsOpen(false);
  const show = () => setIsOpen(true);
  const dialogProps: any = {
    backdropClose,
    escapeClose,
    fullscreen,
    moveable,
    positionType
  };
  if (customPosition) {
    dialogProps.positionX = positionX;
    dialogProps.positionY = positionY;
  }
  return (
    <>
      <ForgeButton type="raised">
        <button onClick={show}>Show dialog</button>
      </ForgeButton>
      <ForgeDialog open={isOpen} options={dialogProps} onDismiss={hide}>
        <header className="forge-dialog__header" forge-dialog-move-target="">
          <h2 className="forge-dialog__title">Discard draft?</h2>
        </header>
        <section className="forge-dialog__body" style={{ width: '500px' }}>
          {LOREM_IPSUM.p1.slice(0, 162)}
        </section>
        <footer className="forge-dialog__footer">
          <ForgeButton type="outlined" style={{ marginRight: 16 }}>
            <button onClick={hide}>Cancel</button>
          </ForgeButton>
          <ForgeButton type="raised">
            <button onClick={hide} forge-dialog-focus="true">Discard</button>
          </ForgeButton>
        </footer>
      </ForgeDialog>
    </>
  );
};
