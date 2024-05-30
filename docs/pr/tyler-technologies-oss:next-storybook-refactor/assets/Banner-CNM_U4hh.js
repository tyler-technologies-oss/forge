import{j as e}from"./jsx-runtime-wN_zvnPi.js";import{u as s}from"./index-Ge2tiL5T.js";import{M as r,T as a,C as i}from"./index-DbiNQr04.js";import{C as d}from"./CustomArgTypes-DAvAKVw6.js";import{B as l,D as c,T as m,C as h}from"./Banner.stories-DHgcByRC.js";import"./iframe--89dfugK.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./constants-CNtkYrkV.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./index-mTd1prAy.js";import"./icon-C851-S2l.js";import"./base-adapter-BJgF1p4o.js";import"./index-Dh0vMUMR.js";import"./icon-button-BRsbqzDA.js";import"./base-button-adapter-CWgfA8U7.js";import"./with-label-aware-DCBgJY4W.js";import"./with-default-aria-K6id_NgY.js";import"./event-utils-CtHj37Lc.js";import"./focus-indicator-BD-QeFjT.js";import"./utils-_KxxXSob.js";import"./state-layer-gTNLav97.js";import"./tooltip-CSCQqVjK.js";import"./overlay-D0kkXLZI.js";import"./with-longpress-listener-BFfBYlI6.js";import"./dismissible-stack-CQalC8SW.js";import"./button-CYUl4S3a.js";function o(n){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:l}),`
`,e.jsx(a,{}),`
`,e.jsx(t.p,{children:"The banner component is intended to be used as a way to deliver a short but important message to the user. It has a high degree of emphasis and should not be used for general messaging. If you need to show less important messages, or messages scoped to a more specific section of your page, you should consider using the inline message component. instead."}),`
`,e.jsx(t.p,{children:"This component supports built-in predefined themes. It can be configured to be either static or dismissable. It can contain a button to trigger whatever action you need."}),`
`,e.jsx(t.h2,{id:"default",children:"Default"}),`
`,e.jsx(i,{of:c}),`
`,e.jsx(t.h2,{id:"themed",children:"Themed"}),`
`,e.jsx(i,{of:m}),`
`,e.jsx(t.h2,{id:"combined",children:"Combined"}),`
`,e.jsx(t.p,{children:"Here is an example usage combined with a forge-button component:"}),`
`,e.jsx(i,{of:h}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Note:"}),` The design for the banner specifically requests that the button's background be white. Due to
limitations in how deep a css selector can drill into a slotted element, you will need to add that
background color yourself.`]}),`
`]}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(d,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["If the banner is used to display an important notification to a user, use the ",e.jsx(t.code,{children:'role="alert"'})," attribute on the ",e.jsx(t.code,{children:"<forge-banner>"})," element.",`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["This is equivalent to using ",e.jsx(t.code,{children:'aria-live="assertive"'}),"."]}),`
`,e.jsxs(t.li,{children:["If the banner is less urgent, you can use ",e.jsx(t.code,{children:'aria-live="polite"'})," to wait until the user is finished with their current task."]}),`
`]}),`
`]}),`
`]})]})}function K(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(o,{...n})}):o(n)}export{K as default};
