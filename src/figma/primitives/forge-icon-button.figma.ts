import figma, { html } from '@figma/code-connect/html';

const sharedProps = {
  instance: figma.children('.forge-icon'),
  type: figma.enum('Type', {
    Raised: 'raised',
    Outlined: 'outlined',
    Tonal: 'tonal'
  }),
  disabled: figma.enum('State', {
    Disabled: true
  }),
  //todo: fix Figma component layer name so popover icon is not included in the output
  popoverIcon: figma.boolean('End slot', {
    true: html`popover-icon`,
    false: undefined
  })
};

// regular icon button component
figma.connect('<FIGMA_ICON_BUTTON_ICON_BUTTON>', {
  props: {
    ...sharedProps
  },
  example: props => html` <forge-icon-button variant=${props.type} ${props.popoverIcon} disabled=${props.disabled}> ${props.instance}</forge-icon-button>`
});

// icon button with badge component
figma.connect('<FIGMA_ICON_BUTTON_ICON_BUTTON_BADGE>', {
  props: {
    badge: figma.children('forge-badge'),
    iconButton: figma.nestedProps('forge-icon-button', {
      ...sharedProps
    })
  },
  example: props =>
    html` <forge-icon-button variant=${props.iconButton.type} ${props.iconButton.popoverIcon} disabled=${props.iconButton.disabled}>
      ${props.iconButton.instance} ${props.badge}
    </forge-icon-button>`
});
