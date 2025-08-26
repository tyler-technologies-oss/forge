import figma, { html } from '@figma/code-connect/html';

figma.connect('<FIGMA_LABEL_VALUE_LABEL_VALUE>', {
  props: {
    display: figma.enum('Display', {
      Inline: 'inline'
    }),
    iconSlot: figma.boolean('Icon slot', {
      true: html`<forge-icon name="icon_name" slot="icon"></forge-icon>`,
      false: undefined
    }),
    label: figma.string('Label'),
    value: figma.string('Value')
  },
  example: (props: any) =>
    html` <forge-label-value ${props.display}>
      ${props.iconSlot}
      <label slot="label">${props.label}</label>
      <span slot="value">${props.value}</span>
    </forge-label-value>`
});
