import{j as t}from"./jsx-runtime-Coidl84b.js";import{u as o}from"./index-DkyOzAO8.js";import{M as n,T as s,C as p}from"./index-ufspvSt1.js";import{C as m}from"./CustomArgTypes-DAhkhEPm.js";import{S as a,D as c}from"./search.stories-Cm9wbPGr.js";import"./iframe-Dg8A6HNo.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./constants-D0Eltsy8.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./app-bar-profile-button-aUjPhQEZ.js";import"./utils-_KxxXSob.js";import"./base-adapter-BFL5IvdM.js";import"./state-layer-B1BJyO_z.js";import"./focus-indicator-D_TCP8aG.js";import"./index-Dh0vMUMR.js";import"./index-CsmkSriH.js";import"./icon-C1xqk65D.js";import"./icon-button-CMwP1Xva.js";import"./base-button-adapter-CWToXsz_.js";import"./with-label-aware-DCBgJY4W.js";import"./with-default-aria-D0CH3Z-A.js";import"./event-utils-CtHj37Lc.js";import"./tooltip-DQJHF6_l.js";import"./overlay-ax6hnCXS.js";import"./with-longpress-listener-Mqf1j00n.js";import"./dismissible-stack-CQalC8SW.js";import"./badge-udvwCbMS.js";import"./menu-CnOLap_o.js";import"./list-CqyEZ-EU.js";import"./list-dropdown-aware-foundation-0teUe1CU.js";import"./list-dropdown-C-DZmzwa.js";import"./linear-progress-ePNFw6tT.js";import"./popover-D-4moE3V.js";import"./skeleton-CqMXvMAT.js";import"./event-utils-C1SDeUaq.js";import"./a11y-BxM9_46k.js";import"./profile-card-CgtgNL_j.js";import"./base-component-delegate-DDOpIrp4.js";import"./button-ByIHzhvH.js";import"./avatar-CVnPlMlp.js";import"./toolbar-Cz7zrRgp.js";function e(r){const i={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...r.components};return t.jsxs(t.Fragment,{children:[t.jsx(n,{of:a}),`
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
