import figma, { html } from '@figma/code-connect/html';

const sharedProps = {
  checked: figma.boolean('Switch', {
    true: html`checked`,
    false: undefined
  }),
  state: figma.enum('State', {
    Disabled: 'disabled'
  })
};

// single switch component
figma.connect('<FIGMA_SWITCH_SWITCH>', {
  props: {
    ...sharedProps
  },
  example: props => html` <forge-switch ${props.checked} ${props.state}></forge-switch>`
});

// switch & label component
figma.connect('<FIGMA_SWITCH_SWITCH_LABEL>', {
  props: {
    label: figma.string('Label'),
    labelPosition: figma.boolean('Start label', {
      true: html`label-position="start"`,
      false: undefined
    }),
    switchProps: figma.nestedProps('forge-switch', {
      ...sharedProps
    })
  },
  example: props => html` <forge-switch ${props.switchProps.checked} ${props.switchProps.state} ${props.labelPosition}>${props.label}</forge-switch>`
});
