import figma, { html } from '@figma/code-connect/html';

const sharedProps = {
  moveable: figma.boolean('movable', {
    true: 'moveable',
    false: undefined
  })
};

// Dialog component - Default type
figma.connect('<FIGMA_DIALOG_DIALOG>', {
  props: {
    ...sharedProps,
    toolbars: figma.children('forge-toolbar'),
    bodyInstance: figma.instance('Body slot')
  },
  example: (props: any) =>
    html`<forge-dialog open ${props.moveable}>
      <forge-scaffold>
        ${props.toolbars}
        <div slot="body">${props.bodyInstance}</div>
      </forge-scaffold>
    </forge-dialog>`
});

// Dialog component - Default type
figma.connect('<FIGMA_DIALOG_BODY_TEXT>', {
  props: {
    text: figma.string('Text')
  },
  example: (props: any) => html`<p>${props.text}</p> `
});

/*
// Dialog component - Scrollable type
figma.connect('<FIGMA_DIALOG_DIALOG>', {
  variant: { Type: 'Scrollable' },
  props: {
    ...sharedProps
  },
  example: ({ moveable }) =>
    html`<forge-dialog open ${moveable}>
  <div style="height: 300px;">Scrollable content goes here</div>
</forge-dialog>`
});
*/

/*
<forge-dialog>
    <forge-scaffold>
      <forge-toolbar slot="header" no-divider>
        <h1 class="forge-typography--heading4" id="dialog-title" slot="start">Title text</h1>
        <forge-icon-button slot="end" aria-label="Close dialog">
          <forge-icon name="close"></forge-icon>
        </forge-icon-button>
      </forge-toolbar>
      <p slot="body" id="dialog-message">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit sed pariatur error repellendus eos! Quas, optio esse ad illum quis blanditiis rerum quia.
        Corrupti, ad hic velit praesentium voluptatum dolores?
      </p>
      <forge-toolbar slot="footer" no-divider>
        <forge-button slot="end" variant="raised">Close</forge-button>
      </forge-toolbar>
    </forge-scaffold>
  </forge-dialog>

<forge-dialog moveable="" visible="" open=""><!---->
    <forge-scaffold>
      <forge-toolbar slot="header" no-divider="">
        <h1 class="forge-typography--heading4" id="dialog-title" slot="start">Title text</h1>
        <forge-icon-button slot="end" aria-label="Close dialog" role="button" tabindex="0">
          <forge-icon name="close"></forge-icon>
        </forge-icon-button>
      </forge-toolbar>
      <p slot="body" id="dialog-message">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit sed pariatur error repellendus eos! Quas, optio esse ad illum quis blanditiis rerum quia.
        Corrupti, ad hic velit praesentium voluptatum dolores?
      </p>
      <forge-toolbar slot="footer" no-divider="">
        <forge-button slot="end" variant="raised" role="button" tabindex="0">Close</forge-button>
      </forge-toolbar>
    </forge-scaffold>
  </forge-dialog>

  */
