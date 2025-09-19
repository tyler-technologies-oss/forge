import{j as t,M as n,T as s,C as p}from"./blocks-BdPlUP4l.js";import{useMDXComponents as o}from"./index-76bUsT8O.js";import{C as m}from"./CustomArgTypes-BeFASvga.js";import{S as a,D as c}from"./search.stories-CgzoRdmQ.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-CIxyDGlH.js";import"./utils-D7XrLKwY.js";import"./feature-detection-BwPJgXni.js";import"./app-bar-profile-button-BTlIetk6.js";import"./constants-y3-o2nLB.js";import"./base-adapter-BB1UtCX3.js";import"./utils-BtvMddIW.js";import"./state-layer-CLjAHnoF.js";import"./focus-indicator-B9KMEBVK.js";import"./index-5CPwzmQS.js";import"./icon-FzRol6Tl.js";import"./icon-button-DpLi6_yQ.js";import"./base-button-adapter-tGikGtMQ.js";import"./with-label-aware-DXzk0r0A.js";import"./with-default-aria-BtzFnMjW.js";import"./a11y-utils-Dbhjrk0x.js";import"./tooltip-DcL6iv1E.js";import"./overlay-B72xXWi5.js";import"./with-longpress-listener-BTdNjnT1.js";import"./dismissible-stack-CF8GDA4v.js";import"./badge-BGfScRw0.js";import"./base-lit-element-D1J5MEda.js";import"./menu-CioYiqb-.js";import"./list-ucSdTmS4.js";import"./event-utils-zQ4FLDwK.js";import"./list-dropdown-aware-core-C9m0o2b5.js";import"./list-dropdown-D1aTe_lv.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-CfBpjTvZ.js";import"./popover-CCIxKg31.js";import"./skeleton-1JRnRe4N.js";import"./a11y-BxM9_46k.js";import"./base-component-delegate-BRyrclvv.js";import"./avatar-DafqDS7r.js";import"./state-CLrreyiu.js";import"./style-map-l48G0zrc.js";import"./directive-CJw_OlP2.js";import"./class-map-DSbjH6Po.js";import"./avatar-constants-CDm3i50P.js";import"./button-Bjtey6FZ.js";import"./toolbar-BtzJRWgQ.js";function r(e){const i={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...e.components};return t.jsxs(t.Fragment,{children:[t.jsx(n,{of:a}),`
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
`})})]})}function ot(e={}){const{wrapper:i}={...o(),...e.components};return i?t.jsx(i,{...e,children:t.jsx(r,{...e})}):r(e)}export{ot as default};
