import figma, { html } from '@figma/code-connect/html';

// scaffold - detachable layout tool for full application layout
figma.connect('<FIGMA_SCAFFOLD_SCAFFOLD>', {
  props: {
    leftContent: figma.instance('left content'),
    rightContent: figma.instance('right content'),
    headerContent: figma.instance('header content'),
    footerContent: figma.instance('footer content'),
    bodyHeaderContent: figma.instance('body-header content'),
    bodyLeftContent: figma.instance('body-left content'),
    bodyContent: figma.instance('body content'),
    bodyRightContent: figma.instance('body-right content'),
    bodyFooterContent: figma.instance('body-footer content')
  },
  example: (props: any) =>
    html`<forge-scaffold>
      <div slot="left">${props.leftContent}</div>
      <div slot="header">${props.headerContent}</div>
      <div slot="body-header">${props.bodyHeaderContent}</div>
      <div slot="body-left">${props.bodyLeftContent}</div>
      <div slot="body">${props.bodyContent}</div>
      <div slot="body-right">${props.bodyRightContent}</div>
      <div slot="body-footer">${props.bodyFooterContent}</div>
      <div slot="footer">${props.footerContent}</div>
      <div slot="right">${props.rightContent}</div>
    </forge-scaffold>`
});
