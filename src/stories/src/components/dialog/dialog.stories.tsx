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
        <button type="button" onClick={show}>Show dialog</button>
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
            <button type="button" onClick={hide}>Cancel</button>
          </ForgeButton>
          <ForgeButton type="raised">
            <button type="button" onClick={hide} forge-dialog-focus="true">Discard</button>
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
  useEffect(() => {
    IconRegistry.define(tylIconClose);
  }, []);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const hide = () => setIsOpen(false);
  const show = () => setIsOpen(true);
  const dialogProps: any = {
    backdropClose,
    escapeClose,
    fullscreen,
    moveable,
    positionType,
  };
  if (customPosition) {
    dialogProps.positionX = positionX;
    dialogProps.positionY = positionY;
  }
  return (
    <>
      <ForgeButton type="raised">
        <button type="button" onClick={show}>Show complex dialog</button>
      </ForgeButton>
      <ForgeDialog open={isOpen} options={dialogProps} onDismiss={hide}>
        <ForgeToolbar forge-dialog-move-target="">
          <h2 slot="start">Discard draft?</h2>
          <ForgeIconButton slot="end">
            <button onClick={hide} type="button" aria-label="Close complex dialog">
              <ForgeIcon name="close" />
            </button>
          </ForgeIconButton>
        </ForgeToolbar>
        <section className="forge-dialog__body" style={{ width: '500px' }}>
          {LOREM_IPSUM.p1}
        </section>
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
