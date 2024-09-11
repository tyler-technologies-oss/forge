import{j as e}from"./jsx-runtime-VlwSl-vK.js";import{u as a}from"./index-CzAV1QBz.js";import{ae as s,af as r,ag as n}from"./index-DaJ54NEJ.js";import{C as l}from"./CustomArgTypes-rKU2a13c.js";import{C as h}from"./CssOnlyInformation-Bpsg-jqp.js";import{A as p,D as c,F as m,W as d,C as u,a as b}from"./AppBar.stories-lNyVKZKR.js";import"./iframe-D1u2I3kk.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-DxKRhftL.js";import"./index-DrFu-skq.js";import"./utils-D1kchwVb.js";import"./lit-element-Dk2-kgKT.js";import"./lit-html-DZH-Jm0H.js";import"./index-fxMNKkgx.js";import"./icon-DHpZ4R73.js";import"./constants-DjE6emXm.js";import"./base-adapter-F7QHxK2H.js";import"./index-Dh0vMUMR.js";import"./decorators-DvEJi2JG.js";import"./app-bar-profile-button-cFxi-9cE.js";import"./focus-indicator-_fDu4ZqT.js";import"./state-layer-DTKAXCUq.js";import"./index-ByifSpfC.js";import"./icon-button-XdSjYqUR.js";import"./base-button-adapter-WOmen6Ii.js";import"./with-label-aware-CLWydNrR.js";import"./with-default-aria-DCLjqsVH.js";import"./tooltip-CoCQ3Otm.js";import"./overlay-DWm8nYOy.js";import"./with-longpress-listener-D-8wsf8o.js";import"./dismissible-stack-DoZLb9q6.js";import"./badge-CO5a_--I.js";import"./menu-B7aO8sYr.js";import"./list-C2bUECg8.js";import"./list-dropdown-aware-core-BOk-3RRz.js";import"./list-dropdown-DXeSARaG.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-CcMix19v.js";import"./popover-tgjxHp7t.js";import"./skeleton-Cs99PVGD.js";import"./a11y-BxM9_46k.js";import"./base-component-delegate-C6iOaLFP.js";import"./avatar-Cja6atCs.js";import"./button-C5f1g9CL.js";import"./toolbar-CtEd8mqT.js";import"./expansion-panel-Da14WzAs.js";import"./divider-V8nRRqMS.js";function i(o){const t={blockquote:"blockquote",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...a(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:p}),`
`,e.jsx(r,{}),`
`,e.jsx(t.p,{children:"App bars are a common component used in web applications to provide a consistent location for branding, navigation, and other common elements."}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"<forge-app-bar>"})," is nothing more than a container for other add-on components, but it provides named slots and a common location for branding logo, title, and other actions."]}),`
`,e.jsx(t.h2,{id:"default",children:"Default"}),`
`,e.jsx(t.p,{children:"A basic app bar just contains a title with no other elements."}),`
`,e.jsx(n,{of:c}),`
`,e.jsx(t.h2,{id:"full",children:"Full"}),`
`,e.jsx(t.p,{children:"The following example shows the usage of all of the common app bar elements placed in their corresponding slots."}),`
`,e.jsx(n,{of:m}),`
`,e.jsx(t.h2,{id:"themed",children:"Themed"}),`
`,e.jsxs(t.p,{children:["The app bar can be themed by providing a ",e.jsx(t.code,{children:"theme"}),` attribute. By default it will automatically use the "brand" theme and apply the appropriate colors
to itself and all slotted elements by overriding the global theme colors within the context of the app bar itself only.`]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Important:"}),` This means that if you adjust the global theme variables for colors, the app bar will not be affected by those changes because it
has its own theming context.`]}),`
`]}),`
`,e.jsx(t.h3,{id:"white-theme",children:"White Theme"}),`
`,e.jsxs(t.p,{children:['The app bar provides a built-in "white" theme that can be applied by setting the ',e.jsx(t.code,{children:'theme="white"'}),` attribute. This will change the background color to
white and the contrast/text color to black.`]}),`
`,e.jsx(n,{of:d}),`
`,e.jsx(t.h3,{id:"custom-theme",children:"Custom Theme"}),`
`,e.jsxs(t.p,{children:["You can also provide a custom theme by setting the ",e.jsx(t.code,{children:'theme="custom"'}),` attribute. This will disable any global auto-theming that is built-in to the app bar
and allow you to provide your own fully custom styling. This also allows the global theme variables to cascade down into the app bar as they normally would
because the app bar is no longer overriding the global theme variables.`]}),`
`,e.jsx(n,{of:u}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
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
`,e.jsx(h,{})]})}function ce(o={}){const{wrapper:t}={...a(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(i,{...o})}):i(o)}export{ce as default};
