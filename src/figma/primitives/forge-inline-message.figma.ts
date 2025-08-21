import figma, { html } from '@figma/code-connect/html';

const sharedProps = {
  title: figma.string('Title'),
  showIcon: figma.boolean('Show icon', {
    true: html`<forge-icon name="icon_name" slot="icon"></forge-icon>`,
    false: undefined
  }),
  showTitle: figma.boolean('Show title', {
    true: figma.string('Title'),
    false: undefined
  }),
  body: figma.string('Body')
};

figma.connect('<FIGMA_INLINE_MESSAGE_INLINE_MESSAGE>', {
  props: {
    ...sharedProps
  },
  example: (props: any) => html` <forge-inline-message theme="info"> ${props.showIcon} ${props.body} </forge-inline-message>`
});

figma.connect('<FIGMA_INLINE_MESSAGE_INLINE_MESSAGE>', {
  variant: { 'Show title': true },
  props: {
    ...sharedProps
  },
  example: (props: any) =>
    html` <forge-inline-message theme="info">
      ${props.showIcon}
      <span slot="title">${props.title}</span>
      <p>${props.body}</p>
    </forge-inline-message>`
});
