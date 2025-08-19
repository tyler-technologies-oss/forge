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

figma.connect('<FIGMA_LIST_LIST_ITEM>', {
  variant: { 'Start slot': false, 'End slot': false },
  props: {
    ...sharedProps
  },
  example: props =>
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
  example: props =>
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
  example: props =>
    html` <forge-list-item ${props.state} two-line three-line>
      <span>${props.text}</span>
      <span slot="secondary-text">${props.secondaryText}</span>
      <span slot="tertiary-text">${props.tertiaryText}</span>
    </forge-list-item>`
});

figma.connect('<FIGMA_LIST_LIST>', {
  props: {
    listItem: figma.children('forge-list-item')
  },
  example: props => html` <forge-list> ${props.listItem} </forge-list>`
});

// With Start Slot
figma.connect('<FIGMA_LIST_LIST_ITEM>', {
  variant: { 'Start slot': true, 'End slot': false },
  props: {
    ...sharedProps
  },
  example: props =>
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
  example: props =>
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
  example: props =>
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
  example: props =>
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
  example: props =>
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
  example: props =>
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
  example: props =>
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
  example: props =>
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
  example: props =>
    html` <forge-list-item ${props.state} two-line three-line>
      <div slot="start">${props.startInstance}</div>
      <span>${props.text}</span>
      <span slot="secondary-text">${props.secondaryText}</span>
      <span slot="tertiary-text">${props.tertiaryText}</span>
      <div slot="end">${props.endInstance}</div>
    </forge-list-item>`
});
