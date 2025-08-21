import figma, { html } from '@figma/code-connect/html';

figma.connect('<FIGMA_AVATAR_AVATAR>', {
  variant: { Type: 'Initials' },
  props: {
    text: figma.string('Text')
  },
  example: (props: any) => html` <forge-avatar text="${props.text}"></forge-avatar>`
});

figma.connect('<FIGMA_AVATAR_AVATAR>', {
  variant: { Type: 'Icon' },
  props: {
    icon: figma.instance('Icon')
  },
  example: (props: any) => html` <forge-avatar>${props.icon}</forge-avatar>`
});

figma.connect('<FIGMA_AVATAR_AVATAR>', {
  variant: { Type: 'Image' },
  props: {
    image: figma.instance('Image')
  },
  example: (props: any) => html` <forge-avatar image-url="./path-to-image.jpg"></forge-avatar>`
});
