import{j as o}from"./jsx-runtime-CIDS17Lz.js";import{u as r}from"./index-XnNFEWqg.js";import{M as n,T as s,C as p}from"./index-CHDytJy_.js";import{C as a}from"./CustomArgTypes-naOYJSii.js";import{P as c,D as l}from"./profile.stories-CNqPBeoW.js";import"./iframe-C2kVjTe1.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./constants-DkgXXQx1.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./app-bar-profile-button-C1DU4rqg.js";import"./utils-_KxxXSob.js";import"./base-adapter-DSbpjb7l.js";import"./state-layer-7qJ5R4VP.js";import"./focus-indicator-DTINiDuB.js";import"./index-Dh0vMUMR.js";import"./index-BQvjHxN7.js";import"./icon-Do9Lnej2.js";import"./icon-button-Fp-cO_au.js";import"./base-button-adapter-BEKanhRV.js";import"./with-label-aware-DCBgJY4W.js";import"./with-default-aria-Dq3UI5X-.js";import"./event-utils-CtHj37Lc.js";import"./tooltip-ZKBRFBk0.js";import"./overlay-BlhSGkVC.js";import"./with-longpress-listener-DwVL1PXJ.js";import"./dismissible-stack-CQalC8SW.js";import"./badge-Bxpe7JNX.js";import"./menu-BGRaNrCg.js";import"./list-DJmAnjOr.js";import"./list-dropdown-aware-foundation-D-Pd_bsv.js";import"./list-dropdown-CsAE6-7k.js";import"./linear-progress-Cn1rBesR.js";import"./popover-D2XbXE-O.js";import"./skeleton-DEm5v8sx.js";import"./event-utils-C1SDeUaq.js";import"./a11y-BxM9_46k.js";import"./profile-card-BcR_0-r-.js";import"./base-component-delegate-4aD05eYb.js";import"./button-CTvyFi3f.js";import"./avatar-CKH0Yq4-.js";import"./toolbar-0p48nZa7.js";function i(e){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...e.components};return o.jsxs(o.Fragment,{children:[o.jsx(n,{of:c}),`
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
