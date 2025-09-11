import{j as t,M as n,T as s,C as p}from"./blocks-CDy2Rd0a.js";import{useMDXComponents as o}from"./index-DsX0JzE-.js";import{C as a}from"./CustomArgTypes-BL6_z2E7.js";import{S as m,D as c}from"./search.stories-Bh8djC85.js";import"./iframe-BwqQa4Dw.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-CtrDDikH.js";import"./feature-detection-uS6p5jc8.js";import"./app-bar-profile-button-Mf76XeBV.js";import"./constants-wOq9K3uV.js";import"./base-adapter-Mla2Q9YN.js";import"./utils-BtvMddIW.js";import"./state-layer-C7sW6v-0.js";import"./focus-indicator-BeibAi2h.js";import"./index-CiLSBptl.js";import"./icon-B8CdcxqJ.js";import"./icon-button-C-UNXlAt.js";import"./base-button-adapter-DUGDd8bj.js";import"./with-label-aware-D31hYnqk.js";import"./with-default-aria-CUUWGrPB.js";import"./a11y-utils-fzPGYZJ6.js";import"./tooltip-Chj_0PH7.js";import"./overlay-CewVvJzX.js";import"./with-longpress-listener-CGXzI-TM.js";import"./dismissible-stack-D-1uOlnz.js";import"./badge-BfziV-KQ.js";import"./base-lit-element-CiQZepT_.js";import"./menu-KOOvy-C_.js";import"./list-CkPu5vu3.js";import"./event-utils-zQ4FLDwK.js";import"./list-dropdown-aware-core-CAkL4nsK.js";import"./list-dropdown-DIklKypy.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-2PahUgVv.js";import"./popover-CjB4Fwlr.js";import"./skeleton-C4EH8VF8.js";import"./a11y-BxM9_46k.js";import"./base-component-delegate-CN_SSLUw.js";import"./avatar-BTa5tMHP.js";import"./state-vt8wRCx8.js";import"./style-map-Do58X9PR.js";import"./directive-CJw_OlP2.js";import"./class-map-D8zP2MeT.js";import"./avatar-constants-jPVIytDz.js";import"./button-DEhPRUdY.js";import"./toolbar-Byb6kcao.js";function r(e){const i={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...e.components};return t.jsxs(t.Fragment,{children:[t.jsx(n,{of:m}),`
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
