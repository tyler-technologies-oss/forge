import figma, { html } from '@figma/code-connect/html';

const sharedProps = {
  checked: figma.boolean('Checked', {
    true: html`checked`,
    false: undefined
  }),
  state: figma.enum('State', {
    Disabled: 'disabled'
  })
};

// single radio component
figma.connect('<FIGMA_RADIO_RADIO>', {
  props: {
    ...sharedProps
  },
  example: (props: any) => html` <forge-radio ${props.checked} ${props.state}></forge-radio>`
});

// radio label component
figma.connect('<FIGMA_RADIO_RADIO_LABEL>', {
  props: {
    label: figma.string('Label'),
    labelPosition: figma.boolean('Start label', {
      true: html`label-position="start"`,
      false: undefined
    }),
    radioProps: figma.nestedProps('forge-radio', {
      ...sharedProps
    })
  },
  example: (props: any) => html` <forge-radio ${props.radioProps.checked} ${props.radioProps.state} ${props.labelPosition}>${props.label}</forge-radio>`
});
