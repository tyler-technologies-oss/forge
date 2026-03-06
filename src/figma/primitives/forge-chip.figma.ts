import figma, { html } from '@figma/code-connect/html';

const sharedProps = {
  text: figma.string('Text'),
  selected: figma.enum('Selected', {
    true: 'selected',
    false: undefined
  }),
  disabled: figma.enum('State', {
    Disabled: 'disabled',
    Enabled: undefined,
    Hover: undefined
  }),
  startInstance: figma.boolean('Show start slot', {
    true: html`<forge-icon name="icon_name" slot="start"></forge-icon>`,
    false: undefined
  }),
  endInstance: figma.boolean('Show end slot', {
    true: html`<forge-icon name="icon_name" slot="end"></forge-icon>`,
    false: undefined
  })
};

// Chip component
figma.connect('<FIGMA_CHIP_CHIP>', {
  props: {
    ...sharedProps
  },
  example: (props: any) =>
    html`<forge-chip value="chip-value" ${props.selected} ${props.disabled}> ${props.startInstance} ${props.text} ${props.endInstance} </forge-chip>`
});

// Chip set component
figma.connect('<FIGMA_CHIP_SET_CHIP_SET>', {
  props: {
    children: figma.children('forge-chip')
  },
  example: (props: any) => html`<forge-chip-set> ${props.children} </forge-chip-set>`
});
