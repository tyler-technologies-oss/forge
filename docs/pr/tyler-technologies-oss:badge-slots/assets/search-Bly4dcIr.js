import{j as t,M as n,T as s,C as p}from"./blocks-t_XZofO9.js";import{useMDXComponents as o}from"./index-DitRxeht.js";import{C as a}from"./CustomArgTypes-BsSzo3OB.js";import{S as m,D as c}from"./search.stories-usUkABr2.js";import"./iframe-Cb3H7on6.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-C--SryQs.js";import"./feature-detection-uS6p5jc8.js";import"./app-bar-profile-button-Y2ffrCrh.js";import"./constants-wOq9K3uV.js";import"./base-adapter-Mla2Q9YN.js";import"./utils-CRxrUqQD.js";import"./state-layer-BFwsAUDA.js";import"./focus-indicator-IWpzSXYP.js";import"./index-CiLSBptl.js";import"./icon-B8CdcxqJ.js";import"./icon-button-DkluvO-9.js";import"./base-button-adapter-D0zqnDMQ.js";import"./with-label-aware-D31hYnqk.js";import"./with-default-aria-CUUWGrPB.js";import"./a11y-utils-fzPGYZJ6.js";import"./tooltip-CEqNszOk.js";import"./overlay-rvLcgp1q.js";import"./with-longpress-listener-CGXzI-TM.js";import"./dismissible-stack-BdWcv7_4.js";import"./badge-BwEF0b8H.js";import"./base-lit-element-CMCCwOtB.js";import"./menu-CEgQL4Wc.js";import"./list-CWXU2VGN.js";import"./event-utils-zQ4FLDwK.js";import"./list-dropdown-aware-core-Dst7jNjG.js";import"./list-dropdown-BrTSoZbg.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-2PahUgVv.js";import"./popover-CkPGSxIK.js";import"./skeleton-C4EH8VF8.js";import"./a11y-BxM9_46k.js";import"./base-component-delegate-CN_SSLUw.js";import"./avatar-D17LLjCx.js";import"./state-Bbr8sOKe.js";import"./style-map-CxqmoKd_.js";import"./directive-CJw_OlP2.js";import"./class-map-DouuGvrt.js";import"./avatar-constants-jPVIytDz.js";import"./button-r2EMLpWm.js";import"./toolbar-Byb6kcao.js";function r(e){const i={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...e.components};return t.jsxs(t.Fragment,{children:[t.jsx(n,{of:m}),`
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
