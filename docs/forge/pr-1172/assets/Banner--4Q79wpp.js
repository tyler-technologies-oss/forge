import{u as s,j as e,M as r,T as a,C as o}from"./blocks-v1VsG6Mf.js";import{C as l}from"./CustomArgTypes-BmlZfEWI.js";import{C as m}from"./CssOnlyInformation-DIs9mHvl.js";import{B as c,D as d,T as h,C as p,a as u}from"./Banner.stories-DgcUOvZE.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-ZvzVysMB.js";import"./utils-D5x2rMta.js";import"./tyler-icons-H8C0T-24.js";import"./utils-CjYv_z18.js";import"./service-adapter-8tADcN_b.js";import"./base-lit-element-DBqzFQp-.js";import"./directive-CwRn8Fwj.js";import"./constants-scFqwPpP.js";import"./feature-detection-CvbR5w2Z.js";import"./banner-Due-4cKM.js";import"./base-component-DdGiO9ZD.js";import"./dom-utils-D0uG6d5z.js";import"./base-adapter-CbRstNNQ.js";import"./icon-button-wfw28VlB.js";import"./class-map-DS_zoLL-.js";import"./utils-DU-9AqTO.js";import"./focus-indicator-D_djYoC-.js";import"./state-layer-BjPyszbg.js";import"./base-button-kNlZFYOj.js";import"./state-QDHUUBut.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-BtLz16ul.js";import"./tooltip-D6dXzQ5h.js";import"./overlay-DZcAclZS.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./with-longpress-listener-5SwIGzn_.js";import"./dismissible-stack-xq-0Rg1q.js";import"./with-default-aria-Bs3XhyPE.js";import"./button-B8ecmhvI.js";function i(n){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:c}),`
`,e.jsx(a,{}),`
`,e.jsx(t.p,{children:"The banner component is intended to be used as a way to deliver a short but important message to the user. It has a high degree of emphasis and should not be used for general messaging. If you need to show less important messages, or messages scoped to a more specific section of your page, you should consider using the inline message component. instead."}),`
`,e.jsx(t.p,{children:"This component supports built-in predefined themes. It can be configured to be either static or dismissible. It can contain a button to trigger whatever action you need."}),`
`,e.jsx(t.h2,{id:"default",children:"Default"}),`
`,e.jsx(o,{of:d}),`
`,e.jsx(t.h2,{id:"themed",children:"Themed"}),`
`,e.jsx(o,{of:h}),`
`,e.jsx(t.h2,{id:"combined",children:"Combined"}),`
`,e.jsx(t.p,{children:"Here is an example usage combined with a forge-button component:"}),`
`,e.jsx(o,{of:p}),`
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
`,e.jsx(m,{})]})}function Z(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{Z as default};
