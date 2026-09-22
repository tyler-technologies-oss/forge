import{u as s,j as e,M as r,T as a,C as o}from"./blocks-BEkqHA1b.js";import{C as l}from"./CustomArgTypes-BFL-T1C8.js";import{C as m}from"./CssOnlyInformation-CtUCGRc0.js";import{B as c,D as d,T as p,C as h,a as u}from"./Banner.stories-CbRubMlu.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BqGV7hdN.js";import"./iframe-BTsZxqzu.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-B0J9t6hU.js";import"./tyler-icons-DhRbvloE.js";import"./service-adapter-DlT-lJx7.js";import"./property-DkOodoSL.js";import"./base-lit-element-fjOVRZ-k.js";import"./directive-CwRn8Fwj.js";import"./constants-DVKvft47.js";import"./feature-detection-Cdqsoz5C.js";import"./banner-Dm9dhMPo.js";import"./base-component-DokdPcmx.js";import"./base-adapter-C2s8cO2K.js";import"./dom-utils-D38acdAW.js";import"./icon-button-CSxHjIC-.js";import"./class-map-B2uIhfTt.js";import"./base-button-DyFlNd1j.js";import"./state-BuOq48og.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-CUlOUJ7O.js";import"./utils-DxVSXevv.js";import"./focus-indicator-BxamY3-n.js";import"./state-layer-UyeTOOS1.js";import"./icon-button-constants-wbi3a2tN.js";import"./tooltip-DAcILSGy.js";import"./overlay-knVFCZgv.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./with-longpress-listener--49psJKK.js";import"./dismissible-stack-Cj5gwv2p.js";import"./with-element-internals-BVdcaC_W.js";import"./button-ClyH3Yl3.js";import"./button-constants-Dh8wxsDb.js";function i(n){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:c}),`
`,e.jsx(a,{}),`
`,e.jsx(t.p,{children:"The banner component is intended to be used as a way to deliver a short but important message to the user. It has a high degree of emphasis and should not be used for general messaging. If you need to show less important messages, or messages scoped to a more specific section of your page, you should consider using the inline message component. instead."}),`
`,e.jsx(t.p,{children:"This component supports built-in predefined themes. It can be configured to be either static or dismissible. It can contain a button to trigger whatever action you need."}),`
`,e.jsx(t.h2,{id:"default",children:"Default"}),`
`,e.jsx(o,{of:d}),`
`,e.jsx(t.h2,{id:"themed",children:"Themed"}),`
`,e.jsx(o,{of:p}),`
`,e.jsx(t.h2,{id:"combined",children:"Combined"}),`
`,e.jsx(t.p,{children:"Here is an example usage combined with a forge-button component:"}),`
`,e.jsx(o,{of:h}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Note:"}),` The design for the banner specifically requests that the button's background be white. Due to
limitations in how deep a css selector can drill into a slotted element, you will need to add that
background color yourself.`]}),`
`]}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["If the banner is used to display an important notification to a user, use the ",e.jsx(t.code,{children:'role="alert"'})," attribute on the ",e.jsx(t.code,{children:"<forge-banner>"})," element.",`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["This is equivalent to using ",e.jsx(t.code,{children:'aria-live="assertive"'}),"."]}),`
`,e.jsxs(t.li,{children:["If the banner is less urgent, you can use ",e.jsx(t.code,{children:'aria-live="polite"'})," to wait until the user is finished with their current task."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(t.h2,{id:"css-only",children:"CSS-Only"}),`
`,e.jsx(t.p,{children:"The banner component is also available as a CSS-only component without the need for JavaScript."}),`
`,e.jsx(o,{of:u}),`
`,e.jsx(m,{})]})}function te(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{te as default};
