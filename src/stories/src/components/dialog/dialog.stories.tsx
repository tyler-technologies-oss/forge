import React, { useEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { ForgeButton, ForgeDialog, ForgeIcon, ForgeIconButton, ForgeScaffold, ForgeToolbar } from '@tylertech/forge-react';
import { IconRegistry } from '@tylertech/forge';
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
  fullscreen = false,
  moveable = true
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const show = () => setIsOpen(true);
  const hide = () => setIsOpen(false);

  return (
    <>
      <ForgeButton variant="raised" onClick={show}>Show dialog</ForgeButton>

      <ForgeDialog
        open={isOpen}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-message"
        fullscreen={fullscreen}
        moveable={moveable}
        on-forge-dialog-close={hide}>
          <ForgeScaffold style={{ width: '500px' }}>
            <ForgeToolbar slot="header">
              <h2 id="dialog-title" className="forge-typography--subheading4">Dialog title</h2>
            </ForgeToolbar>
            <p id="dialog-message" slot="body" style={{ padding: '16px' }}>
              {LOREM_IPSUM.p1.slice(0, 162)}
            </p>
            <ForgeToolbar slot="footer">
              <ForgeButton slot="end" variant="raised" autofocus onClick={hide}>Close</ForgeButton>
            </ForgeToolbar>
          </ForgeScaffold>
      </ForgeDialog>
    </>
  );
};
Simple.args = {
  fullscreen: false,
  moveable: true
} as IDialogProps;

export const Complex: Story<IDialogProps> = ({
  fullscreen = false,
  moveable = true,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const hide = () => setIsOpen(false);
  const show = () => setIsOpen(true);

  useEffect(() => {
    IconRegistry.define(tylIconClose);
  }, []);

  return (
    <>
      <ForgeButton variant="raised" onClick={show}>Show complex dialog</ForgeButton>

      <ForgeDialog
        aria-labelledby="dialog-title"
        aria-describedby="dialog-message"
        open={isOpen}
        fullscreen={fullscreen}
        moveable={moveable}
        on-forge-dialog-close={hide}>
        <ForgeScaffold style={{ width: '500px' }}>
          <ForgeToolbar slot="header">
            <h2 id="dialog-title" slot="start">Discard draft?</h2>
            <ForgeIconButton slot="end" onClick={hide} type="button" aria-label="Close dialog">
              <ForgeIcon name="close" />
            </ForgeIconButton>
          </ForgeToolbar>
          <p slot="body" id="dialog-message" style={{ padding: '16px' }}>
            {LOREM_IPSUM.p1}
          </p>
          <ForgeToolbar slot="footer" inverted>
            <ForgeButton variant="outlined" style={{ marginRight: 16 }} slot="end" onClick={hide}>Cancel</ForgeButton>
            <ForgeButton variant="raised" theme="error" slot="end" onClick={hide} autofocus>Discard</ForgeButton>
          </ForgeToolbar>
        </ForgeScaffold>
      </ForgeDialog>
    </>
  );
};
Complex.args = {
  fullscreen: false,
  moveable: false
} as IDialogProps;
