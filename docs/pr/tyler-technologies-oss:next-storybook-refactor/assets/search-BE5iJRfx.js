import{j as t}from"./jsx-runtime-DWi523fH.js";import{u as o}from"./index-DqNwXLuf.js";import{M as n,T as s,C as p}from"./index-JxdpOhD6.js";import{C as m}from"./CustomArgTypes-3dE7C74G.js";import{S as a,D as c}from"./search.stories-BYaOgbFP.js";import"./iframe-CVuE5vpn.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./constants-Ds_Uvk97.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./app-bar-profile-button-Bq7JFjwq.js";import"./utils-_KxxXSob.js";import"./base-adapter-BevgLcPl.js";import"./state-layer-CvtwhWgg.js";import"./focus-indicator-f9GJik4v.js";import"./index-Dh0vMUMR.js";import"./index-CsmkSriH.js";import"./icon-DvTdPf-7.js";import"./icon-button-DFQDfzrF.js";import"./base-button-adapter-BBPlSPGT.js";import"./with-label-aware-DCBgJY4W.js";import"./with-default-aria-ClHkbshF.js";import"./event-utils-CtHj37Lc.js";import"./tooltip-QHNUkaAT.js";import"./overlay-g_05lOO3.js";import"./with-longpress-listener-Yj0BFMDC.js";import"./dismissible-stack-CQalC8SW.js";import"./badge-CSQCqRAB.js";import"./menu-Bs1zoqte.js";import"./list-Be5g02yk.js";import"./list-dropdown-aware-foundation-C35snnQL.js";import"./list-dropdown-DD7VkA4T.js";import"./linear-progress-DGhI_5Y4.js";import"./popover-DwRi4sRl.js";import"./skeleton-CF4b4P3Z.js";import"./event-utils-C1SDeUaq.js";import"./a11y-BxM9_46k.js";import"./profile-card-BDMsCpip.js";import"./base-component-delegate-DHByprzQ.js";import"./button-DW0aIXKQ.js";import"./avatar-Bw8Vik2s.js";import"./toolbar-CIHufYA6.js";function e(r){const i={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...r.components};return t.jsxs(t.Fragment,{children:[t.jsx(n,{of:a}),`
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
