import figma, { html } from '@figma/code-connect/html';

const keyItemProps = {
  label: figma.string('Label'),
  value: figma.string('Value'),
  inline: figma.enum('Inline', {
    true: 'inline',
    false: undefined
  })
};

// forge-key-item component
figma.connect('<FIGMA_KEY_ITEM_KEY_ITEM>', {
  variant: { Inline: false },
  props: {
    ...keyItemProps
  },
  example: (props: any) =>
    html`<forge-key-item ${props.inline}>
      <span>${props.label}</span>
      <span slot="value">${props.value}</span>
    </forge-key-item>`
});

figma.connect('<FIGMA_KEY_ITEM_KEY_ITEM>', {
  variant: { Inline: true },
  props: {
    ...keyItemProps
  },
  example: (props: any) =>
    html`<forge-key-item ${props.inline}>
      <span>${props.label}</span>
      <span slot="value">${props.value}</span>
    </forge-key-item>`
});

// forge-key component
figma.connect('<FIGMA_KEY_KEY>', {
  props: {
    keyItems: figma.children('forge-key-item')
  },
  example: (props: any) => html`<forge-key> ${props.keyItems} </forge-key>`
});
