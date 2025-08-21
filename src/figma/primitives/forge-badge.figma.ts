import figma, { html } from '@figma/code-connect/html';

// button component
figma.connect('<FIGMA_BADGE_BADGE>', {
  props: {
    text: figma.string('Text'),
    startInstance: figma.boolean('Start slot', {
      true: html`<forge-icon name="icon_name" slot="start"></forge-icon>`,
      false: undefined
    }),
    endInstance: figma.boolean('End slot', {
      true: html`<forge-icon name="icon_name" slot="end"></forge-icon>`,
      false: undefined
    }),
    // startInstanceName: figma.children(".forge-icon"),
    startInstanceName: figma.nestedProps('.forge-icon', {
      icon: figma.instance('Icon')
    }),
    theme: figma.enum('Theme', {
      Default: 'default',
      Primary: 'primary',
      Secondary: 'secondary',
      Tertiary: 'tertiary',
      Success: 'success',
      Warning: 'warning',
      Error: 'error',
      Info: 'info',
      'Info secondary': 'info-secondary'
    }),
    strong: figma.boolean('Strong', {
      true: html`strong`,
      false: undefined
    }),
    dot: figma.boolean('Dot', {
      true: html`dot`,
      false: undefined
    })
  },
  example: (props: any) =>
    html` <forge-badge theme="${props.theme}" ${props.strong} ${props.dot}> ${props.startInstance} ${props.text} ${props.endInstance} </forge-badge>`
});
