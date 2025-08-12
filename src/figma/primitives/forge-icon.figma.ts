import figma, { html } from '@figma/code-connect/html';

// forge-icon[16px] component
figma.connect('<FIGMA_ICONS_16PX>', {
  props: {
    icon: figma.instance('Icon')
  },
  example: ({ icon }) => html`${icon}`
});

// forge-icon component with size variants
figma.connect('<FIGMA_ICONS_ICON>', {
  props: {
    icon: figma.instance('Icon')
  },

  //todo: update example to use name prop instead of hardcoded value once available
  example: (props: { icon: any }) => html`<forge-icon name="icon_name"></forge-icon>`
});
