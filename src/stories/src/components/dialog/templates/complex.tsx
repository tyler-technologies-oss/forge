import React, { useState } from "react";
import { Story } from "@storybook/react";
import { ForgeButton, ForgeDialog, ForgeDivider, ForgeIconButton, ForgeToolbar } from "@tylertech/forge-react";
import { IDialogProps } from "../dialog-args";
import { LOREM_IPSUM } from "../../../mock/lorem-ipsum";

export const ComplexTemplate: Story<IDialogProps> = ({
  backdropClose = true,
  escapeClose = true,
  fullscreen = false,
  moveable = true,
  positionX = 0,
  positionY = 0,
  positionType = 'absolute',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const hide = () => setIsOpen(false);
  const show = () => setIsOpen(true);
  const dialogProps = {
    backdropClose,
    escapeClose,
    fullscreen,
    moveable,
    positionX,
    positionY,
    positionType,
  };
  return (
    <>
      <ForgeButton type="raised">
        <button onClick={show}>Show complex dialog</button>
      </ForgeButton>
      <ForgeDialog
      open={isOpen} 
      options={dialogProps} 
      onDismiss={hide}>
        <ForgeToolbar forge-dialog-move-target="">
          <h2 slot={'start'}>Discard draft?</h2>
          <ForgeIconButton slot={'end'}>
            <button 
            onClick={hide} 
            type="button" 
            aria-label="Close complex dialog" 
            className="tyler-icons">close</button>
          </ForgeIconButton>
        </ForgeToolbar>
        <section className="forge-dialog__body" style={{ width: '500px' }}>
          {LOREM_IPSUM.p1}
        </section>
        <ForgeDivider/>
        <ForgeToolbar>
          <ForgeButton type="outlined" style={{ marginRight: 16 }} slot={'end'}>
            <button onClick={hide}>Cancel</button>
          </ForgeButton>
          <ForgeButton type="raised" slot={'end'}>
            <button onClick={hide} forge-dialog-focus="true">Discard</button>
          </ForgeButton>
        </ForgeToolbar>
      </ForgeDialog>
    </>
  );
};
