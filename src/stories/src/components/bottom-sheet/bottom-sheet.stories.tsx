import { Meta } from '@storybook/react';
import { argTypes, IBottomSheetProps } from './bottom-sheet-args';
import React, { useState } from 'react';
import { Story } from '@storybook/react';
import { ForgeBottomSheet, ForgeButton, ForgeScaffold, ForgeToolbar } from '@tylertech/forge-react';
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
  persistent = false,
  mode = 'nonmodal',
  fullscreen = false
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);  
  const hide = () => setIsOpen(false);
  const show = () => setIsOpen(true);
  return (
    <>
      <ForgeButton variant="raised" onClick={show}>Show bottom sheet</ForgeButton>

      <ForgeBottomSheet open={isOpen} onDismiss={hide} options={{ persistent, mode, fullscreen }} aria-labelledby="scrollable-bottom-sheet-title" aria-describedby="scrollable-bottom-sheet-message">
        <ForgeScaffold>
          <ForgeToolbar no-border slot="header">
            <h1 slot="start" id="scrollable-bottom-sheet-title" className="forge-typography--heading4">Modal bottom sheet</h1>
          </ForgeToolbar>
        </ForgeScaffold>
        <section slot="body" style={{ padding: '0 16px', overflow: 'auto' }} id="scrollable-bottom-sheet-message" forge-bottom-sheet-body="true">
          {LOREM_IPSUM.p1.slice(0, 162)}
        </section>
        <ForgeToolbar no-border slot="footer">
          <ForgeButton slot="end" variant="raised" style={{ marginRight: 16 }} onClick={hide}>Close</ForgeButton>
        </ForgeToolbar>
      </ForgeBottomSheet>
    </>
  );
};
Default.args = {
  persistent: false,
  mode: 'nonmodal',
  fullscreen: false,
} as IBottomSheetProps;
