import{j as o}from"./jsx-runtime-BlO1yEbl.js";import{u as r}from"./index-oXNxZfwp.js";import{M as n,T as s,C as p}from"./index-D0kal_yR.js";import{C as a}from"./CustomArgTypes-DsvzYRFk.js";import{P as c,D as l}from"./profile.stories-CTEXs1Rr.js";import"./iframe-D_fu1-5e.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./constants-BgIM8F0f.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./app-bar-profile-button-C7iCDDsR.js";import"./utils-_KxxXSob.js";import"./base-adapter-SXBf8G7i.js";import"./state-layer-CBmzZqaJ.js";import"./focus-indicator-C_lKmSqu.js";import"./index-Dh0vMUMR.js";import"./index-Dd7dh6lc.js";import"./icon-BeUfDKoD.js";import"./icon-button-D9id-_I0.js";import"./base-button-adapter-s_f0WoSK.js";import"./with-label-aware-DCBgJY4W.js";import"./with-default-aria-DmWAJO4f.js";import"./event-utils-gODbtzKd.js";import"./tooltip-DiLx0IwJ.js";import"./overlay-E2ymM26e.js";import"./with-longpress-listener-D-kZV8Qz.js";import"./dismissible-stack-DXt6aUkq.js";import"./badge-Dh2F6wRa.js";import"./menu-CBxA6aQ6.js";import"./list-CyCfJIwy.js";import"./list-dropdown-aware-foundation-qQW4zG1y.js";import"./list-dropdown-D0eqJNz-.js";import"./linear-progress-C3rEPYpB.js";import"./popover-D2f38-Ts.js";import"./skeleton-CKpu8BXV.js";import"./event-utils-C1SDeUaq.js";import"./a11y-BxM9_46k.js";import"./profile-card-BClQoAru.js";import"./base-component-delegate-DZc7zGaV.js";import"./button-DE0ruwpr.js";import"./avatar-DCtRWeBo.js";import"./toolbar-C_Bh1MjW.js";function i(e){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...e.components};return o.jsxs(o.Fragment,{children:[o.jsx(n,{of:c}),`
`,o.jsx(s,{}),`
`,o.jsxs(t.p,{children:["For convenience Forge provides the ",o.jsx(t.code,{children:"<forge-app-bar-profile-button>"})," component. This component uses an icon-button (with a predefined avatar), and is responsible for displaying profile information within a popup. The power of this component is that it will ensure a consistent experience for users across all applications that consume it."]}),`
`,o.jsxs(t.p,{children:["If necessary, you can use the ",o.jsx(t.code,{children:"profileCardBuilder"})," API to provide custom content within the profile card popup."]}),`
`,o.jsxs(t.blockquote,{children:[`
`,o.jsx(t.p,{children:"It is expected that you place this component in the end slot of the app-bar for consistency and familiarity for users."}),`
`]}),`
`,o.jsx(t.h2,{id:"common",children:"Common"}),`
`,o.jsx(t.p,{children:"A common usage of the profile button will require you to provide some basic information about the user so that it can properly display the data in a familiar location for users. This information needs to be available prior to the user opening the popup."}),`
`,o.jsx(p,{of:l}),`
`,o.jsx(t.h2,{id:"custom-content",children:"Custom content"}),`
`,o.jsx(t.p,{children:"The profile card allows for custom content to be placed within its template. This is provided in the form of a callback that you can use to generate DOM that the component will render for you. You will need to use JavaScript to accomplish this."}),`
`,o.jsx(t.p,{children:"The following snippet demonstrates basic usage in vanilla JavaScript. You could alternatively dynamically created an Angular component for instance and return a reference to its host element to render within the profile card. Don't forget to clean up the element to avoid memory leaks in this scenario."}),`
`,o.jsx(t.pre,{children:o.jsx(t.code,{className:"language-typescript",children:`profileButton.profileCardBuilder = () => {
  const list = document.createElement('forge-list');
  // ...
  return list;
};
`})}),`
`,o.jsx(t.h2,{id:"api",children:"API"}),`
`,o.jsx(a,{}),`
`,o.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,o.jsxs(t.ul,{children:[`
`,o.jsx(t.li,{children:"The component will handle adding necessary ARIA attributes for you, as well as ensure the proper color contrast ratio is used."}),`
`]})]})}function ro(e={}){const{wrapper:t}={...r(),...e.components};return t?o.jsx(t,{...e,children:o.jsx(i,{...e})}):i(e)}export{ro as default};
