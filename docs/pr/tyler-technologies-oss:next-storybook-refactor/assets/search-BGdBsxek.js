import{j as t}from"./jsx-runtime-BOvJLz_0.js";import{u as o}from"./index-VmyKRqPF.js";import{M as n,T as s,C as p}from"./index-tn7TsXFv.js";import{C as m}from"./CustomArgTypes-BCN6rZtz.js";import{S as a,D as c}from"./search.stories-CBDTw-iE.js";import"./iframe-CO0iLbnf.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./constants-utdBEkH-.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./app-bar-profile-button-B4ulTD1M.js";import"./utils-CpIAGiZD.js";import"./base-adapter-C3brPW0r.js";import"./state-layer-B9gKJ6mp.js";import"./focus-indicator-ClPLtnVB.js";import"./index-Dh0vMUMR.js";import"./index-B45drbLj.js";import"./icon-DkyhQ75n.js";import"./icon-button-2L8NC9Ut.js";import"./base-button-adapter-DdATc7HK.js";import"./with-label-aware-DCBgJY4W.js";import"./with-default-aria-BykxZfgK.js";import"./event-utils-CtHj37Lc.js";import"./tooltip-CG_CC_-2.js";import"./overlay-BNkU-pMi.js";import"./with-longpress-listener-SVh9IKk4.js";import"./dismissible-stack-CQalC8SW.js";import"./badge-D8NrfXrI.js";import"./menu-BES02Li2.js";import"./list-BXRL_hQq.js";import"./list-dropdown-aware-foundation-CS5nMN58.js";import"./list-dropdown-CORiYZkf.js";import"./linear-progress-CwAQpSXE.js";import"./popover-GzljRQiR.js";import"./skeleton-CHlR-Pcp.js";import"./event-utils-C1SDeUaq.js";import"./a11y-BxM9_46k.js";import"./profile-card-CENZGMtm.js";import"./base-component-delegate-CrAXDF6O.js";import"./button-C5RLDuN8.js";import"./avatar-BEHYkvnh.js";import"./toolbar-Bmd_at4S.js";function e(r){const i={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...r.components};return t.jsxs(t.Fragment,{children:[t.jsx(n,{of:a}),`
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
