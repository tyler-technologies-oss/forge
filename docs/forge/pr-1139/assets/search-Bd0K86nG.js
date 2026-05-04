import{u as o,j as t,M as n,T as s,C as p}from"./blocks-_L7f51W9.js";import{C as m}from"./CustomArgTypes-D7UPm1fh.js";import{S as a,D as c}from"./search.stories-BOH_3Li3.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BYO1bXoJ.js";import"./utils-CJ7ikJXH.js";import"./service-adapter-8tADcN_b.js";import"./app-bar-profile-button-C3sUBGjO.js";import"./class-map-PpCHXYFJ.js";import"./directive-jorct-Oe.js";import"./base-lit-element-CKIhnDR-.js";import"./a11y-utils-zbntmbh3.js";import"./dom-utils-_i8W1Ps4.js";import"./utils-BfMeZ1UR.js";import"./feature-detection-3Hxzrcpn.js";import"./constants-NJSwOtlj.js";import"./base-component-DuGK7lj-.js";import"./base-adapter-BUzokRGk.js";import"./tyler-icons-7uX1bPDw.js";import"./focus-indicator-DqIVBzGS.js";import"./utils-DU-9AqTO.js";import"./icon-button-BImepwl9.js";import"./base-button-core-CYXDVp3k.js";import"./with-label-aware-BNvgDdSc.js";import"./with-default-aria-BynPS94F.js";import"./state-layer-7HWBWBQu.js";import"./tooltip-BGJQ-ppx.js";import"./overlay-D9banag4.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./with-longpress-listener-CBo4eBdm.js";import"./dismissible-stack-xq-0Rg1q.js";import"./badge-BSBXRVV9.js";import"./menu-SXsmU0nM.js";import"./list-CUmFk2WX.js";import"./event-utils-zQ4FLDwK.js";import"./list-dropdown-aware-core-B3VzAkIM.js";import"./list-dropdown-CNlFL3Dm.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-DEYvX0ZE.js";import"./popover-CuKDZ7_o.js";import"./skeleton-g_Ea1Wjh.js";import"./a11y-BxM9_46k.js";import"./base-component-delegate-Cvjk9ypU.js";import"./avatar-Pe-gyKWB.js";import"./state-BC5YdUZQ.js";import"./style-map-qfztkuLE.js";import"./avatar-constants-vwnXwQnP.js";import"./button-veE_5Z_L.js";import"./toolbar-Bt_F_1V6.js";function e(r){const i={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...r.components};return t.jsxs(t.Fragment,{children:[t.jsx(n,{of:a}),`
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
`})})]})}function mt(r={}){const{wrapper:i}={...o(),...r.components};return i?t.jsx(i,{...r,children:t.jsx(e,{...r})}):e(r)}export{mt as default};
