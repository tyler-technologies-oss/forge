import figma, { html } from '@figma/code-connect/html';

// Drawer
figma.connect('<FIGMA_DRAWER_DRAWER>', {
  props: {
    listItem: figma.children('*')
  },
  example: (props: any) =>
    html` <forge-drawer slot="body-left">
      <aside>
        <forge-list navlist> ${props.listItem} </forge-list>
      </aside>
    </forge-drawer>`
});

figma.connect('<FIGMA_DRAWER_DRAWER>', {
  variant: { Type: 'Nav - Mini' },
  props: {
    listItem: figma.children('*')
  },
  example: (props: any) =>
    html` <forge-mini-drawer slot="body-left">
      <aside>
        <forge-list navlist> ${props.listItem} </forge-list>
      </aside>
    </forge-mini-drawer>`
});

figma.connect('<FIGMA_DRAWER_DRAWER>', {
  variant: { Type: 'Toolbars' },
  props: {
    slotHeader: figma.slot('header'),
    slotBody: figma.slot('Slot'),
    slotFooter: figma.slot('footer')
    /* slots are in beta, retaining until general availability
    headerSlot: figma.boolean('Header slot', {
      true: figma.instance('Header instance'),
      false: undefined
    }),
    footerSlot: figma.boolean('Footer slot', {
      true: figma.instance('Footer instance'),
      false: undefined
    })
*/
  },
  example: (props: any) =>
    html` <forge-drawer slot="body-left">
      ${props.slotHeader}
      <aside>${props.slotBody}</aside>
      ${props.slotFooter}
    </forge-drawer>`
});
