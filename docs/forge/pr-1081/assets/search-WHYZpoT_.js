import{j as t,M as n,T as s,C as p}from"./blocks-BXWYo71c.js";import{useMDXComponents as o}from"./index-CdNTQBuI.js";import{C as m}from"./CustomArgTypes-B7Qt9hVL.js";import{S as a,D as c}from"./search.stories-BVkrA6E8.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-Co1TxWa1.js";import"./utils-3yMKERXj.js";import"./service-adapter-8tADcN_b.js";import"./app-bar-profile-button-m8l9D5Lo.js";import"./base-component-DXuuJMhq.js";import"./feature-detection-BkmzHgah.js";import"./base-adapter-Dwntuuli.js";import"./utils-DU-9AqTO.js";import"./state-layer-Dr4I3-ea.js";import"./focus-indicator-D-5vSThe.js";import"./base-lit-element-x5FuV5gp.js";import"./tyler-icons-BS8_pNWa.js";import"./index-DTwfV0k0.js";import"./icon-button-Bgrx9pzH.js";import"./base-button-core-DIzGNOqo.js";import"./with-label-aware-Bg6h2rtY.js";import"./with-default-aria-CXzIDxFk.js";import"./a11y-utils-DFScBSOY.js";import"./tooltip-DZbumLUT.js";import"./overlay-CnRxeVdV.js";import"./with-longpress-listener-D9AHvrpn.js";import"./dismissible-stack-xq-0Rg1q.js";import"./badge-CXuHYgqR.js";import"./menu-CkiVMedc.js";import"./list-BIFSuh1A.js";import"./event-utils-zQ4FLDwK.js";import"./list-dropdown-aware-core-CmUdXwzy.js";import"./list-dropdown-B-_zx1lG.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-Cnx_HyUf.js";import"./popover-C7v8d-bT.js";import"./skeleton-CMBvqwtz.js";import"./a11y-BxM9_46k.js";import"./base-component-delegate-B59UOAkV.js";import"./avatar-BoVD3kVh.js";import"./state-DBKKGjkN.js";import"./style-map-Dd40oAmE.js";import"./directive-jorct-Oe.js";import"./class-map-C2o-_jGF.js";import"./avatar-constants-CbiggS1X.js";import"./button-DHNtJFdN.js";import"./toolbar-DPBJiSu_.js";function e(r){const i={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...r.components};return t.jsxs(t.Fragment,{children:[t.jsx(n,{of:a}),`
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
`})})]})}function nt(r={}){const{wrapper:i}={...o(),...r.components};return i?t.jsx(i,{...r,children:t.jsx(e,{...r})}):e(r)}export{nt as default};
