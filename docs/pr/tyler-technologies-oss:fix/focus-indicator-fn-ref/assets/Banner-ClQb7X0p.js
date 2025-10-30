import{j as e,M as r,T as a,C as o}from"./blocks-9l-d2DJv.js";import{useMDXComponents as s}from"./index-DemGgAEd.js";import{C as l}from"./CustomArgTypes-DoC-COyi.js";import{C as c}from"./CssOnlyInformation-C0aT0WHR.js";import{B as d,D as m,T as h,C as p,a as u}from"./Banner.stories-Bt7vQSP2.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BFlAyfIN.js";import"./utils-C83vs9tY.js";import"./icon-kuXwuZAY.js";import"./constants-DzQy6WDX.js";import"./service-adapter-CffG5Lhq.js";import"./feature-detection-B-sRDmdg.js";import"./base-adapter-C8aSF3nG.js";import"./index-5CPwzmQS.js";import"./banner-CdGILhsv.js";import"./icon-button-DlbKyjJp.js";import"./base-button-adapter-CA8DBOGE.js";import"./with-label-aware-C7up74QW.js";import"./with-default-aria-6GN_uk1I.js";import"./a11y-utils-Dj08p-2z.js";import"./utils-Bd6MGx91.js";import"./focus-indicator-yFQbMPVG.js";import"./base-lit-element-MJT3RFU7.js";import"./state-layer-gAgMwMHF.js";import"./tooltip-B59ljHGY.js";import"./overlay-B5pGv-rV.js";import"./with-longpress-listener-DtGZwA0v.js";import"./dismissible-stack-TpzCxM2R.js";import"./button-BJzpnrOc.js";function i(t){const n={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
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
`,e.jsx(c,{})]})}function G(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{G as default};
