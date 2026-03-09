import figma, { html } from '@figma/code-connect/html';

const sharedProps = {
  compact: figma.enum('Compact', {
    true: 'compact',
    false: undefined
  }),
  disabled: figma.enum('Disabled', {
    true: 'disabled',
    false: undefined
  }),
  text: figma.string('Text'),
  secondarySlot: figma.boolean('Secondary slot', {
    true: figma.string('secondary'),
    false: undefined
  }),
  helperTextSlot: figma.boolean('Helper-text slot', {
    true: figma.string('helper-text'),
    false: undefined
  }),
  button: figma.children('forge-button')
};

// file picker component - default variant with secondary slot
figma.connect('<FIGMA_FILE_PICKER_FILE_PICKER>', {
  variant: { Compact: false, 'Secondary slot': true },
  props: {
    ...sharedProps
  },
  example: (props: any) => html`
    <forge-file-picker ${props.compact} ${props.disabled}>
      <span slot="primary">${props.text}</span>
      <span slot="secondary">${props.secondarySlot}</span>
      ${props.button}
      <span slot="helper-text">${props.helperTextSlot}</span>
    </forge-file-picker>
  `
});

// file picker component - default variant without secondary slot
figma.connect('<FIGMA_FILE_PICKER_FILE_PICKER>', {
  variant: { Compact: false, 'Secondary slot': false },
  props: {
    ...sharedProps
  },
  example: (props: any) => html`
    <forge-file-picker ${props.compact} ${props.disabled}>
      <span slot="primary">${props.text}</span>
      ${props.button}
      <span slot="helper-text">${props.helperTextSlot}</span>
    </forge-file-picker>
  `
});

// file picker component - compact variant
figma.connect('<FIGMA_FILE_PICKER_FILE_PICKER>', {
  variant: { Compact: true },
  props: {
    ...sharedProps
  },
  example: (props: any) => html`
    <forge-file-picker ${props.compact} ${props.disabled}>
      ${props.button}
      <span slot="helper-text">${props.helperTextSlot}</span>
    </forge-file-picker>
  `
});
