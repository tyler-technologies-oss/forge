import{j as t,M as n,T as s,C as p}from"./blocks-jBeb--Zy.js";import{useMDXComponents as o}from"./index-BiIhZB5g.js";import{C as m}from"./CustomArgTypes-B68Lw4E-.js";import{S as a,D as c}from"./search.stories-BYhCiicf.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-C2OLFiEs.js";import"./utils-Cqbxq2Mi.js";import"./service-adapter-CffG5Lhq.js";import"./app-bar-profile-button-D2EyAWwI.js";import"./constants-DzQy6WDX.js";import"./feature-detection-B-sRDmdg.js";import"./base-adapter-C8aSF3nG.js";import"./utils-Bd6MGx91.js";import"./state-layer-gAgMwMHF.js";import"./focus-indicator-BfYyibdg.js";import"./base-lit-element-C9ug6T_L.js";import"./icon-kuXwuZAY.js";import"./index-5CPwzmQS.js";import"./icon-button-uist0Hlh.js";import"./base-button-adapter-CdR3VJ_u.js";import"./with-label-aware-C7up74QW.js";import"./with-default-aria-6GN_uk1I.js";import"./a11y-utils-Dj08p-2z.js";import"./tooltip-B59ljHGY.js";import"./overlay-B5pGv-rV.js";import"./with-longpress-listener-DtGZwA0v.js";import"./dismissible-stack-TpzCxM2R.js";import"./badge-DJtJFno-.js";import"./menu-BcLDX--W.js";import"./list-CH_KZLvh.js";import"./event-utils-zQ4FLDwK.js";import"./list-dropdown-aware-core-DCGuUvqO.js";import"./list-dropdown-DY8DEKL-.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-r0Hzg69v.js";import"./popover-BWVazmya.js";import"./skeleton-BSiuL_ME.js";import"./a11y-BxM9_46k.js";import"./base-component-delegate-Dh4VElUy.js";import"./avatar-C3ZLWfRG.js";import"./state-B-PYvksA.js";import"./style-map-B0Mvy1fp.js";import"./directive-CJw_OlP2.js";import"./class-map-iWrBTVHa.js";import"./avatar-constants-B5Xsdbpi.js";import"./button-DYznlHEp.js";import"./toolbar-U0axkpKl.js";function e(r){const i={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...r.components};return t.jsxs(t.Fragment,{children:[t.jsx(n,{of:a}),`
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
