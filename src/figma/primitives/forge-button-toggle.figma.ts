import figma, { html } from '@figma/code-connect/html';

const sharedProps = {
  selected: figma.enum('Selected', {
    true: 'selected',
    false: undefined
  }),
  disabled: figma.enum('State', {
    Disabled: 'disabled',
    Enabled: undefined,
    Hover: undefined
  }),
  text: figma.string('Text'),
  startSlot: figma.boolean('Start slot', {
    true: html`<forge-icon slot="start" name="icon_name"></forge-icon>`,
    false: undefined
  }),
  endSlot: figma.boolean('End slot', {
    true: html`<forge-icon slot="end" name="icon_name"></forge-icon>`,
    false: undefined
  })
};

// Button toggle
figma.connect('<FIGMA_BUTTON_TOGGLE_BUTTON_TOGGLE>', {
  props: {
    ...sharedProps
  },
  example: (props: any) =>
    html`<forge-button-toggle value="placeholder" ${props.selected} ${props.disabled}> ${props.startSlot} ${props.text} ${props.endSlot} </forge-button-toggle>`
});

// Button toggle group
figma.connect('<FIGMA_BUTTON_TOGGLE_GROUP_BUTTON_TOGGLE_GROUP>', {
  props: {
    outlined: figma.enum('Outline', {
      true: 'outlined',
      false: undefined
    }),
    buttonToggles: figma.children('forge-button-toggle')
  },
  example: (props: any) => html`<forge-button-toggle-group ${props.outlined}> ${props.buttonToggles} </forge-button-toggle-group>`
});
