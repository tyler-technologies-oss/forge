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
    headerSlot: figma.boolean('Header slot', {
      true: figma.instance('Header instance'),
      false: undefined
    }),
    bodyInstance: figma.instance('Body instance'),
    footerSlot: figma.boolean('Footer slot', {
      true: figma.instance('Footer instance'),
      false: undefined
    })
  },
  example: (props: any) =>
    html` <forge-drawer slot="body-left">
      ${props.headerSlot}
      <aside>${props.bodyInstance}</aside>
      ${props.footerSlot}
    </forge-drawer>`
});
