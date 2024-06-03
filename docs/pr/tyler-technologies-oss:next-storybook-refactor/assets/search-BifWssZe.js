import{j as t}from"./jsx-runtime-BOJhCJTd.js";import{u as o}from"./index-CVTJi5mz.js";import{M as n,T as s,C as p}from"./index-DEDoQcPO.js";import{C as m}from"./CustomArgTypes-Dee0GmgN.js";import{S as a,D as c}from"./search.stories-DTPbN_qs.js";import"./iframe-a_EiTiX7.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./constants-DbwyRGxi.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./app-bar-profile-button-DXGFutq8.js";import"./utils-DPkqGCj4.js";import"./base-adapter-CpHyUcoj.js";import"./state-layer-BEljX9QG.js";import"./focus-indicator-CzUu7vMj.js";import"./index-Dh0vMUMR.js";import"./index-BAkJIYVL.js";import"./icon-PWjbsU_w.js";import"./icon-button-IV8Ys-9G.js";import"./base-button-adapter-DkqBZysE.js";import"./with-label-aware-DCBgJY4W.js";import"./with-default-aria-LA9JlIjH.js";import"./event-utils-DC3JW7a-.js";import"./tooltip-uy8owTjf.js";import"./overlay-BNZZCk6W.js";import"./with-longpress-listener-DLKSQ7YL.js";import"./dismissible-stack-BU50KYzw.js";import"./badge-BV6jERNR.js";import"./menu-C_5A7Ocp.js";import"./list-CwmAiJZy.js";import"./list-dropdown-aware-foundation-DotE6ZyI.js";import"./list-dropdown-BXmXYNvt.js";import"./linear-progress-qSMjJX85.js";import"./popover-thhY82cB.js";import"./skeleton-BaWz5QuB.js";import"./event-utils-C1SDeUaq.js";import"./a11y-BxM9_46k.js";import"./profile-card-Ds382xfD.js";import"./base-component-delegate-CG107vdF.js";import"./button-BTwpuWYj.js";import"./avatar-DSHObdjp.js";import"./toolbar--95SLEJa.js";function e(r){const i={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...r.components};return t.jsxs(t.Fragment,{children:[t.jsx(n,{of:a}),`
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
