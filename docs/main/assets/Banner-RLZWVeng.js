import{j as e,M as r,T as a,C as o}from"./index-OukP47iL.js";import{useMDXComponents as s}from"./index-Ck7gG3J8.js";import{C as l}from"./CustomArgTypes-D-ao3rJS.js";import{C as c}from"./CssOnlyInformation-BAyi4f5-.js";import{B as d,D as m,T as h,C as p,a as u}from"./Banner.stories-DzBsI_FH.js";import"./iframe-BPbU5xgl.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CfOrKyLd.js";import"./index-DrFu-skq.js";import"./utils-wd6cBJ9K.js";import"./lit-element-CYrSCkDY.js";import"./lit-html-CuBe1DX_.js";import"./index-B-lxVbXh.js";import"./v4-CtRu48qb.js";import"./index-RsKXMDm2.js";import"./icon-D5yjdXv8.js";import"./constants-D2tqnpVB.js";import"./feature-detection-CY6TVbRZ.js";import"./base-adapter-BD6-QDkX.js";import"./index-CiLSBptl.js";import"./banner-D4viMWcU.js";import"./icon-button-4fx-LScl.js";import"./base-button-adapter-cyf2Ayfh.js";import"./with-label-aware-DMDMR_5T.js";import"./with-default-aria-DEjfFCHL.js";import"./a11y-utils-DGb1vALN.js";import"./utils-CRxrUqQD.js";import"./focus-indicator-NbLDNrYT.js";import"./state-layer-sxQMIn2c.js";import"./tooltip-BgQLBWUo.js";import"./overlay-8j8D8Fh1.js";import"./with-longpress-listener-DC7alanv.js";import"./dismissible-stack-BOibH_v8.js";import"./button-CutPPNni.js";function i(t){const n={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
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
`,e.jsx(c,{})]})}function V(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{V as default};
