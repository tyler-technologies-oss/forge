import figma, { html } from '@figma/code-connect/html';

const sharedProps = {
  type: figma.enum('Type', {
    Extended: 'extended',
    Default: 'default'
  }),
  text: figma.string('Text'),
  startSlot: figma.boolean('Start slot', {
    true: html`<forge-icon name="icon_name"></forge-icon>`,
    false: undefined
  }),
  popoverIcon: figma.boolean('popoverIcon', {
    true: html`popover-icon`,
    false: undefined
  }),
  state: figma.enum('State', {
    Disabled: 'disabled'
  })
};

figma.connect('<FIGMA_FAB_FAB>', {
  variant: { Type: 'Default' },
  props: {
    ...sharedProps
  },
  example: (props: any) => html` <forge-fab ${props.popoverIcon} ${props.state}> ${props.startSlot} </forge-fab>`
});

figma.connect('<FIGMA_FAB_FAB>', {
  variant: { Type: 'Extended' },
  props: {
    ...sharedProps
  },
  example: (props: any) =>
    html` <forge-fab ${props.popoverIcon} ${props.state}>
      ${props.startSlot}
      <span slot="label">${props.text}</span>
    </forge-fab>`
});
