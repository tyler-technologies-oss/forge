import figma, { html } from '@figma/code-connect/html';

// paginator component - default variant
figma.connect('<FIGMA_PAGINATOR_PAGINATOR>', {
  variant: { Type: 'Default' },
  props: {
    first: figma.enum('first', {
      true: 'first',
      false: undefined
    }),
    firstLast: figma.enum('first-last', {
      true: 'first-last',
      false: undefined
    }),
    label: figma.string('label'),
    total: figma.string('total')
  },
  example: (props: any) => html`<forge-paginator ${props.first} ${props.firstLast} label="${props.label}" total="${props.total}"></forge-paginator>`
});

// paginator component - alternative variant
figma.connect('<FIGMA_PAGINATOR_PAGINATOR>', {
  variant: { Type: 'alternative' },
  props: {
    first: figma.enum('first', {
      true: 'first',
      false: undefined
    }),
    firstLast: figma.enum('first-last', {
      true: 'first-last',
      false: undefined
    }),
    total: figma.string('total')
  },
  example: (props: any) => html`<forge-paginator ${props.first} ${props.firstLast} alternative total="${props.total}"></forge-paginator>`
});
