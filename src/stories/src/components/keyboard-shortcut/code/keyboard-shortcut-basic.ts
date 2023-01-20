export const KeyboardShortcutBasicHtml = () => `
<forge-button type="raised">
  <button type="button">Button</button>
</forge-button>
<forge-keyboard-shortcut id="shortcut" key="shift+a"></forge-keyboard-shortcut>
`;

export const KeyboardShortcutBasicTs = () => `
const shortcutEl = document.getElementById('shortcut');
shortcutEl.addEventListener('forge-keyboard-shortcut-activate', () => {
  window.alert('Keyboard shortcut activated);
});
`;
