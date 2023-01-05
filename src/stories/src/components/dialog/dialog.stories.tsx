import React, { useEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { ForgeButton, ForgeDialog, ForgeDivider, ForgeIcon, ForgeIconButton, ForgeToolbar } from '@tylertech/forge-react';
import { DialogPositionType, IconRegistry } from '@tylertech/forge';
import { argTypes, IDialogProps } from './dialog-args';
import { LOREM_IPSUM } from "../../mock/lorem-ipsum";
import { tylIconClose } from '@tylertech/tyler-icons/standard';

const MDX = require('./dialog.mdx').default;

export default {
  title: 'Components/Dialog',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Simple: Story<IDialogProps> = ({
  backdropClose = true,
  escapeClose = true,
  fullscreen = false,
  moveable = true,
  customPosition = false,
  positionX = 0,
  positionY = 0,
  positionType = 'absolute' as DialogPositionType
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);  
  const hide = () => setIsOpen(false);
  const show = () => setIsOpen(true);

  return (
    <>
      <ForgeButton type="raised">
        <button type="button" onClick={show}>Show dialog</button>
      </ForgeButton>

      <ForgeDialog
        aria-labelledby="dialog-title"
        aria-describedby="dialog-message"
        open={isOpen}
        backdropClose={backdropClose}
        escapeClose={escapeClose}
        fullscreen={fullscreen}
        moveable={moveable}
        positionType={positionType}
        positionX={customPosition ? positionX : null}
        positionY={customPosition ? positionY : null}
        on-forge-dialog-close={hide}>
        <header className="forge-dialog__header" forge-dialog-move-target={moveable ? 'true' : null}>
          <h2 id="dialog-title" className="forge-dialog__title">Dialog title</h2>
        </header>
        <p id="dialog-message" className="forge-dialog__body" style={{ width: '500px' }}>
          {LOREM_IPSUM.p1.slice(0, 162)}
        </p>
        <footer className="forge-dialog__footer">
          <ForgeButton type="raised">
            <button type="button" onClick={hide}>Close</button>
          </ForgeButton>
        </footer>
      </ForgeDialog>
    </>
  );
};
Simple.args = {
  backdropClose: true,
  escapeClose: true,
  fullscreen: false,
  moveable: true,
  customPosition: false,
  positionX: 0,
  positionY: 0,
  positionType: 'absolute'
} as IDialogProps;

export const Complex: Story<IDialogProps> = ({
  backdropClose = true,
  escapeClose = true,
  fullscreen = false,
  moveable = true,
  customPosition = false,
  positionX = 0,
  positionY = 0,
  positionType = 'absolute'
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const hide = () => setIsOpen(false);
  const show = () => setIsOpen(true);

  useEffect(() => {
    IconRegistry.define(tylIconClose);
  }, []);

  return (
    <>
      <ForgeButton type="raised">
        <button type="button" onClick={show}>Show complex dialog</button>
      </ForgeButton>

      <ForgeDialog
        aria-labelledby="dialog-title"
        aria-describedby="dialog-message"
        open={isOpen}
        backdropClose={backdropClose}
        escapeClose={escapeClose}
        fullscreen={fullscreen}
        moveable={moveable}
        positionType={positionType}
        positionX={customPosition ? positionX : null}
        positionY={customPosition ? positionY : null}
        on-forge-dialog-close={hide}>
        <ForgeToolbar forge-dialog-move-target={moveable ? 'true' : null}>
          <h2 id="dialog-title" slot="start">Discard draft?</h2>
          <ForgeIconButton slot="end">
            <button onClick={hide} type="button" aria-label="Close dialog">
              <ForgeIcon name="close" />
            </button>
          </ForgeIconButton>
        </ForgeToolbar>
        <p id="dialog-message" className="forge-dialog__body" style={{ width: '500px' }}>
          {LOREM_IPSUM.p1}
        </p>
        <ForgeDivider />
        <ForgeToolbar>
          <ForgeButton type="outlined" style={{ marginRight: 16 }} slot="end">
            <button type="button" onClick={hide}>Cancel</button>
          </ForgeButton>
          <ForgeButton type="raised" slot="end">
            <button type="button" onClick={hide} forge-dialog-focus="true">Discard</button>
          </ForgeButton>
        </ForgeToolbar>
      </ForgeDialog>
    </>
  );
};
Complex.args = {
  backdropClose: true,
  escapeClose: true,
  fullscreen: false,
  moveable: false,
  customPosition: false,
  positionX: 0,
  positionY: 0,
  positionType: 'absolute'
} as IDialogProps;
