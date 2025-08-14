import figma, { html } from '@figma/code-connect/html';

const sharedProps = {
  iconSlot: figma.boolean('Icon slot', {
    true: html`<forge-icon slot="icon" name="icon_name"></forge-icon>`,
    false: undefined
  }),
  text: figma.string('Text'),
  canDismiss: figma.boolean('canDismiss', {
    true: undefined,
    false: html`persistent`
  }),
  buttonSlot: figma.boolean('Button slot', {
    true: figma.children('.button-neutral'),
    false: undefined
  })
};

// banner
figma.connect('<FIGMA_BANNER_BANNER>', {
  props: {
    ...sharedProps
  },
  example: props => html` <forge-banner theme="info" ${props.canDismiss}> ${props.text} ${props.iconSlot} </forge-banner>`
});

//banner with button slot
figma.connect('<FIGMA_BANNER_BANNER>', {
  variant: { 'Button slot': true },
  props: {
    ...sharedProps,
    buttonInstance: figma.nestedProps('.button-neutral', {
      type: figma.enum('Type', {
        Raised: 'raised',
        Outlined: 'outlined',
        Text: 'text',
        Tonal: 'tonal',
        Filled: 'filled'
      }),
      disabled: figma.enum('State', {
        Disabled: true
      }),
      text: figma.string('Text'),
      startInstance: figma.boolean('Start slot', {
        true: html`<forge-icon name="icon_name" slot="start"></forge-icon>`,
        false: undefined
      }),
      endInstance: figma.boolean('End slot', {
        true: html`<forge-icon name="icon_name" slot="end"></forge-icon>`,
        false: undefined
      })
    })
  },

  example: props =>
    html` <forge-banner theme="info" ${props.canDismiss}>
      ${props.text} ${props.iconSlot}
      <forge-button slot="button" variant="${props.buttonInstance.type}" disabled="${props.buttonInstance.disabled}">
        ${props.buttonInstance.startInstance} ${props.buttonInstance.text} ${props.buttonInstance.endInstance}
      </forge-button>
    </forge-banner>`
});
