import figma, { html } from '@figma/code-connect/html';

const sharedProps = {
  checked: figma.enum('Checked', {
    true: html`checked`,
    Indeterminate: html`indeterminate`
  }),
  state: figma.enum('State', {
    Disabled: 'disabled'
  })
};

// single checkbox component
figma.connect('<FIGMA_CHECKBOX_CHECKBOX>', {
  props: {
    ...sharedProps
  },
  example: (props: any) => html` <forge-checkbox ${props.checked} ${props.state}></forge-checkbox>`
});

// checkbox label component
figma.connect('<FIGMA_CHECKBOX_CHECKBOX_LABEL>', {
  props: {
    label: figma.string('Label'),
    labelPosition: figma.boolean('Start label', {
      true: html`label-position="start"`,
      false: undefined
    }),
    checkboxProps: figma.nestedProps('forge-checkbox', {
      ...sharedProps
    })
  },
  example: (props: any) =>
    html` <forge-checkbox ${props.checkboxProps.checked} ${props.checkboxProps.state} ${props.labelPosition}>${props.label}</forge-checkbox>`
});
