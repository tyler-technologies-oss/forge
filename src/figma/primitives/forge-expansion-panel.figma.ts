import figma, { html } from '@figma/code-connect/html';

const sharedProps = {
  open: figma.enum('Open', {
    true: 'open',
    false: undefined
  }),
  header: figma.string('Header'),
  text: figma.string('Text')
};

// Expansion panel - basic (closed/open with text content)
figma.connect('<FIGMA_EXPANSION_PANEL_EXPANSION_PANEL>', {
  variant: { 'Body instance swap': false },
  props: {
    ...sharedProps
  },
  example: (props: any) =>
    html`<forge-card>
      <forge-expansion-panel ${props.open}>
        <div slot="header" role="button" style="display: flex; justify-content: space-between;">
          <div>${props.header}</div>
          <forge-open-icon></forge-open-icon>
        </div>
        <p>${props.text}</p>
      </forge-expansion-panel>
    </forge-card>`
});

// Expansion panel - with body instance swap
figma.connect('<FIGMA_EXPANSION_PANEL_EXPANSION_PANEL>', {
  variant: { 'Body instance swap': true },
  props: {
    ...sharedProps,
    bodySlot: figma.children('.div')
  },
  example: (props: any) =>
    html`<forge-card>
      <forge-expansion-panel ${props.open}>
        <div slot="header" role="button" style="display: flex; justify-content: space-between;">
          <div>${props.header}</div>
          <forge-open-icon></forge-open-icon>
        </div>
        ${props.bodySlot}
      </forge-expansion-panel>
    </forge-card>`
});
