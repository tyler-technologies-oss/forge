import figma, { html } from '@figma/code-connect/html';

const sharedProps = {
  clearButton: figma.boolean('Clear button', {
    true: 'clear-button="true"',
    false: undefined
  }),
  todayButton: figma.boolean('Today button', {
    true: 'today-button="true"',
    false: undefined
  })
};

figma.connect('<FIGMA_CALENDAR_CALENDAR>', {
  variant: { Density: 'Default' },
  props: {
    ...sharedProps
  },
  example: (props: any) => html`<forge-calendar show-header="true" ${props.clearButton} ${props.todayButton} month="1" year="2025"></forge-calendar>`
});

figma.connect('<FIGMA_CALENDAR_CALENDAR>', {
  variant: { Density: 'Dense' },
  props: {
    ...sharedProps,
    dense: figma.enum('Density', {
      Dense: 'dense',
      Default: undefined
    })
  },
  example: (props: any) => html`<forge-calendar ${props.dense} ${props.clearButton} ${props.todayButton} month="1" year="2025"></forge-calendar>`
});
