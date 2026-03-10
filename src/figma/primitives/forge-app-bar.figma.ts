import figma, { html } from '@figma/code-connect/html';

// app-bar - application header bar with logo, title, and action areas
figma.connect('<FIGMA_APP_BAR_APP_BAR>', {
  props: {
    theme: figma.enum('Theme', {
      Default: undefined,
      White: 'white'
    }),
    showMenu: figma.boolean('Show menu', {
      true: html`<forge-app-bar-menu-button slot="start"></forge-app-bar-menu-button>`,
      false: undefined
    }),
    showLogo: figma.boolean('Show logo container', {
      true: figma.instance('Logo & title slot'),
      false: undefined
    }),
    centerSlot: figma.boolean('Show center', {
      true: figma.instance('Center slot'),
      false: undefined
    }),
    endSlot: figma.boolean('Show End', {
      true: figma.instance('End slot'),
      false: undefined
    })
  },
  example: (props: any) =>
    html`<forge-app-bar title-text="Application Title" theme="${props.theme}" theme-mode="inherit">
      ${props.showMenu} ${props.showLogo} ${props.centerSlot} ${props.endSlot}
    </forge-app-bar>`
});

// logo-title-container - shows the logo icon and title text
figma.connect('<FIGMA_APP_BAR_LOGO_TITLE_CONTAINER>', {
  props: {
    logoIcon: figma.boolean('Show logo icon', {
      true: html`<forge-icon slot="logo" name="forge_logo"></forge-icon>`,
      false: undefined
    })
  },
  example: (props: any) => html`${props.logoIcon}`
});

// forge-app-bar-search - search input component for app bar
figma.connect('<FIGMA_APP_BAR_SEARCH>', {
  props: {
    text: figma.string('Text')
  },
  example: (props: any) =>
    html`<forge-app-bar-search slot="center">
      <input type="text" placeholder="${props.text}" />
    </forge-app-bar-search>`
});

// end-slot-content - contains action buttons and avatar in the end slot
figma.connect('<FIGMA_APP_BAR_END_SLOT_CONTENT>', {
  props: {
    children: figma.children('*')
  },
  example: (props: any) => html`${props.children}`
});
