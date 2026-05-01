import{u as s,j as e,M as r,T as a,C as o}from"./blocks-BsMblH_x.js";import{C as l}from"./CustomArgTypes-DeK6Go89.js";import{C as c}from"./CssOnlyInformation-B_4PK62v.js";import{B as d,D as m,T as h,C as p,a as u}from"./Banner.stories-DqiHpJAS.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BK3r3gy1.js";import"./utils-ZPyYhNMY.js";import"./tyler-icons-uU9Yd7lf.js";import"./constants-CPXBix-M.js";import"./feature-detection-3Hxzrcpn.js";import"./service-adapter-8tADcN_b.js";import"./icon-CXw8uXM_.js";import"./utils-BfMeZ1UR.js";import"./base-lit-element-CpSLQPQa.js";import"./directive-jorct-Oe.js";import"./banner-J5qP2dCT.js";import"./base-component-DuGK7lj-.js";import"./dom-utils-_i8W1Ps4.js";import"./base-adapter-BUzokRGk.js";import"./icon-button-Mxsm8Q6s.js";import"./base-button-core-yIcCgPXn.js";import"./with-label-aware-DlKNrMSu.js";import"./with-default-aria-DsVOZgoU.js";import"./a11y-utils-zbntmbh3.js";import"./focus-indicator-BBtCjyD8.js";import"./utils-DU-9AqTO.js";import"./state-layer-Kw6pmYRH.js";import"./tooltip-CePIGaWS.js";import"./overlay-B3G4TIM3.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./with-longpress-listener-dBAnuCiK.js";import"./dismissible-stack-xq-0Rg1q.js";import"./button-558tNDpa.js";function i(t){const n={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
`,e.jsx(a,{}),`
`,e.jsx(n.p,{children:"The banner component is intended to be used as a way to deliver a short but important message to the user. It has a high degree of emphasis and should not be used for general messaging. If you need to show less important messages, or messages scoped to a more specific section of your page, you should consider using the inline message component. instead."}),`
`,e.jsx(n.p,{children:"This component supports built-in predefined themes. It can be configured to be either static or dismissible. It can contain a button to trigger whatever action you need."}),`
`,e.jsx(n.h2,{id:"default",children:"Default"}),`
`,e.jsx(o,{of:m}),`
`,e.jsx(n.h2,{id:"themed",children:"Themed"}),`
`,e.jsx(o,{of:h}),`
`,e.jsx(n.h2,{id:"combined",children:"Combined"}),`
`,e.jsx(n.p,{children:"Here is an example usage combined with a forge-button component:"}),`
`,e.jsx(o,{of:p}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"}),` The design for the banner specifically requests that the button's background be white. Due to
limitations in how deep a css selector can drill into a slotted element, you will need to add that
background color yourself.`]}),`
`]}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If the banner is used to display an important notification to a user, use the ",e.jsx(n.code,{children:'role="alert"'})," attribute on the ",e.jsx(n.code,{children:"<forge-banner>"})," element.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["This is equivalent to using ",e.jsx(n.code,{children:'aria-live="assertive"'}),"."]}),`
`,e.jsxs(n.li,{children:["If the banner is less urgent, you can use ",e.jsx(n.code,{children:'aria-live="polite"'})," to wait until the user is finished with their current task."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{id:"css-only",children:"CSS-Only"}),`
`,e.jsx(n.p,{children:"The banner component is also available as a CSS-only component without the need for JavaScript."}),`
`,e.jsx(o,{of:u}),`
`,e.jsx(c,{})]})}function W(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{W as default};
