import{j as t,M as n,T as s,C as p}from"./blocks-D0yBO_jN.js";import{useMDXComponents as o}from"./index-BdO0fnZl.js";import{C as a}from"./CustomArgTypes-CT0geJaP.js";import{S as m,D as c}from"./search.stories-CN1-mU0b.js";import"./iframe-Dk6FLRDb.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-QLgq-F6h.js";import"./feature-detection-uS6p5jc8.js";import"./app-bar-profile-button-DqvvmGNO.js";import"./constants-wOq9K3uV.js";import"./base-adapter-Mla2Q9YN.js";import"./utils-f75LITG3.js";import"./state-layer-CDmGOVud.js";import"./focus-indicator-13Sfphtk.js";import"./index-CiLSBptl.js";import"./icon-B8CdcxqJ.js";import"./icon-button-CvGVrMJL.js";import"./base-button-adapter-C_PsGoIF.js";import"./with-label-aware-D31hYnqk.js";import"./with-default-aria-CUUWGrPB.js";import"./a11y-utils-fzPGYZJ6.js";import"./tooltip-BZNSu0mZ.js";import"./overlay-Dg-i6Kxe.js";import"./with-longpress-listener-CGXzI-TM.js";import"./dismissible-stack-CrNbqK-n.js";import"./badge-CH-ibTj3.js";import"./base-lit-element-CrUUnKFH.js";import"./menu-COBLhr1H.js";import"./list-BoYqkH2U.js";import"./event-utils-zQ4FLDwK.js";import"./list-dropdown-aware-core-D4TDs8eC.js";import"./list-dropdown-dkmdW-J-.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-2PahUgVv.js";import"./popover-DCwSavHj.js";import"./skeleton-C4EH8VF8.js";import"./a11y-BxM9_46k.js";import"./base-component-delegate-CN_SSLUw.js";import"./avatar-USdFneRN.js";import"./state-BaWhT1Bd.js";import"./style-map-DxxfczF-.js";import"./directive-CJw_OlP2.js";import"./class-map-CFV1iACR.js";import"./avatar-constants-jPVIytDz.js";import"./button-BApUEgZW.js";import"./toolbar-Byb6kcao.js";function r(e){const i={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...e.components};return t.jsxs(t.Fragment,{children:[t.jsx(n,{of:m}),`
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
