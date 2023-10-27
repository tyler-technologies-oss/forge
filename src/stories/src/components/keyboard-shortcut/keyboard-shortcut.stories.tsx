import { Meta, Story } from '@storybook/react';
import React, { useEffect, useRef } from 'react'
import { ForgeButton, ForgeDatePicker, ForgeOption, ForgeSelect, ForgeKeyboardShortcut, ForgeTextField } from '@tylertech/forge-react';
import { argTypes, IKeyboardShortcutProps } from './keyboard-shortcut-arg';
import { IKeyboardShortcutComponent } from '../../../../lib/keyboard-shortcut';

const MDX = require('./keyboard-shortcut.mdx').default;

export default {
  title: 'Components/Keyboard Shortcut',
  argTypes,
  parameters: {
    docs: {
      page: MDX
    },
    actions: {
      handles: [
        'forge-keyboard-shortcut-activate'
      ]
    }
  },
  excludeStories: /Basic/
} as Meta;

export const Default: Story<IKeyboardShortcutProps> = ({
  key = 'shift+a',
  global = false,
  allowWhileTyping = true,
  preventDefault = false,
  capture = false,
  useCode = false,
  disabled = false
}) => {
  const handleKeyboardShortcut = () => window.alert('Keyboard shortcut activated');

  const gridStyles = { display: 'grid', gap: '16px', gridTemplateColumns: '1fr 1fr', maxWidth: '520px' };
  const fullWidthStyles = { gridColumn: '1/-1' };

  return (
    <div>
      <div className="forge-typography--body1" style={{ marginBottom: '16px' }}>Focus an element and press the key combination ({key})</div>
      <form style={gridStyles}>
        <ForgeTextField>
          <label slot="label" htmlFor="first-name">First name</label>
          <input id="first-name" />
        </ForgeTextField>
        <ForgeTextField>
          <label slot="label" htmlFor="last-name">Last name</label>
          <input id="last-name" />
        </ForgeTextField>
        <ForgeDatePicker>
          <ForgeTextField>
            <label slot="label" htmlFor="date-of-birth">Date of birth</label>
            <input id="date-of-birth" />
          </ForgeTextField>
        </ForgeDatePicker>
        <ForgeSelect label="Favorite color">
          <ForgeOption value="red">Red</ForgeOption>
          <ForgeOption value="green">Green</ForgeOption>
          <ForgeOption value="blue">Blue</ForgeOption>
        </ForgeSelect>
        <ForgeTextField style={fullWidthStyles}>
          <label slot="label" htmlFor="comment">Comment</label>
          <textarea id="comment"></textarea>
        </ForgeTextField>
        <ForgeButton type="raised" style={fullWidthStyles}>
          <button type="button">Button</button>
        </ForgeButton>
      </form>
      <ForgeKeyboardShortcut
        keyBinding={key}
        global={global}
        allowWhileTyping={allowWhileTyping}
        preventDefault={preventDefault}
        capture={capture}
        useCode={useCode}
        disabled={disabled}
        on-forge-keyboard-shortcut-activate={handleKeyboardShortcut}
      ></ForgeKeyboardShortcut>
    </div>
  )
};
Default.args = {
  key: 'shift+a',
  global: false,
  allowWhileTyping: true,
  preventDefault: false,
  capture: false,
  useCode: false,
  disabled: false
} as IKeyboardShortcutProps;

export const Basic: Story<IKeyboardShortcutProps> = ({
  key = 'shift+a'
}) => {
  const handleKeyboardShortcut = () => window.alert('Keyboard shortcut activated');

  return (
    <div>
      <ForgeButton type="raised">
        <button type="button">Button</button>
      </ForgeButton>
      <ForgeKeyboardShortcut
        keyBinding={key}
        on-forge-keyboard-shortcut-activate={handleKeyboardShortcut}
      ></ForgeKeyboardShortcut>
    </div>
  )
};
