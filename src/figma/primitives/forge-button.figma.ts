import figma, { html } from '@figma/code-connect/html';

const sharedProps = {
  text: figma.string('Text'),
  startInstance: figma.boolean('Start slot', {
    true: html`<forge-icon name="icon_name" slot="start"></forge-icon>`,
    false: undefined
  }),
  endInstance: figma.boolean('End slot', {
    true: html`<forge-icon name="icon_name" slot="end"></forge-icon>`,
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
};

// button component
figma.connect('<FIGMA_BUTTON_BUTTON>', {
  props: {
    ...sharedProps
  },
  // alternative to get the icon name dynamically
  // <forge-icon name="${props.startInstanceName.icon}" slot="start"></forge-icon>
  example: props =>
    html` <forge-button variant="${props.type}" disabled="${props.disabled}"> ${props.startInstance} ${props.text} ${props.endInstance} </forge-button>`
});

//private neutral button for forge-banner component
figma.connect('<FIGMA_BUTTON_BUTTON_NEUTRAL>', {
  props: {
    ...sharedProps
  },
  example: props =>
    html` <forge-button variant="${props.type}" disabled="${props.disabled}"> ${props.startInstance} ${props.text} ${props.endInstance} </forge-button>`
});
