import{u as n,j as e,M as s,T as l,C as i}from"./blocks-ZCF8jAuh.js";import{C as a}from"./CustomArgTypes-BrNnIXPT.js";import{U as p,D as h}from"./UserProfile.stories-BTaIsw6K.js";import{Demo as d}from"./ProfileLink.stories-KgBQYxN1.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DAoAvB82.js";import"./iframe-CGF9490j.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-cbnKSSEt.js";import"./ref-9RqS8T1P.js";import"./base-lit-element-BzArp5lX.js";import"./directive-CwRn8Fwj.js";import"./service-adapter-DlT-lJx7.js";import"./tyler-icons-CM84cyec.js";import"./property-h_NQN_ax.js";import"./constants-Ds-UekRh.js";import"./feature-detection-Cxj81Y1H.js";import"./state-CvgusLtP.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./base-DVmwUFg0.js";import"./when-CI7b_ccM.js";import"./utils-DU-9AqTO.js";import"./avatar-B7h22bVK.js";import"./style-map-cEBdjqsX.js";import"./class-map-C-Xl3VxB.js";import"./button-X-BaipNf.js";import"./focus-indicator-BuzCXwAm.js";import"./state-layer-BcVD1OXH.js";import"./base-component-DokdPcmx.js";import"./base-adapter-C2s8cO2K.js";import"./dom-utils-D38acdAW.js";import"./base-button-BJYE3STx.js";import"./query-CtiAP21w.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-a04gn1ZN.js";import"./button-constants-D5k34xES.js";import"./divider-BzjCc6TM.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./icon-button-D1wmfd79.js";import"./icon-button-constants-BJvh1yHL.js";import"./list-EiOoI77I.js";import"./list-item-BwYEQ33V.js";import"./event-utils-zQ4FLDwK.js";import"./with-element-internals-CJt7fDtX.js";import"./popover-CBkkBxnw.js";import"./overlay-iu-_ABPF.js";import"./with-longpress-listener-D-W76F-r.js";import"./dismissible-stack-xq-0Rg1q.js";import"./toolbar-D4s_V7c3.js";import"./button-toggle-group-DM1kvl4T.js";import"./with-form-associated-gcPFdgdP.js";import"./with-label-aware-BP3asw-P.js";import"./button-toggle-group-constants-lDTvG_dF.js";import"./profile-link-B0UaHJag.js";import"./app-bar-menu-button-DVmUUxYf.js";import"./tooltip-u84XDAZH.js";import"./app-bar-profile-button-CK07oWjB.js";import"./badge-BfXwQdqa.js";import"./menu-BoRK6ol3.js";import"./list-dropdown-aware-core-DOTfNE_F.js";import"./list-dropdown-9b52ax4_.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-Du-Ntegu.js";import"./skeleton-ZvFpE85R.js";import"./a11y-BxM9_46k.js";import"./base-component-delegate-SNfm_5S4.js";import"./avatar-constants-CPJqEbLD.js";function r(o){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:p}),`
`,e.jsx(l,{}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"<forge-user-profile>"}),` component is a versatile solution adhering to the Forge design language for displaying user
authentication state within an application. When a user is signed in (has a `,e.jsx(t.code,{children:"full-name"}),` value), it displays an avatar
button that opens a popover containing the user's name, email, and sign out option. When no user is signed in, it displays
a sign-in button instead. It also has support for optional features like a theme toggle and custom link slots.`]}),`
`,e.jsx(i,{of:h}),`
`,e.jsx(t.h2,{id:"usage",children:"Usage"}),`
`,e.jsxs(t.p,{children:["It's important to note that the ",e.jsx(t.code,{children:"<forge-user-profile>"})," component is designed to be used within a ",e.jsx(t.code,{children:"<forge-app-bar>"}),`. This ensures that the user profile is
integrated seamlessly into the application's navigation structure. The component can be placed in the `,e.jsx(t.code,{children:"end"})," slot of the ",e.jsx(t.code,{children:"<forge-app-bar>"}),`, which is
typically reserved for user-related actions.`]}),`
`,e.jsx(t.h3,{id:"app-bar-theme-mode",children:"App Bar Theme Mode"}),`
`,e.jsxs(t.p,{children:["Due to the ",e.jsx(t.code,{children:"<forge-user-profile>"})," being comprised of multiple components, including the ",e.jsx(t.code,{children:"<forge-popover>"}),", you need to set the ",e.jsx(t.code,{children:'theme-mode="scoped"'}),` attribute
on the `,e.jsx(t.code,{children:"<forge-app-bar>"}),` to ensure that it inherits the correct design and the app bar's theme tokens do not cascade down into the user profile popover. If you
do not set this attribute, the user profile popover may not display correctly.`]}),`
`,e.jsxs(t.p,{children:["See the ",e.jsx(t.a,{href:"https://forge.tylerdev.io/main/?path=/docs/components-app-bar--docs#theme-mode",rel:"nofollow",children:"Forge App Bar documentation"})," for more details on the ",e.jsx(t.code,{children:"theme-mode"})," attribute."]}),`
`,e.jsx(t.h2,{id:"custom-links",children:"Custom Links"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"<forge-profile-link>"}),` component is a utility component for rendering accessible, visually consistent links within the
`,e.jsx(t.code,{children:"<forge-user-profile>"})," popover. This component is configured to render in the ",e.jsx(t.code,{children:"link"})," slot of the ",e.jsx(t.code,{children:"<forge-user-profile>"}),`. It
supports an optional icon and ensures links are part of a fully accessible list structure.`]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:"The optional profile link should appear last in the user profile link list to maintain a consistent design and user experience across all apps"}),`
`]}),`
`,e.jsx(i,{of:d}),`
`,e.jsx(t.h2,{id:"theme-toggle",children:"Theme Toggle"}),`
`,e.jsxs(t.p,{children:["You can also include a theme toggle within the user profile popover by specifying the ",e.jsx(t.code,{children:"theme-toggle"}),` attribute. This allows
users to switch between light and dark themes directly from their profile menu.`]}),`
`,e.jsxs(t.p,{children:["The theme toggle will set the ",e.jsx(t.code,{children:"data-forge-theme"})," attribute on the ",e.jsx(t.code,{children:"<html>"}),` element, which you can use CSS to target for styling
and the correct theme.`]}),`
`,e.jsx(t.h4,{id:"usage-example",children:"Usage example"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-css",children:`@use '@tylertech/forge/sass/theme/theme-dark';

html[data-forge-theme='dark'] {
  @include theme-dark.theme-properties;
}
`})}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(a,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Ensure you provide appropriate ",e.jsx(t.code,{children:"button-label"})," text for the ",e.jsx(t.code,{children:"aria-label"})," of the profile button if you need something other than the default."]}),`
`,e.jsxs(t.li,{children:["For internationalization, the ",e.jsx(t.code,{children:"theme-toggle-aria-label"})," attribute lets you translate the theme toggle group's ARIA label, and the ",e.jsx(t.code,{children:"theme-toggle-title"}),", ",e.jsx(t.code,{children:"theme-toggle-light-label"}),", ",e.jsx(t.code,{children:"theme-toggle-dark-label"}),", and ",e.jsx(t.code,{children:"theme-toggle-system-label"})," slots let you translate the theme toggle's title and option text."]}),`
`]})]})}function De(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(r,{...o})}):r(o)}export{De as default};
