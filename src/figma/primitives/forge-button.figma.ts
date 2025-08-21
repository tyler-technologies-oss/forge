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
  example: (props: any) =>
    html` <forge-button variant="${props.type}" disabled="${props.disabled}"> ${props.startInstance} ${props.text} ${props.endInstance} </forge-button>`
});

//private neutral button for forge-banner component
figma.connect('<FIGMA_BUTTON_BUTTON_NEUTRAL>', {
  props: {
    ...sharedProps
  },
  example: (props: any) =>
    html` <forge-button variant="${props.type}" disabled="${props.disabled}"> ${props.startInstance} ${props.text} ${props.endInstance} </forge-button>`
});

// split button component
figma.connect('<FIGMA_SPLIT_BUTTON_SPLIT_BUTTON>', {
  props: {
    variant: figma.enum('Variant', {
      Raised: 'raised',
      Outlined: 'outlined',
      Text: 'text',
      Tonal: 'tonal',
      Filled: 'filled'
    }),
    button: figma.children('forge-button'),
    button2: figma.nestedProps('forge-button 2', {
      ...sharedProps
    })
  },
  example: (props: any) =>
    html` <forge-split-button variant="${props.variant}" theme="primary">
      ${props.button}
      <forge-menu>
        <forge-button popover-icon variant="${props.button2.type}"></forge-button>
      </forge-menu>
    </forge-split-button>`
});
