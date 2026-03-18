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
    bodySlot: figma.slot('Slot')
  },
  example: (props: any) =>
    html`<forge-dialog open ${props.moveable}>
      <forge-scaffold>
        ${props.toolbars?.[0]}
        <div slot="body">${props.bodySlot}</div>
        ${props.toolbars?.[1]}
      </forge-scaffold>
    </forge-dialog>`
});
