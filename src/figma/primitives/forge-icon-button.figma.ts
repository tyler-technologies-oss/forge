import figma, { html } from '@figma/code-connect/html';

figma.connect('<FIGMA_ICON_BUTTON_ICON_BUTTON>', {
  props: {
    instance: figma.children('.forge-icon'),
    type: figma.enum('Type', {
      Raised: 'raised',
      Outlined: 'outlined',
      Tonal: 'tonal'
    }),
    disabled: figma.enum('State', {
      Disabled: true
    })
  },
  example: props => html` <forge-icon-button variant=${props.type} disabled=${props.disabled}> ${props.instance} </forge-icon-button>`
});
