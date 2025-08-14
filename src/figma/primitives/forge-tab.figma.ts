import figma, { html } from '@figma/code-connect/html';

const sharedProps = {
  vertical: figma.boolean('Vertical', {
    true: 'vertical',
    false: undefined
  }),
  stacked: figma.boolean('Stacked', {
    true: 'stacked',
    false: undefined
  })
};

figma.connect('<FIGMA_TAB_TAB>', {
  props: {
    ...sharedProps,
    text: figma.string('Text'),
    startSlot: figma.boolean('Start slot', {
      true: '<forge-icon name="icon_name" slot="start"></forge-icon>',
      false: undefined
    }),
    endSlot: figma.boolean('End slot', {
      true: '<forge-icon name="icon_name" slot="end"></forge-icon>',
      false: undefined
    }),
    state: figma.enum('State', {
      Disabled: 'disabled'
    }),
    active: figma.boolean('Active', {
      true: 'selected',
      false: undefined
    })
  },
  example: props =>
    html` <forge-tab ${props.state} ${props.vertical} ${props.stacked} ${props.active}> ${props.startSlot} ${props.text} ${props.endSlot} </forge-tab>`
});

// Tab Bar (group of tabs)
figma.connect('<FIGMA_TAB_TAB_BAR>', {
  props: {
    ...sharedProps,
    tab: figma.children('forge-tab')
  },
  example: props => html` <forge-tab-bar ${props.vertical} ${props.stacked}> ${props.tab} </forge-tab-bar>`
});
