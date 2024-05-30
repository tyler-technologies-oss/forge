import{j as t}from"./jsx-runtime-wN_zvnPi.js";import{u as o}from"./index-Ge2tiL5T.js";import{M as n,T as s,C as p}from"./index-DbiNQr04.js";import{C as m}from"./CustomArgTypes-DAvAKVw6.js";import{S as a,D as c}from"./search.stories-F4AvBu6V.js";import"./iframe--89dfugK.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./constants-CNtkYrkV.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./app-bar-profile-button-DmuElNc_.js";import"./utils-_KxxXSob.js";import"./base-adapter-BJgF1p4o.js";import"./state-layer-gTNLav97.js";import"./focus-indicator-BD-QeFjT.js";import"./index-Dh0vMUMR.js";import"./index-mTd1prAy.js";import"./icon-C851-S2l.js";import"./icon-button-BRsbqzDA.js";import"./base-button-adapter-CWgfA8U7.js";import"./with-label-aware-DCBgJY4W.js";import"./with-default-aria-K6id_NgY.js";import"./event-utils-CtHj37Lc.js";import"./tooltip-CSCQqVjK.js";import"./overlay-D0kkXLZI.js";import"./with-longpress-listener-BFfBYlI6.js";import"./dismissible-stack-CQalC8SW.js";import"./badge-BpQ-SyVn.js";import"./menu--gJ1C3SL.js";import"./list-D_WXTyQP.js";import"./list-dropdown-aware-foundation-CeUxD51o.js";import"./list-dropdown-cmB_OBg5.js";import"./linear-progress-DRCvJJ9n.js";import"./popover-CbSF4Yio.js";import"./skeleton-bjM0HcEL.js";import"./event-utils-C1SDeUaq.js";import"./a11y-BxM9_46k.js";import"./profile-card-DBS-Z0Md.js";import"./base-component-delegate-B7j5apUr.js";import"./button-CYUl4S3a.js";import"./avatar-DlDudkaV.js";import"./toolbar-Km2p0gV7.js";function e(r){const i={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...r.components};return t.jsxs(t.Fragment,{children:[t.jsx(n,{of:a}),`
`,t.jsx(s,{}),`
`,t.jsxs(i.p,{children:["The app-bar search component is essentially just a strictly-styled ",t.jsx(i.code,{children:"<input>"})," element that fits in with the app-bar ecosystem. It provides some additional functionality through its public API, but at the very least it gives a common component to use for a familiar search experience for users."]}),`
`,t.jsx(i.h2,{id:"default",children:"Default"}),`
`,t.jsx(p,{of:c}),`
`,t.jsx(i.h2,{id:"api",children:"API"}),`
`,t.jsx(m,{}),`
`,t.jsx(i.h2,{id:"accessibility",children:"Accessibility"}),`
`,t.jsxs(i.ul,{children:[`
`,t.jsxs(i.li,{children:["Ensure that you provide a placeholder attribute for the ",t.jsx(i.code,{children:"<input>"})," element to help give users an idea of what to enter."]}),`
`,t.jsxs(i.li,{children:["Ensure that you add an aria-label or aria-labelledby attribute to the ",t.jsx(i.code,{children:"<input>"}),"."]}),`
`,t.jsx(i.li,{children:"If using a custom theme, make sure proper color contrast ratios are met and adjust using CSS custom properties if not."}),`
`]}),`
`,t.jsx(i.h2,{id:"types",children:"Types"}),`
`,t.jsx(i.pre,{children:t.jsx(i.code,{className:"language-typescript",children:`interface IAppBarSearchEventData {
  value: string;
  combined: boolean;
  context: string;
}
`})})]})}function ot(r={}){const{wrapper:i}={...o(),...r.components};return i?t.jsx(i,{...r,children:t.jsx(e,{...r})}):e(r)}export{ot as default};
