import figma, { html } from '@figma/code-connect/html';

// forge-skeleton component
figma.connect('<FIGMA_SKELETON_SKELETON>', {
  variant: { Type: 'Text' },
  props: {
    Type: figma.enum('Type', {
      Text: 'text',
      Avatar: 'avatar',
      Button: 'button',
      Chip: 'chip',
      Field: 'form-field',
      ListItem: 'list-item'
    })
  },
  example: (props: any) => html`<forge-skeleton ${props.Type}></forge-skeleton>`
});

// forge-skeleton assemblies component
figma.connect('<FIGMA_SKELETON_ASSEMBLIES>', {
  props: {
    children: figma.children('forge-skeleton')
  },
  example: (props: any) => html`<div>${props.children}</div>`
});
