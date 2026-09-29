import{u as n,j as e,M as s,T as l,C as i}from"./blocks-tvw2vM3h.js";import{C as p}from"./CustomArgTypes-D4CsSNDm.js";import{U as a,D as h}from"./UserProfile.stories-Cs3gLe_X.js";import{Demo as m}from"./ProfileLink.stories-Bx884ge5.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C0BfX2rm.js";import"./iframe-B0EMVDc7.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-Dx9-RsVp.js";import"./ref-D9oVd9KH.js";import"./async-directive-DY_iDrSO.js";import"./directive-CwRn8Fwj.js";import"./service-adapter-8tADcN_b.js";import"./icon-C1AADWlB.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./property-Bg0HUyok.js";import"./base-lit-element-BLHt8MxB.js";import"./constants-Bm8g2CKk.js";import"./feature-detection-xOGaFvRv.js";import"./platform-C5RrLkNt.js";import"./tyler-icons-BSgf1RSL.js";import"./state-C62Xd8qj.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./base-DVmwUFg0.js";import"./when-CI7b_ccM.js";import"./utils-C31il88P.js";import"./avatar-AChA-iGf.js";import"./style-map-CS61OTdp.js";import"./class-map-DYRXDsjk.js";import"./button-RIwWqmi5.js";import"./focus-indicator-fOfraOtv.js";import"./floating-ui.dom-DaMtbvS2.js";import"./state-layer-CZIH5add.js";import"./custom-element-DR9AFpIK.js";import"./core-property-Co8uF8PW.js";import"./base-adapter-DOky_or5.js";import"./dom-utils-BDbRr6KM.js";import"./base-component-BFu9bkgC.js";import"./base-button-BXSgky_c.js";import"./query-CtiAP21w.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-DssnAab5.js";import"./button-constants-B9P9oolT.js";import"./divider-tMnvnZGL.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./icon-button-Cfus7nrp.js";import"./icon-button-constants-DWfjKRvV.js";import"./list-B3Ua5Jq9.js";import"./list-item-CqtgjLMz.js";import"./event-utils-zQ4FLDwK.js";import"./with-element-internals-DsIdl_YT.js";import"./popover-Dj3mHcTQ.js";import"./overlay-BiMQPje5.js";import"./with-longpress-listener-C31eKfZf.js";import"./dismissible-stack-DyoP5jNB.js";import"./toolbar-D8HmtTbd.js";import"./button-toggle-group-DzAS1uKv.js";import"./with-form-associated-Cqxswp4Q.js";import"./with-label-aware-CQV8oFwb.js";import"./button-toggle-group-constants-CgEdCLCn.js";import"./profile-link-jL9II48b.js";import"./app-bar-menu-button-Bz0TYTpE.js";import"./tooltip-DvlG9nEu.js";import"./app-bar-profile-button-DqfWQLzf.js";import"./badge-CN80SK-J.js";import"./menu-DW_0Y_u0.js";import"./list-dropdown-aware-core-Cr1bAbW5.js";import"./list-dropdown-BuZ2QtYT.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-kQO48laS.js";import"./skeleton-O3NFwJYz.js";import"./a11y-BxM9_46k.js";import"./scroll-axis-observer-DmuibK9q.js";import"./base-component-delegate-DxZGdeuy.js";import"./avatar-constants-DInUhkSW.js";function r(o){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:a}),`
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
`,e.jsx(i,{of:m}),`
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
`,e.jsx(p,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Ensure you provide appropriate ",e.jsx(t.code,{children:"button-label"})," text for the ",e.jsx(t.code,{children:"aria-label"})," of the profile button if you need something other than the default."]}),`
`,e.jsxs(t.li,{children:["For internationalization, the ",e.jsx(t.code,{children:"theme-toggle-aria-label"})," attribute lets you translate the theme toggle group's ARIA label, and the ",e.jsx(t.code,{children:"theme-toggle-title"}),", ",e.jsx(t.code,{children:"theme-toggle-light-label"}),", ",e.jsx(t.code,{children:"theme-toggle-dark-label"}),", and ",e.jsx(t.code,{children:"theme-toggle-system-label"})," slots let you translate the theme toggle's title and option text."]}),`
`]})]})}function Be(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(r,{...o})}):r(o)}export{Be as default};
