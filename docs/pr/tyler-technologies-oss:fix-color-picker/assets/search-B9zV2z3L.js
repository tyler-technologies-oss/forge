import{j as t,M as n,T as s,C as p}from"./blocks-D4abAfNx.js";import{useMDXComponents as o}from"./index-CwqZMi5K.js";import{C as a}from"./CustomArgTypes-DAqDRBOk.js";import{S as m,D as c}from"./search.stories-17tFxiP0.js";import"./iframe-D16yKRLu.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-CwQ2mEzo.js";import"./feature-detection-CY6TVbRZ.js";import"./app-bar-profile-button-CuaEKUU3.js";import"./constants-NErMj_Tj.js";import"./base-adapter-Ch0oiIsw.js";import"./utils-CRxrUqQD.js";import"./state-layer-BVsNuAhs.js";import"./focus-indicator-Cgfkaa3d.js";import"./index-CiLSBptl.js";import"./icon-Bh1zyXYd.js";import"./icon-button-CuEKyh48.js";import"./base-button-adapter-BF7s-Uk_.js";import"./with-label-aware-DkCFYjRm.js";import"./with-default-aria-srFr2cNz.js";import"./a11y-utils-DGb1vALN.js";import"./tooltip-DJb4FXvJ.js";import"./overlay-CmLQVoKV.js";import"./with-longpress-listener-BDlFima-.js";import"./dismissible-stack-BdWcv7_4.js";import"./badge-BALYpLQK.js";import"./base-lit-element-DItpSEO6.js";import"./menu-Csi4eOUZ.js";import"./list-DCzhHkfW.js";import"./event-utils-zQ4FLDwK.js";import"./list-dropdown-aware-core-DOOobZVK.js";import"./list-dropdown-C4pyqmXN.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-CJb_8skk.js";import"./popover-BUd5kSDj.js";import"./skeleton-DocRecw2.js";import"./a11y-BxM9_46k.js";import"./base-component-delegate-Dz-DoLri.js";import"./avatar-TZLbZmVs.js";import"./state-Dria-bEE.js";import"./style-map-CoFm7nfi.js";import"./directive-CJw_OlP2.js";import"./class-map-BqoNRxRI.js";import"./avatar-constants-ChSkI4j1.js";import"./button-CLmfPElC.js";import"./toolbar-CJj-iw1_.js";function r(e){const i={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...e.components};return t.jsxs(t.Fragment,{children:[t.jsx(n,{of:m}),`
`,t.jsx(s,{}),`
`,t.jsxs(i.p,{children:["The app-bar search component is essentially just a strictly-styled ",t.jsx(i.code,{children:"<input>"})," element that fits in with the app-bar ecosystem. It provides some additional functionality through its public API, but at the very least it gives a common component to use for a familiar search experience for users."]}),`
`,t.jsx(i.h2,{id:"default",children:"Default"}),`
`,t.jsx(p,{of:c}),`
`,t.jsx(i.h2,{id:"api",children:"API"}),`
`,t.jsx(a,{}),`
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
`})})]})}function rt(e={}){const{wrapper:i}={...o(),...e.components};return i?t.jsx(i,{...e,children:t.jsx(r,{...e})}):r(e)}export{rt as default};
