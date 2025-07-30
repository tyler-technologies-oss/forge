import{j as e,M as s,T as a,C as n}from"./blocks-D96FETv8.js";import{useMDXComponents as r}from"./index-CqXGvudX.js";import{C as h}from"./CustomArgTypes-DDhscICy.js";import{C as l}from"./CssOnlyInformation-kWvEjNDe.js";import{A as c,D as d,F as p,W as m,C as u,a as b}from"./AppBar.stories-QnthBj1E.js";import"./iframe-DIGFEk6P.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-qIDk0Vql.js";import"./icon-B8CdcxqJ.js";import"./constants-wOq9K3uV.js";import"./feature-detection-uS6p5jc8.js";import"./base-adapter-Mla2Q9YN.js";import"./index-CiLSBptl.js";import"./decorators-Ci7TZIBO.js";import"./app-bar-profile-button-BPAPNJxy.js";import"./utils-CRxrUqQD.js";import"./state-layer-BFwsAUDA.js";import"./focus-indicator-IWpzSXYP.js";import"./icon-button-DkluvO-9.js";import"./base-button-adapter-D0zqnDMQ.js";import"./with-label-aware-D31hYnqk.js";import"./with-default-aria-CUUWGrPB.js";import"./a11y-utils-fzPGYZJ6.js";import"./tooltip-CcxiN_AO.js";import"./overlay-D-bkGTD9.js";import"./with-longpress-listener-CGXzI-TM.js";import"./dismissible-stack-BdWcv7_4.js";import"./badge-BNwyNBPQ.js";import"./base-lit-element-DLF96hgu.js";import"./menu-BfPyyeAQ.js";import"./list-z5iQB-6r.js";import"./event-utils-zQ4FLDwK.js";import"./list-dropdown-aware-core-P1eltbhy.js";import"./list-dropdown-C9nqfntS.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-2PahUgVv.js";import"./popover-xi3V_Oll.js";import"./skeleton-C4EH8VF8.js";import"./a11y-BxM9_46k.js";import"./base-component-delegate-CN_SSLUw.js";import"./avatar-fAfs-QxJ.js";import"./state-wIED9F2P.js";import"./style-map-3pRPob4x.js";import"./directive-CJw_OlP2.js";import"./class-map-SfNAeD4z.js";import"./avatar-constants-jPVIytDz.js";import"./button-r2EMLpWm.js";import"./toolbar-Byb6kcao.js";import"./expansion-panel-Cn_4I3Ho.js";import"./divider-DoNAUeHX.js";function i(o){const t={blockquote:"blockquote",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:c}),`
`,e.jsx(a,{}),`
`,e.jsx(t.p,{children:"App bars are a common component used in web applications to provide a consistent location for branding, navigation, and other common elements."}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"<forge-app-bar>"})," is nothing more than a container for other add-on components, but it provides named slots and a common location for branding logo, title, and other actions."]}),`
`,e.jsx(t.h2,{id:"default",children:"Default"}),`
`,e.jsx(t.p,{children:"A basic app bar just contains a title with no other elements."}),`
`,e.jsx(n,{of:d}),`
`,e.jsx(t.h2,{id:"full",children:"Full"}),`
`,e.jsx(t.p,{children:"The following example shows the usage of all of the common app bar elements placed in their corresponding slots."}),`
`,e.jsx(n,{of:p}),`
`,e.jsx(t.h2,{id:"theming",children:"Theming"}),`
`,e.jsx(t.p,{children:`The app bar will automatically use the "brand" theme by default, and inherit global theme tokens to ensure child elements are styled accordingly. This handles the most
common use cases, but you can also customize the app bar to use a different theme or adjust how its theme tokens are applied.`}),`
`,e.jsxs(t.p,{children:["The important aspect of theming the app bar is to correctly style the sub-components that are placed within it. By default the app bar will set the ",e.jsx(t.code,{children:"color"}),` style
that it expects, which will be inherited automatically by most child elements. This comes with the caveat that some child elements may inherit color styles incorrectly.
This issue is most commonly seen with popovers and dialogs that placed as children within the app bar, and the global theme tokens may cascade to those elements causing
problems with the colors.`]}),`
`,e.jsx(t.h3,{id:"theme-mode",children:"Theme Mode"}),`
`,e.jsx(t.p,{children:"The app bar has two theme modes:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:'"inherit"'})," ",e.jsx(t.em,{children:"(default)"}),": The app bar will inherit the global theme tokens and apply them to the app bar and its child elements."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:'"scoped"'}),": The app bar will set its own theme tokens and scope them to the app bar only. No global theme tokens will be applied to the app bar or its child elements."]}),`
`]}),`
`,e.jsxs(t.p,{children:["To handle the problem where the global theme is cascading to child elements that you don't want to inherit the theme, you can set the ",e.jsx(t.code,{children:"theme-mode"}),` attribute on the app bar
to `,e.jsx(t.code,{children:'"scoped"'}),`. This will ensure that the app bar's theme tokens are scoped to only the app bar, and switches the app bar to instead set scoped theme tokens for the child elements
to optionally inherit.`]}),`
`,e.jsxs(t.p,{children:[`This fixes the problem of cascading global theme tokens to child elements, but you may potentially see another issue when doing this where certain elements placed directly in the app bar
may no longer be inheriting the correct theme colors because this inheritance has been disabled. To fix this problem, Forge provides a `,e.jsx(t.code,{children:'theme="app-bar"'}),` attribute that can be set on
the following child elements to allow for them to inherit the "scoped" theme tokens from the app bar:`]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"<forge-button>"})}),`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"<forge-icon-button>"})}),`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"<forge-tab-bar>"})}),`
`]}),`
`,e.jsxs(t.p,{children:["Example usage with ",e.jsx(t.code,{children:'theme-mode="scoped"'}),":"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<forge-app-bar theme-mode="scoped">
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
`,e.jsxs(t.p,{children:["Using the ",e.jsx(t.code,{children:'theme="app-bar"'}),` attribute will automatically set the correct colors for usage within a scoped app bar. Keep in mind that the following convenience components automatically set
this attribute for you, so you do not need to set it manually:`]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"<forge-app-bar-menu-button>"})}),`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"<forge-app-bar-help-button>"})}),`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"<forge-app-bar-profile-button>"})}),`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"<forge-app-bar-notification-button>"})}),`
`]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Note:"})," The ",e.jsx(t.code,{children:'theme="app-bar"'})," attribute is only supported on a small subset of Forge components as noted above."]}),`
`,e.jsx(t.p,{children:"If you are using a component that does not support this attribute, but would like it to inherit the scoped theme tokens, you will need to manually reference the app bar's scoped theme tokens:"}),`
`,e.jsx(t.p,{children:"Available scoped tokens:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"--forge-app-bar-theme-foreground"}),": The foreground color of the app bar theme."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"--forge-app-bar-theme-background-muted"}),": A muted foreground color using the ",e.jsx(t.code,{children:"medium"})," color emphasis."]}),`
`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-css",children:`forge-app-bar forge-avatar {
  --forge-avatar-background: var(--forge-app-bar-theme-foreground);
  --forge-avatar-color: var(--forge-theme-text-high);
}
`})}),`
`,e.jsx(t.p,{children:"This will ensure that this component uses the correct colors for the app bar theme."}),`
`]}),`
`,e.jsx(t.h3,{id:"white-theme",children:"White Theme"}),`
`,e.jsxs(t.p,{children:['The app bar provides a built-in "white" theme that can be applied by setting the ',e.jsx(t.code,{children:'theme="white"'}),` attribute. This will change the background color to
white and the contrast/text color to black.`]}),`
`,e.jsx(n,{of:m}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Note:"})," The sub-components will properly inherit the correct theme colors if using the ",e.jsx(t.code,{children:'theme="app-bar"'})," attribute, and this can be used in conjunction with the ",e.jsx(t.code,{children:'theme-mode="scoped"'})," attribute."]}),`
`]}),`
`,e.jsx(t.h3,{id:"custom-theme",children:"Custom Theme"}),`
`,e.jsx(t.p,{children:`The app bar can also be themed using a custom theme by using the design tokens as CSS variables. This allows you to set the background color, text color, and
other styles using to match your desired brand.`}),`
`,e.jsxs(t.p,{children:["In addition to the above, if you want to disable inheritance of global theme tokens you can set ",e.jsx(t.code,{children:'theme-mode="scoped"'}),"."]}),`
`,e.jsx(n,{of:u}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Note:"}),` To ensure that sub-components properly inherit your custom theme, you may either need to manually override their own component-specific design tokens, or
you can update the app bar theme design tokens as well to ensure they are inherited by all sub-components that use the `,e.jsx(t.code,{children:'theme="app-bar"'})," attribute."]}),`
`]}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(h,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Ensure that the user can interact with each sub-component of the app bar using only the keyboard."}),`
`,e.jsxs(t.li,{children:["The app bar component will use an ",e.jsx(t.code,{children:"<h1>"})," for the title by default. If you override the title slot content, be sure to use the proper heading element.",`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Only ",e.jsx(t.strong,{children:"one"})," ",e.jsx(t.code,{children:"<h1>"})," should be on a page at any given time (unless a new heading hierarchy is created as a sibling)."]}),`
`]}),`
`]}),`
`,e.jsxs(t.li,{children:["A ",e.jsx(t.code,{children:"<header>"})," element is built-in to the app bar component."]}),`
`]}),`
`,e.jsx(t.h2,{id:"css-only",children:"CSS-Only"}),`
`,e.jsx(t.p,{children:"The app-bar component is also available as a CSS-only component without the need for JavaScript."}),`
`,e.jsx(n,{of:b}),`
`,e.jsxs(t.p,{children:[`You may need to customize the layout and styles to fit your specific needs. While there are built-in "section" classes for you to use, these are very
specific to the default app bar layout and may not work for `,e.jsx(t.em,{children:"all"}),` use cases. In these scenarios, you can always create your own layout within the app bar element,
and use your own HTML/CSS to style the content within while still using the standard app bar design for the overall container.`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<header class="forge-app-bar">
  <div class="my-custom-layout">
    <!-- Custom layout content -->
  </div>
</header>
`})}),`
`,e.jsx(l,{})]})}function pe(o={}){const{wrapper:t}={...r(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(i,{...o})}):i(o)}export{pe as default};
