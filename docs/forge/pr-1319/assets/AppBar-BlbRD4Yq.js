import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-BjnIcTYW.js";import{n as c,t as l}from"./CustomArgTypes-DROUQxDe.js";import{n as u,t as d}from"./CssOnlyInformation-CQJC9Sae.js";import{a as f,i as p,n as m,o as h,r as g,s as _,t as v}from"./AppBar.stories-CH65Yp5V.js";function y(e){let n={blockquote:`blockquote`,code:`code`,em:`em`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(s,{of:v}),`
`,(0,x.jsx)(o,{}),`
`,(0,x.jsx)(n.p,{children:`App bars are a common component used in web applications to provide a consistent location for branding, navigation, and other common elements.`}),`
`,(0,x.jsxs)(n.p,{children:[`The `,(0,x.jsx)(n.code,{children:`<forge-app-bar>`}),` is nothing more than a container for other add-on components, but it provides named slots and a common location for branding logo, title, and other actions.`]}),`
`,(0,x.jsx)(n.h2,{id:`default`,children:`Default`}),`
`,(0,x.jsx)(n.p,{children:`A basic app bar just contains a title with no other elements.`}),`
`,(0,x.jsx)(a,{of:p}),`
`,(0,x.jsx)(n.h2,{id:`full`,children:`Full`}),`
`,(0,x.jsx)(n.p,{children:`The following example shows the usage of all of the common app bar elements placed in their corresponding slots.`}),`
`,(0,x.jsx)(a,{of:f}),`
`,(0,x.jsx)(n.h2,{id:`theming`,children:`Theming`}),`
`,(0,x.jsx)(n.p,{children:`The app bar will automatically use the "brand" theme by default, and inherit global theme tokens to ensure child elements are styled accordingly. This handles the most
common use cases, but you can also customize the app bar to use a different theme or adjust how its theme tokens are applied.`}),`
`,(0,x.jsxs)(n.p,{children:[`The important aspect of theming the app bar is to correctly style the sub-components that are placed within it. By default the app bar will set the `,(0,x.jsx)(n.code,{children:`color`}),` style
that it expects, which will be inherited automatically by most child elements. This comes with the caveat that some child elements may inherit color styles incorrectly.
This issue is most commonly seen with popovers and dialogs that placed as children within the app bar, and the global theme tokens may cascade to those elements causing
problems with the colors.`]}),`
`,(0,x.jsx)(n.h3,{id:`theme-mode`,children:`Theme Mode`}),`
`,(0,x.jsx)(n.p,{children:`The app bar has two theme modes:`}),`
`,(0,x.jsxs)(n.ul,{children:[`
`,(0,x.jsxs)(n.li,{children:[(0,x.jsx)(n.code,{children:`"inherit"`}),` `,(0,x.jsx)(n.em,{children:`(default)`}),`: The app bar will inherit the global theme tokens and apply them to the app bar and its child elements.`]}),`
`,(0,x.jsxs)(n.li,{children:[(0,x.jsx)(n.code,{children:`"scoped"`}),`: The app bar will set its own theme tokens and scope them to the app bar only. No global theme tokens will be applied to the app bar or its child elements.`]}),`
`]}),`
`,(0,x.jsxs)(n.p,{children:[`To handle the problem where the global theme is cascading to child elements that you don't want to inherit the theme, you can set the `,(0,x.jsx)(n.code,{children:`theme-mode`}),` attribute on the app bar
to `,(0,x.jsx)(n.code,{children:`"scoped"`}),`. This will ensure that the app bar's theme tokens are scoped to only the app bar, and switches the app bar to instead set scoped theme tokens for the child elements
to optionally inherit.`]}),`
`,(0,x.jsxs)(n.p,{children:[`This fixes the problem of cascading global theme tokens to child elements, but you may potentially see another issue when doing this where certain elements placed directly in the app bar
may no longer be inheriting the correct theme colors because this inheritance has been disabled. To fix this problem, Forge provides a `,(0,x.jsx)(n.code,{children:`theme="app-bar"`}),` attribute that can be set on
the following child elements to allow for them to inherit the "scoped" theme tokens from the app bar:`]}),`
`,(0,x.jsxs)(n.ul,{children:[`
`,(0,x.jsx)(n.li,{children:(0,x.jsx)(n.code,{children:`<forge-button>`})}),`
`,(0,x.jsx)(n.li,{children:(0,x.jsx)(n.code,{children:`<forge-icon-button>`})}),`
`,(0,x.jsx)(n.li,{children:(0,x.jsx)(n.code,{children:`<forge-tab-bar>`})}),`
`]}),`
`,(0,x.jsxs)(n.p,{children:[`Example usage with `,(0,x.jsx)(n.code,{children:`theme-mode="scoped"`}),`:`]}),`
`,(0,x.jsx)(n.pre,{children:(0,x.jsx)(n.code,{className:`language-html`,children:`<forge-app-bar theme-mode="scoped">
  <!-- Themed icon button -->
  <forge-icon-button slot="end" theme="app-bar">
    <forge-icon name="settings"></forge-icon>
  </forge-icon-button>

  <!-- Themed button -->
  <forge-button slot="end" theme="app-bar">Profile</forge-button>

  <!-- Theme tab bar -->
  <forge-tab-bar slot="bottom" theme="app-bar">
    <forge-tab selected>Tab 1</forge-tab>
    <forge-tab>Tab 2</forge-tab>
    <forge-tab>Tab 3</forge-tab>
  </forge-tab-bar>
</forge-app-bar>
`})}),`
`,(0,x.jsxs)(n.p,{children:[`Using the `,(0,x.jsx)(n.code,{children:`theme="app-bar"`}),` attribute will automatically set the correct colors for usage within a scoped app bar. Keep in mind that the following convenience components automatically set
this attribute for you, so you do not need to set it manually:`]}),`
`,(0,x.jsxs)(n.ul,{children:[`
`,(0,x.jsx)(n.li,{children:(0,x.jsx)(n.code,{children:`<forge-app-bar-menu-button>`})}),`
`,(0,x.jsx)(n.li,{children:(0,x.jsx)(n.code,{children:`<forge-app-bar-help-button>`})}),`
`,(0,x.jsx)(n.li,{children:(0,x.jsx)(n.code,{children:`<forge-app-bar-profile-button>`})}),`
`,(0,x.jsx)(n.li,{children:(0,x.jsx)(n.code,{children:`<forge-app-bar-notification-button>`})}),`
`]}),`
`,(0,x.jsxs)(n.blockquote,{children:[`
`,(0,x.jsxs)(n.p,{children:[(0,x.jsx)(n.strong,{children:`Note:`}),` The `,(0,x.jsx)(n.code,{children:`theme="app-bar"`}),` attribute is only supported on a small subset of Forge components as noted above.`]}),`
`,(0,x.jsx)(n.p,{children:`If you are using a component that does not support this attribute, but would like it to inherit the scoped theme tokens, you will need to manually reference the app bar's scoped theme tokens:`}),`
`,(0,x.jsx)(n.p,{children:`Available scoped tokens:`}),`
`,(0,x.jsxs)(n.ul,{children:[`
`,(0,x.jsxs)(n.li,{children:[(0,x.jsx)(n.code,{children:`--forge-app-bar-theme-foreground`}),`: The foreground color of the app bar theme.`]}),`
`,(0,x.jsxs)(n.li,{children:[(0,x.jsx)(n.code,{children:`--forge-app-bar-theme-background-muted`}),`: A muted foreground color using the `,(0,x.jsx)(n.code,{children:`medium`}),` color emphasis.`]}),`
`]}),`
`,(0,x.jsx)(n.pre,{children:(0,x.jsx)(n.code,{className:`language-css`,children:`forge-app-bar forge-avatar {
  --forge-avatar-background: var(--forge-app-bar-theme-foreground);
  --forge-avatar-color: var(--forge-theme-text-high);
}
`})}),`
`,(0,x.jsx)(n.p,{children:`This will ensure that this component uses the correct colors for the app bar theme.`}),`
`]}),`
`,(0,x.jsx)(n.h3,{id:`white-theme`,children:`White Theme`}),`
`,(0,x.jsxs)(n.p,{children:[`The app bar provides a built-in "white" theme that can be applied by setting the `,(0,x.jsx)(n.code,{children:`theme="white"`}),` attribute. This will change the background color to
white and the contrast/text color to black.`]}),`
`,(0,x.jsx)(a,{of:h}),`
`,(0,x.jsxs)(n.blockquote,{children:[`
`,(0,x.jsxs)(n.p,{children:[(0,x.jsx)(n.strong,{children:`Note:`}),` The sub-components will properly inherit the correct theme colors if using the `,(0,x.jsx)(n.code,{children:`theme="app-bar"`}),` attribute, and this can be used in conjunction with the `,(0,x.jsx)(n.code,{children:`theme-mode="scoped"`}),` attribute.`]}),`
`]}),`
`,(0,x.jsx)(n.h3,{id:`custom-theme`,children:`Custom Theme`}),`
`,(0,x.jsx)(n.p,{children:`The app bar can also be themed using a custom theme by using the design tokens as CSS variables. This allows you to set the background color, text color, and
other styles using to match your desired brand.`}),`
`,(0,x.jsxs)(n.p,{children:[`In addition to the above, if you want to disable inheritance of global theme tokens you can set `,(0,x.jsx)(n.code,{children:`theme-mode="scoped"`}),`.`]}),`
`,(0,x.jsx)(a,{of:g}),`
`,(0,x.jsxs)(n.blockquote,{children:[`
`,(0,x.jsxs)(n.p,{children:[(0,x.jsx)(n.strong,{children:`Note:`}),` To ensure that sub-components properly inherit your custom theme, you may either need to manually override their own component-specific design tokens, or
you can update the app bar theme design tokens as well to ensure they are inherited by all sub-components that use the `,(0,x.jsx)(n.code,{children:`theme="app-bar"`}),` attribute.`]}),`
`]}),`
`,(0,x.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,x.jsx)(l,{}),`
`,(0,x.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,x.jsxs)(n.ul,{children:[`
`,(0,x.jsx)(n.li,{children:`Ensure that the user can interact with each sub-component of the app bar using only the keyboard.`}),`
`,(0,x.jsxs)(n.li,{children:[`The app bar component will use an `,(0,x.jsx)(n.code,{children:`<h1>`}),` for the title by default. If you override the title slot content, be sure to use the proper heading element.`,`
`,(0,x.jsxs)(n.ul,{children:[`
`,(0,x.jsxs)(n.li,{children:[`Only `,(0,x.jsx)(n.strong,{children:`one`}),` `,(0,x.jsx)(n.code,{children:`<h1>`}),` should be on a page at any given time (unless a new heading hierarchy is created as a sibling).`]}),`
`]}),`
`]}),`
`,(0,x.jsxs)(n.li,{children:[`A `,(0,x.jsx)(n.code,{children:`<header>`}),` element is built-in to the app bar component.`]}),`
`]}),`
`,(0,x.jsx)(n.h2,{id:`css-only`,children:`CSS-Only`}),`
`,(0,x.jsx)(n.p,{children:`The app-bar component is also available as a CSS-only component without the need for JavaScript.`}),`
`,(0,x.jsx)(a,{of:m}),`
`,(0,x.jsxs)(n.p,{children:[`You may need to customize the layout and styles to fit your specific needs. While there are built-in "section" classes for you to use, these are very
specific to the default app bar layout and may not work for `,(0,x.jsx)(n.em,{children:`all`}),` use cases. In these scenarios, you can always create your own layout within the app bar element,
and use your own HTML/CSS to style the content within while still using the standard app bar design for the overall container.`]}),`
`,(0,x.jsx)(n.pre,{children:(0,x.jsx)(n.code,{className:`language-html`,children:`<header class="forge-app-bar">
  <div class="my-custom-layout">
    <!-- Custom layout content -->
  </div>
</header>
`})}),`
`,(0,x.jsx)(d,{})]})}function b(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,x.jsx)(n,{...e,children:(0,x.jsx)(y,{...e})}):y(e)}var x;function S(){return(S=e((()=>{x=r(),n(),i(),c(),u(),_()})))()}S();export{b as default};