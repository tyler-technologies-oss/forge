import figma, { html } from '@figma/code-connect/html';

const sharedProps = {
  showBeforeStart: figma.boolean('Show before-start', {
    true: html`<div slot="before-start"></div>`
  }),
  showStart: figma.boolean('Show start', {
    true: html`<div slot="start"></div>`
  }),
  showCenter: figma.boolean('Show center', {
    true: html`<div slot="center"></div>`
  }),
  showEnd: figma.boolean('Show end', {
    true: html`<div slot="end"></div>`
  }),
  showAfterEnd: figma.boolean('Show after-end', {
    true: html`<div slot="after-end"></div>`
  }),
  text: figma.string('Text')
};

// basic toolbar variant
figma.connect('<FIGMA_TOOLBAR_TOOLBAR>', {
  variant: { Type: 'Basic' },
  props: {
    ...sharedProps
  },
  example: (props: any) =>
    html` <forge-toolbar>
      <h2 class="forge-typography--headline3" slot="start">${props.text}</h2>
    </forge-toolbar>`
});

// footer toolbar variant
figma.connect('<FIGMA_TOOLBAR_TOOLBAR>', {
  variant: { Type: 'Footer' },
  props: {
    children: figma.children('forge-button')
  },
  example: (props: any) =>
    html` <forge-toolbar>
      <div slot="end">${props.children}</div>
    </forge-toolbar>`
});

// scaffold toolbar variant
// figma.connect("<FIGMA_TOOLBAR_TOOLBAR>", {
//     variant: { Type: "Scaffold" },
//     props: {
//       ...sharedProps,
//     },
//     example: (props) => html`
//       <forge-toolbar>
//         ${props.showBeforeStart}
//         ${props.showStart}
//         ${props.showCenter}
//         ${props.showEnd}
//         ${props.showAfterEnd}
//       </forge-toolbar>`,
//   },
// )

// secondary toolbar variant
figma.connect('<FIGMA_TOOLBAR_TOOLBAR>', {
  props: {
    ...sharedProps,
    beforeStartSlot: figma.instance('before slot'),
    startSlot: figma.instance('start slot'),
    centerSlot: figma.instance('center slot'),
    endSlot: figma.instance('end slot'),
    afterEndSlot: figma.instance('after slot')
  },
  example: (props: any) =>
    html` <forge-toolbar>
      <div slot="before-start">${props.beforeStartSlot}</div>
      <div slot="start">${props.startSlot}</div>
      <div slot="center">${props.centerSlot}</div>
      <div slot="end">${props.endSlot}</div>
      <div slot="after-end">${props.afterEndSlot}</div>
    </forge-toolbar>`
});
