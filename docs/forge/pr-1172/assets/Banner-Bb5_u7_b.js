import{u as s,j as e,M as r,T as a,C as o}from"./blocks-CC57vY-r.js";import{C as l}from"./CustomArgTypes-CtZbDmHN.js";import{C as c}from"./CssOnlyInformation-DhqqmqNl.js";import{B as d,D as m,T as h,C as p,a as u}from"./Banner.stories-Dzusn0K7.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-DVkCwayn.js";import"./utils-DdM9-TOU.js";import"./tyler-icons-Cgf0s-mg.js";import"./utils-CjYv_z18.js";import"./service-adapter-8tADcN_b.js";import"./base-lit-element-CI1FM2mI.js";import"./directive-CwRn8Fwj.js";import"./constants-D9XaGcQ2.js";import"./feature-detection-3Hxzrcpn.js";import"./banner-CklL7CQk.js";import"./base-component-CYrqcnEP.js";import"./dom-utils-D0uG6d5z.js";import"./base-adapter-Dc6xHI12.js";import"./icon-button-Bo2inTOg.js";import"./class-map-3YYmKfcP.js";import"./utils-DU-9AqTO.js";import"./focus-indicator-DhDYsd3D.js";import"./state-layer-DRsbBcDh.js";import"./base-button-Dm32-Z8k.js";import"./base-D5OLj3-A.js";import"./query-assigned-elements-BiZAc0aq.js";import"./a11y-utils-DQoauvDo.js";import"./tooltip-CR19x8g7.js";import"./overlay-28eYr5_V.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./with-longpress-listener-DnatLNR5.js";import"./dismissible-stack-xq-0Rg1q.js";import"./with-default-aria-D57-4a2v.js";import"./button-CS24bbOS.js";function i(n){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
`,e.jsx(a,{}),`
`,e.jsx(t.p,{children:"The banner component is intended to be used as a way to deliver a short but important message to the user. It has a high degree of emphasis and should not be used for general messaging. If you need to show less important messages, or messages scoped to a more specific section of your page, you should consider using the inline message component. instead."}),`
`,e.jsx(t.p,{children:"This component supports built-in predefined themes. It can be configured to be either static or dismissible. It can contain a button to trigger whatever action you need."}),`
`,e.jsx(t.h2,{id:"default",children:"Default"}),`
`,e.jsx(o,{of:m}),`
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
`,e.jsx(c,{})]})}function Y(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{Y as default};
