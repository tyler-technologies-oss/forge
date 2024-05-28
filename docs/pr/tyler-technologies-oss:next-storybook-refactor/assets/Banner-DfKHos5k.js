import{j as e}from"./jsx-runtime-Be5aErfC.js";import{u as o}from"./index-DMroa5xm.js";import{M as r,T as a,C as s}from"./index-B2gziZGt.js";import{C as d}from"./CustomArgTypes-Dr1Yh3EO.js";import{B as l,D as c,T as h,C as m}from"./Banner.stories-BcwOx0Bg.js";import"./iframe-DAiJrE8c.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./icon-BhOk2-wr.js";import"./lit-element-Co407TGG.js";import"./lit-html-Cxzf5Fb2.js";import"./icon-button-T8K22hA9.js";import"./base-button-adapter-DuOjJ2u8.js";import"./with-longpress-listener-cB6lDDk_.js";import"./dismissible-stack-5T5mBIcn.js";import"./button-BPwkyV29.js";function i(t){const n={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...o(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:l}),`
`,e.jsx(a,{}),`
`,e.jsx(n.p,{children:"The banner component is intended to be used as a way to deliver a short but important message to the user. It has a high degree of emphasis and should not be used for general messaging. If you need to show less important messages, or messages scoped to a more specific section of your page, you should consider using the inline message component. instead."}),`
`,e.jsx(n.p,{children:"This component supports built-in predefined themes. It can be configured to be either static or dismissable. It can contain a button to trigger whatever action you need."}),`
`,e.jsx(n.h2,{id:"default",children:"Default"}),`
`,e.jsx(s,{of:c}),`
`,e.jsx(n.h2,{id:"themed",children:"Themed"}),`
`,e.jsx(s,{of:h}),`
`,e.jsx(n.h2,{id:"combined",children:"Combined"}),`
`,e.jsx(n.p,{children:"Here is an example usage combined with a forge-button component:"}),`
`,e.jsx(s,{of:m}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"}),` The design for the banner specifically requests that the button's background be white. Due to
limitations in how deep a css selector can drill into a slotted element, you will need to add that
background color yourself.`]}),`
`]}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(d,{}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If the banner is used to display an important notification to a user, use the ",e.jsx(n.code,{children:'role="alert"'})," attribute on the ",e.jsx(n.code,{children:"<forge-banner>"})," element.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["This is equivalent to using ",e.jsx(n.code,{children:'aria-live="assertive"'}),"."]}),`
`,e.jsxs(n.li,{children:["If the banner is less urgent, you can use ",e.jsx(n.code,{children:'aria-live="polite"'})," to wait until the user is finished with their current task."]}),`
`]}),`
`]}),`
`]})]})}function _(t={}){const{wrapper:n}={...o(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{_ as default};
