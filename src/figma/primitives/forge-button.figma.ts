import figma, { html } from '@figma/code-connect/html';

// button component
figma.connect('<FIGMA_BUTTON_BUTTON>', {
  props: {
    text: figma.string('Text'),
    startInstance: figma.boolean('Start slot', {
      true: html`<forge-icon name="icon-name" slot="start"></forge-icon>`,
      false: undefined
    }),
    endInstance: figma.boolean('End slot', {
      true: html`<forge-icon name="icon-name" slot="end"></forge-icon>`,
      false: undefined
    }),

    // startInstanceName: figma.children(".forge-icon"),
    startInstanceName: figma.nestedProps('.forge-icon', {
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
  // <forge-icon name="${props.startInstanceName.icon}" slot="start"></forge-icon>
  example: props => html`
    <forge-button variant="${props.type}" disabled="${props.disabled}"> ${props.startInstance} ${props.text} ${props.endInstance} </forge-button>
  `
});
