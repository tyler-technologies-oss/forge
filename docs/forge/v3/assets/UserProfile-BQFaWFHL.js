import{u as n,j as e,M as s,T as l,C as i}from"./blocks-lzQ4jgIO.js";import{C as a}from"./CustomArgTypes-iwKdrQ1x.js";import{U as p,D as h}from"./UserProfile.stories-C-cyyt4-.js";import{Demo as d}from"./ProfileLink.stories-D98f-DOX.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Cv18HVO7.js";import"./iframe-Y92HmdHZ.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-DbbJplVM.js";import"./ref-C9xd_Bhv.js";import"./base-lit-element-DXQv51bq.js";import"./directive-CwRn8Fwj.js";import"./service-adapter-8tADcN_b.js";import"./tyler-icons-SWWw4qdQ.js";import"./utils-DKysp6Us.js";import"./property-4XXebId8.js";import"./constants-D9XaGcQ2.js";import"./feature-detection-3Hxzrcpn.js";import"./state-DNIjxkMA.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./base-DVmwUFg0.js";import"./when-CI7b_ccM.js";import"./utils-DU-9AqTO.js";import"./avatar-B8eTfiem.js";import"./style-map-CPyruTRu.js";import"./class-map-COdHIAbq.js";import"./button-BUQjmV8l.js";import"./base-component-eLLEz2pp.js";import"./base-adapter-BCJU7eTd.js";import"./dom-utils-DyV3Musz.js";import"./focus-indicator-CypHdldK.js";import"./state-layer-C4o8tMgM.js";import"./base-button-core-Cs7r2nBO.js";import"./with-label-aware-v-rvTgpX.js";import"./with-default-aria-DvCryB8T.js";import"./a11y-utils-BNxJc0Sy.js";import"./button-constants-1yoxvAmM.js";import"./divider-DHqIzZ4F.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./icon-button-BG-KzVAg.js";import"./icon-button-constants-DmTas6I8.js";import"./list-CSKmw5w_.js";import"./list-item-DkeO-h5u.js";import"./event-utils-zQ4FLDwK.js";import"./popover-CqxRAdRj.js";import"./overlay-OLurZXLD.js";import"./with-longpress-listener-DnatLNR5.js";import"./dismissible-stack-xq-0Rg1q.js";import"./toolbar-xc73DdA4.js";import"./button-toggle-group-CrMPg9cW.js";import"./with-form-associated-CcTSvA75.js";import"./button-toggle-group-constants-BCLq5she.js";import"./profile-link-D2ebXapw.js";import"./app-bar-menu-button-3fshlFiS.js";import"./tooltip-DMlClJRm.js";import"./app-bar-profile-button-WsP3_rm8.js";import"./badge-DIdXzCuH.js";import"./menu-Croe9Yxl.js";import"./list-dropdown-aware-core-CszZsAoE.js";import"./list-dropdown-DQLvmGJC.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-Dj7Wb6Io.js";import"./skeleton-FcTi7X6q.js";import"./a11y-BxM9_46k.js";import"./base-component-delegate-C4a4DvD8.js";import"./avatar-constants-DxjrDML2.js";function r(o){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:p}),`
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
`]})]})}function Ce(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(r,{...o})}):r(o)}export{Ce as default};
