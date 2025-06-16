import figma, { html } from '@figma/code-connect/html';

// button component
figma.connect('<FIGMA_BUTTON_BUTTON>', {
  props: {
    text: figma.string('Text'),
    leadingIcon: figma.boolean('Leading Icon', {
      true: html`<forge-icon name="icon-name" slot="start"></forge-icon>`,
      false: undefined
    }),
    trailingIcon: figma.boolean('Trailing Icon', {
      true: html`<forge-icon name="icon-name" slot="end"></forge-icon>`,
      false: undefined
    }),

    // leadingIconName: figma.children(".forge-icon"),
    leadingIconName: figma.nestedProps('.forge-icon', {
      icon: figma.instance('Icon')
    }),
    type: figma.enum('Type', {
      Raised: 'raised',
      Outlined: 'outlined',
      Text: 'text',
      Tonal: 'tonal',
      Filled: 'filled'
    }),
    disabled: figma.enum('State', {
      Disabled: true
    })
  },
  // alternative to get the icon name dynamically
  // <forge-icon name="${props.leadingIconName.icon}" slot="start"></forge-icon>
  example: props => html`
    <forge-button variant="${props.type}" disabled="${props.disabled}"> ${props.leadingIcon} ${props.text} ${props.trailingIcon} </forge-button>
  `
});
