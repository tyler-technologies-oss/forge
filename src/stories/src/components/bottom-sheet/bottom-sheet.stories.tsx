import { Meta } from '@storybook/react';
import { argTypes, IBottomSheetProps } from './bottom-sheet-args';
import React, { useState } from 'react';
import { Story } from '@storybook/react';
import { ForgeBottomSheet, ForgeButton } from '@tylertech/forge-react';
import { LOREM_IPSUM } from '../../mock/lorem-ipsum';

const MDX = require('./bottom-sheet.mdx').default;

export default {
  title: 'Components/Bottom Sheet',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default: Story<IBottomSheetProps> = ({
  showBackdrop = false,
  backdropClose = true,
  escapeClose = true,
  fullscreen = false
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);  
  const hide = () => setIsOpen(false);
  const show = () => setIsOpen(true);
  return (
    <>
      <ForgeButton variant="raised" onClick={show}>Show bottom sheet</ForgeButton>

      <ForgeBottomSheet open={isOpen} onDismiss={hide} options={{ showBackdrop, backdropClose, escapeClose, fullscreen }}>
        <header className="forge-dialog__header">
          <h2 className="forge-dialog__title">Bottom sheet header</h2>
        </header>
        <section className="forge-dialog__body forge-bottom-sheet__body">
          {LOREM_IPSUM.p1.slice(0, 162)}
        </section>
        <footer className="forge-dialog__footer">
          <ForgeButton variant="raised" style={{ marginRight: 16 }} onClick={hide}>Close</ForgeButton>
        </footer>
      </ForgeBottomSheet>
    </>
  );
};
Default.args = {
  showBackdrop: false,
  backdropClose: true,
  escapeClose: true,
  fullscreen: false,
} as IBottomSheetProps;
