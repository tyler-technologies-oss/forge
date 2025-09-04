import figma, { html } from '@figma/code-connect/html';

const sharedProps = {
  state: figma.enum('State', {
    Selected: 'selected',
    Disabled: 'disabled'
  }),
  text: figma.string('Text'),
  startSlot: figma.boolean('Start slot', {
    true: figma.instance('start-instance'),
    false: undefined
  }),
  endSlot: figma.boolean('End slot', {
    true: figma.instance('end-instance'),
    false: undefined
  }),
  startInstance: figma.instance('start-instance'),
  endInstance: figma.instance('end-instance')
};

const sharedSecondaryProps = {
  secondaryText: figma.string('Secondary text'),
  showSecondary: figma.boolean('Show secondary')
};

const navListProps = {
  showText: figma.boolean('Show text', {
    true: figma.instance('Text'),
    false: undefined
  }),
  indent: figma.boolean('Indent', {
    true: 'indented',
    false: undefined
  })
};

figma.connect('<FIGMA_LIST_LIST_ITEM>', {
  variant: { 'Start slot': false, 'End slot': false },
  props: {
    ...sharedProps
  },
  example: (props: any) =>
    html` <forge-list-item ${props.state}>
      <span>${props.text}</span>
    </forge-list-item>`
});

figma.connect('<FIGMA_LIST_LIST_ITEM>', {
  variant: { 'Start slot': false, 'End slot': false, 'Show secondary': true },
  props: {
    ...sharedProps,
    ...sharedSecondaryProps
  },
  example: (props: any) =>
    html` <forge-list-item ${props.state} two-line>
      <span>${props.text}</span>
      <span slot="secondary-text">${props.secondaryText}</span>
    </forge-list-item>`
});

figma.connect('<FIGMA_LIST_LIST_ITEM>', {
  variant: { 'Start slot': false, 'End slot': false, 'Show secondary': true, 'Show tertiary': true },
  props: {
    ...sharedProps,
    ...sharedSecondaryProps,
    tertiaryText: figma.string('Tertiary text')
  },
  example: (props: any) =>
    html` <forge-list-item ${props.state} two-line three-line>
      <span>${props.text}</span>
      <span slot="secondary-text">${props.secondaryText}</span>
      <span slot="tertiary-text">${props.tertiaryText}</span>
    </forge-list-item>`
});

// forge-list: nested list-items
figma.connect('<FIGMA_LIST_LIST>', {
  variant: { Type: 'forge-list' },
  props: {
    listItem: figma.children('forge-list-item')
  },
  example: (props: any) => html` <forge-list> ${props.listItem} </forge-list>`
});

// forge-list: navigation list variant
figma.connect('<FIGMA_LIST_LIST>', {
  variant: { Type: 'navlist' },
  props: {
    listItem: figma.children('forge-list-item*')
  },
  example: (props: any) => html` <forge-list navlist> ${props.listItem} </forge-list>`
});

// With Start Slot
figma.connect('<FIGMA_LIST_LIST_ITEM>', {
  variant: { 'Start slot': true, 'End slot': false },
  props: {
    ...sharedProps
  },
  example: (props: any) =>
    html` <forge-list-item ${props.state}>
      <div slot="start">${props.startInstance}</div>
      <span>${props.text}</span>
    </forge-list-item>`
});

figma.connect('<FIGMA_LIST_LIST_ITEM>', {
  variant: { 'Start slot': true, 'End slot': false, 'Show secondary': true },
  props: {
    ...sharedProps,
    ...sharedSecondaryProps
  },
  example: (props: any) =>
    html` <forge-list-item ${props.state} two-line>
      <div slot="start">${props.startInstance}</div>
      <span>${props.text}</span>
      <span slot="secondary-text">${props.secondaryText}</span>
    </forge-list-item>`
});

figma.connect('<FIGMA_LIST_LIST_ITEM>', {
  variant: { 'Start slot': true, 'End slot': false, 'Show secondary': true, 'Show tertiary': true },
  props: {
    ...sharedProps,
    ...sharedSecondaryProps,
    tertiaryText: figma.string('Tertiary text')
  },
  example: (props: any) =>
    html` <forge-list-item ${props.state} two-line three-line>
      <div slot="start">${props.startInstance}</div>
      <span>${props.text}</span>
      <span slot="secondary-text">${props.secondaryText}</span>
      <span slot="tertiary-text">${props.tertiaryText}</span>
    </forge-list-item>`
});

// With End Slot
figma.connect('<FIGMA_LIST_LIST_ITEM>', {
  variant: { 'Start slot': false, 'End slot': true },
  props: {
    ...sharedProps
  },
  example: (props: any) =>
    html` <forge-list-item ${props.state}>
      <span>${props.text}</span>
      <div slot="end">${props.endInstance}</div>
    </forge-list-item>`
});

figma.connect('<FIGMA_LIST_LIST_ITEM>', {
  variant: { 'Start slot': false, 'End slot': true, 'Show secondary': true },
  props: {
    ...sharedProps,
    ...sharedSecondaryProps
  },
  example: (props: any) =>
    html` <forge-list-item ${props.state} two-line>
      <span>${props.text}</span>
      <span slot="secondary-text">${props.secondaryText}</span>
      <div slot="end">${props.endInstance}</div>
    </forge-list-item>`
});

figma.connect('<FIGMA_LIST_LIST_ITEM>', {
  variant: { 'Start slot': false, 'End slot': true, 'Show secondary': true, 'Show tertiary': true },
  props: {
    ...sharedProps,
    ...sharedSecondaryProps,
    tertiaryText: figma.string('Tertiary text')
  },
  example: (props: any) =>
    html` <forge-list-item ${props.state} two-line three-line>
      <span>${props.text}</span>
      <span slot="secondary-text">${props.secondaryText}</span>
      <span slot="tertiary-text">${props.tertiaryText}</span>
      <div slot="end">${props.endInstance}</div>
    </forge-list-item>`
});

// With both Start & End Slots
figma.connect('<FIGMA_LIST_LIST_ITEM>', {
  variant: { 'Start slot': true, 'End slot': true },
  props: {
    ...sharedProps
  },
  example: (props: any) =>
    html` <forge-list-item ${props.state}>
      <div slot="start">${props.startInstance}</div>
      <span>${props.text}</span>
      <div slot="end">${props.endInstance}</div>
    </forge-list-item>`
});

figma.connect('<FIGMA_LIST_LIST_ITEM>', {
  variant: { 'Start slot': true, 'End slot': true, 'Show secondary': true },
  props: {
    ...sharedProps,
    ...sharedSecondaryProps
  },
  example: (props: any) =>
    html` <forge-list-item ${props.state} two-line>
      <div slot="start">${props.startInstance}</div>
      <span>${props.text}</span>
      <span slot="secondary-text">${props.secondaryText}</span>
      <div slot="end">${props.endInstance}</div>
    </forge-list-item>`
});

figma.connect('<FIGMA_LIST_LIST_ITEM>', {
  variant: { 'Start slot': true, 'End slot': true, 'Show secondary': true, 'Show tertiary': true },
  props: {
    ...sharedProps,
    ...sharedSecondaryProps,
    tertiaryText: figma.string('Tertiary text')
  },
  example: (props: any) =>
    html` <forge-list-item ${props.state} two-line three-line>
      <div slot="start">${props.startInstance}</div>
      <span>${props.text}</span>
      <span slot="secondary-text">${props.secondaryText}</span>
      <span slot="tertiary-text">${props.tertiaryText}</span>
      <div slot="end">${props.endInstance}</div>
    </forge-list-item>`
});

// TODO: deprecate this nav-list-item in favor of just using the list-item component
// Navlist
figma.connect('<FIGMA_DRAWER_NAV_LIST_ITEM>', {
  props: {
    ...sharedProps,
    ...navListProps
  },
  example: (props: any) =>
    html` <forge-list-item ${props.state} ${props.indent}>
      <a href="javascript: void(0)">${props.text}</a>
    </forge-list-item>`
});

figma.connect('<FIGMA_DRAWER_NAV_LIST_ITEM>', {
  variant: { 'Start slot': true, 'End slot': false },
  props: {
    ...sharedProps,
    ...navListProps
  },
  example: (props: any) =>
    html` <forge-list-item ${props.state} ${props.indent}>
      <div slot="start">${props.startInstance}</div>
      <a href="javascript: void(0)">${props.text}</a>
    </forge-list-item>`
});

figma.connect('<FIGMA_DRAWER_NAV_LIST_ITEM>', {
  variant: { 'Start slot': false, 'End slot': true },
  props: {
    ...sharedProps,
    ...navListProps
  },
  example: (props: any) =>
    html` <forge-list-item ${props.state} ${props.indent}>
      <a href="javascript: void(0)">${props.text}</a>
      <div slot="end">${props.endInstance}</div>
    </forge-list-item>`
});

figma.connect('<FIGMA_DRAWER_NAV_LIST_ITEM>', {
  variant: { 'Start slot': true, 'End slot': true },
  props: {
    ...sharedProps,
    ...navListProps
  },
  example: (props: any) =>
    html` <forge-list-item ${props.state} ${props.indent}>
      <div slot="start">${props.startInstance}</div>
      <a href="javascript: void(0)">${props.text}</a>
      <div slot="end">${props.endInstance}</div>
    </forge-list-item>`
});

figma.connect('<FIGMA_DRAWER_NAV_LIST_ITEM>', {
  variant: { 'Start slot': true, 'Show text': false },
  props: {
    ...sharedProps,
    ...navListProps
  },
  example: (props: any) =>
    html` <forge-list-item ${props.state} ${props.indent}>
      <div slot="start">${props.startInstance}</div>
      <a href="javascript: void(0)">${props.text}</a>
      <div slot="end">${props.endInstance}</div>
    </forge-list-item>`
});
