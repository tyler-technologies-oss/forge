import{j as e,M as r,T as a,C as o}from"./blocks-C3gDyZIu.js";import{useMDXComponents as s}from"./index-CqaAC5S2.js";import{C as l}from"./CustomArgTypes-CNLaeSI0.js";import{C as c}from"./CssOnlyInformation-CCg5j7el.js";import{B as d,D as h,T as m,C as p,a as u}from"./Banner.stories-M4nOXr8K.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BciiVb0K.js";import"./utils-D7XrLKwY.js";import"./icon-FzRol6Tl.js";import"./constants-y3-o2nLB.js";import"./feature-detection-BwPJgXni.js";import"./base-adapter-BB1UtCX3.js";import"./index-5CPwzmQS.js";import"./banner-B9AGOWqC.js";import"./icon-button-DpLi6_yQ.js";import"./base-button-adapter-tGikGtMQ.js";import"./with-label-aware-DXzk0r0A.js";import"./with-default-aria-BtzFnMjW.js";import"./a11y-utils-Dbhjrk0x.js";import"./utils-BtvMddIW.js";import"./focus-indicator-B9KMEBVK.js";import"./state-layer-CLjAHnoF.js";import"./tooltip-DcL6iv1E.js";import"./overlay-B72xXWi5.js";import"./with-longpress-listener-BTdNjnT1.js";import"./dismissible-stack-CF8GDA4v.js";import"./button-Bjtey6FZ.js";function i(t){const n={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
`,e.jsx(a,{}),`
`,e.jsx(n.p,{children:"The banner component is intended to be used as a way to deliver a short but important message to the user. It has a high degree of emphasis and should not be used for general messaging. If you need to show less important messages, or messages scoped to a more specific section of your page, you should consider using the inline message component. instead."}),`
`,e.jsx(n.p,{children:"This component supports built-in predefined themes. It can be configured to be either static or dismissible. It can contain a button to trigger whatever action you need."}),`
`,e.jsx(n.h2,{id:"default",children:"Default"}),`
`,e.jsx(o,{of:h}),`
`,e.jsx(n.h2,{id:"themed",children:"Themed"}),`
`,e.jsx(o,{of:m}),`
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
`,e.jsx(c,{})]})}function R(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{R as default};
