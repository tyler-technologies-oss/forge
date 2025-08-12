import figma, { html } from '@figma/code-connect/html';

figma.connect('<FIGMA_TOAST_TOAST>', {
  props: {
    text: figma.string('Text'),
    dismissible: figma.boolean('Dismissible', {
      true: html`dismissible`,
      false: undefined
    }),
    actionText: figma.nestedProps('forge-button', {
      text: figma.string('Text')
    })
  },

  example: props => html`<forge-toast action-text="${props.actionText.text}" ${props.dismissible}>${props.text}</forge-toast>`
});
