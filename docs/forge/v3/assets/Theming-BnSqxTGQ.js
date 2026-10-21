import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,u as a}from"./blocks-Bcs6hT4V.js";function o(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,strong:`strong`,...t(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a,{title:`Getting Started/Theming`}),`
`,(0,c.jsx)(n.h1,{id:`theming`,children:`Theming`}),`
`,(0,c.jsx)(n.p,{children:`Theming within Forge is supported at the core, and colors can be easily adjusted at a granular component level, or across
the library as a whole depending on which theme token values are inherited by each component.`}),`
`,(0,c.jsx)(n.p,{children:`All custom theming in Forge is done via adjusting the CSS custom properties, but the library provides utility
Sass mixins for every component, as well as the global theme so that you can easily generate the correct custom property
definitions. Optionally, you can provide a custom stylesheet that uses the Sass mixins to generate a default set of
custom property definitions without needing to override the default definitions if you prefer. More on this below.`}),`
`,(0,c.jsxs)(n.p,{children:[`An important note about theming is that if you need to customize anything that is `,(0,c.jsx)(n.strong,{children:`not`}),` available through CSS custom
properties, you can always target internal elements directly using the `,(0,c.jsx)(n.a,{href:`#css-shadow-parts`,children:`CSS Shadow Parts`}),`.`]}),`
`,(0,c.jsx)(n.h2,{id:`colors`,children:`Colors`}),`
`,(0,c.jsxs)(n.p,{children:[`To view a complete set of the color tokens that are available for theming, please view the `,(0,c.jsx)(n.a,{href:`?path=/docs/design-tokens-color--docs`,children:`color design tokens`}),`.`]}),`
`,(0,c.jsx)(n.h2,{id:`css-custom-properties`,children:`CSS custom properties`}),`
`,(0,c.jsxs)(n.p,{children:[`If you're not familiar with CSS custom properties, we recommend that you read the `,(0,c.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/CSS/--*`,rel:`nofollow`,children:`MDC documentation`}),` before continuing.`]}),`
`,(0,c.jsx)(n.p,{children:`CSS custom properties (also known as CSS variables) allow for us to provide custom styles that all components across the library can inherit from for things
like global theme values, font size, or any other commonly used CSS value. Along with that, individual components can also define their own custom properties
for specific internal styles that are frequently changed. This approach makes sharing styles across the library easier, while giving hooks to specific styles
within components that are frequently targeted by developers.`}),`
`,(0,c.jsx)(n.h3,{id:`overriding-global-styles`,children:`Overriding global styles`}),`
`,(0,c.jsx)(n.p,{children:`Theming typically begins at adjusting the key colors to match your brand. In the example below you can see that we are setting up a selector targeting
the root element, and we're going to override 3 theme values:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-css`,children:`:root {
  --forge-theme-primary: hotpink;
  --forge-theme-secondary: blueviolet;
  --forge-theme-tertiary: orangered;
}
`})}),`
`,(0,c.jsx)(n.p,{children:`These theme values are inherited by all components that require these specific color values, but it's important to note that you can also use these values
within your own application/components to ensure seamless integration. For example, it is very common to set up your surface and background theme colors
for your application:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-css`,children:`body {
  background-color: var(--forge-theme-surface-dim);
}

.my-content {
  background-color: var(--forge-theme-surface);
}

.my-custom-class {
  color: var(--forge-theme-primary);
}
`})}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:`Note:`}),` the `,(0,c.jsx)(n.code,{children:`<body>`}),` styles are defined for you by including the `,(0,c.jsx)(n.code,{children:`forge-core.css`}),` stylesheet for convenience, among a few other important styles.`]}),`
`]}),`
`,(0,c.jsx)(n.h3,{id:`overriding-component-styles`,children:`Overriding component styles`}),`
`,(0,c.jsx)(n.p,{children:`When you need to override a specific CSS custom property in a specific component instance you will first need to refer to the docs page for the
component you care about to see which custom properties are available. From there you can write a selector to target the element:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<forge-card class="my-card"></forge-card>
`})}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-css`,children:`.my-card {
  --forge-card-background: var(--forge-theme-primary);
}
`})}),`
`,(0,c.jsx)(n.h2,{id:`sass-mixins`,children:`Sass mixins`}),`
`,(0,c.jsx)(n.p,{children:`Using the CSS custom properties directly is always something that you'll need to do, but Forge also provides a robust Sass library that you can take
advantage of, especially when it comes to theming and creating your own theme customizations.`}),`
`,(0,c.jsx)(n.p,{children:`Forge provides Sass mixins for developer convenience that allows for providing a key/value Sass map of theme names and style values to override for various
component and global theme styles. These mixins are not a requirement to use, but they will make your life easier when it comes to customizing and creating
your own themes.`}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsxs)(n.p,{children:[`Forge uses Sass modules. If your project doesn't support Sass modules, you will need to upgrade your installation of `,(0,c.jsx)(n.code,{children:`sass`}),` to make use of these examples.`]}),`
`]}),`
`,(0,c.jsx)(n.h3,{id:`customizing-global-theme`,children:`Customizing global theme`}),`
`,(0,c.jsxs)(n.p,{children:[`Forge exposes a mixin called `,(0,c.jsx)(n.code,{children:`provide()`}),`, and this allows you to pass in theme names and corresponding color values to use.`]}),`
`,(0,c.jsxs)(n.p,{children:[`In the example below, you will see that we are overriding the `,(0,c.jsx)(n.code,{children:`primary`}),`, `,(0,c.jsx)(n.code,{children:`secondary`}),`, and `,(0,c.jsx)(n.code,{children:`tertiary`}),` theme entries with our custom color values.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-css`,children:`@use '@tylertech/forge/styles/core/styles/theme' as forge-theme;

:root {
  @include forge-theme.provide((primary: red, secondary: green, tertiary: blur));
}
`})}),`
`,(0,c.jsx)(n.p,{children:`This is technically equivalent to writing the following CSS:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-css`,children:`:root {
  --forge-theme-primary: red;
  --forge-theme-secondary: green;
  --forge-theme-tertiary: blue;
}
`})}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsx)(n.p,{children:`The benefit to using the Sass mixin is you get integration with key validation, and can be sure your custom properties will always be generated properly.`}),`
`]}),`
`,(0,c.jsx)(n.h3,{id:`customizing-component-theme`,children:`Customizing component theme`}),`
`,(0,c.jsx)(n.p,{children:`Customizing the theme for a specific component can be done much the same way, but you will have to review the documentation for that specific component to know
what style hooks it exposes for theming.`}),`
`,(0,c.jsxs)(n.p,{children:[`In the example below, you'll see that we're overriding component-specific theme values only for the `,(0,c.jsx)(n.code,{children:`<forge-badge>`}),` component:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-css`,children:`@use '@tylertech/forge/styles/badge';

.my-custom-badge {
  @include badge.provide-theme((background: red, color: white));
}
`})}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<forge-badge class="my-custom-badge">Example</forge-badge>
`})}),`
`,(0,c.jsx)(n.h2,{id:`css-shadow-parts`,children:`CSS Shadow Parts`}),`
`,(0,c.jsxs)(n.p,{children:[`If you're not familiar with CSS Shadow Parts, we recommend that you read the `,(0,c.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/CSS/::part`,rel:`nofollow`,children:`MDN documentation`}),` before continuing.`]}),`
`,(0,c.jsxs)(n.p,{children:[`Every component that uses `,(0,c.jsx)(n.a,{href:`?page=/story/guides-shadow-dom--page`,children:`Shadow DOM`}),` within Forge will also have every element within the internal template marked up with
`,(0,c.jsx)(n.code,{children:`part`}),` attributes to enable the use of `,(0,c.jsx)(n.code,{children:`::part`}),` selectors to adjust the styles to your needs.`]}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsx)(n.p,{children:`While this customization is available, keep in mind that you are technically overriding the internals of a component. This is not considered part of the public
component API and is subject to change between any version. However, changes to internal templates will always be noted in the changelog.`}),`
`]}),`
`,(0,c.jsxs)(n.p,{children:[`Also, keep in mind that not every component in Forge uses Shadow DOM. There are certain components that rely on global styles. If you see a `,(0,c.jsx)(n.code,{children:`#shadow-root`}),` node when
inspecting an element in the browser developer tools then you will know if Shadow DOM is in use.`]}),`
`,(0,c.jsxs)(n.p,{children:[`Many components also make use of `,(0,c.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot`,rel:`nofollow`,children:`slots`}),` and the `,(0,c.jsx)(n.code,{children:`::slotted`}),` selector. These elements are provide
by developers that use content projection to render within a specified slot within the internal component template. These elements are fully customizable by
developers when specifying overrides directly using your own selectors.`]}),`
`,(0,c.jsx)(n.p,{children:`An example of customizing the internals of a component using CSS Shadow Parts is shown below:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-css`,children:`// Target all <forge-badge> elements and override the "root" shadow part
forge-badge::part(root) {
  background: red;
  color: white;
}
`})}),`
`,(0,c.jsx)(n.h2,{id:`dark-theme`,children:`Dark theme`}),`
`,(0,c.jsx)(n.p,{children:`Forge provides a built-in default dark theme stylesheet for ease of use that complements our default light theme.`}),`
`,(0,c.jsxs)(n.p,{children:[`A stylesheet is distributed with Forge called `,(0,c.jsx)(n.code,{children:`forge-dark.css`}),` this can be found in the npm package under the `,(0,c.jsx)(n.code,{children:`dist`}),` directory.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-css`,children:`@use '@tylertech/forge/dist/forge-dark';
`})}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsxs)(n.p,{children:[`Loading this stylesheet in your application (after `,(0,c.jsx)(n.code,{children:`forge.css`}),` is loaded) your app will change to dark mode.`]}),`
`]}),`
`,(0,c.jsxs)(n.p,{children:[`The dark theme uses the Sass mixins mentioned above to generate the proper CSS custom property overrides. As you can see below, we just apply
the styles to the `,(0,c.jsx)(n.code,{children:`:root`}),` selector:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-css`,children:`@use '@tylertech/forge/sass/theme/theme-dark';

:root {
  @include theme-dark.theme-properties;
}
`})})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=e((()=>{c=r(),n(),i()})))()}l();export{s as default};