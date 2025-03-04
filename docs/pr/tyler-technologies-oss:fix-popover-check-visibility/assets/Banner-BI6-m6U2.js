import{j as e,M as r,T as a,C as o}from"./index-DQkJAOqJ.js";import{useMDXComponents as s}from"./index-BOWymNru.js";import{C as l}from"./CustomArgTypes-nOU-1JrQ.js";import{C as c}from"./CssOnlyInformation-D5TIHRs2.js";import{B as d,D as m,T as h,C as p,a as u}from"./Banner.stories-0Mi-RvLj.js";import"./iframe-Dn0_c5e7.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";import"./utils-Dm6iQleG.js";import"./lit-element-JplMEnZc.js";import"./lit-html-paDGiEfB.js";import"./index-Cf3axooF.js";import"./v4-CQkTLCs1.js";import"./index-ByifSpfC.js";import"./icon-DB7kP3Ec.js";import"./constants-9n5_0r7k.js";import"./feature-detection-DRCh51Sa.js";import"./base-adapter-B6TJxM93.js";import"./index-BmocOEUj.js";import"./banner-H_1cAJNk.js";import"./icon-button-DxiF-tf5.js";import"./base-button-adapter-BiKAydtT.js";import"./with-label-aware-OEbK3wHg.js";import"./with-default-aria-B0dk5gj8.js";import"./a11y-utils-DJ_tX8xT.js";import"./focus-indicator-COi7jdIi.js";import"./state-layer-Bf3rUq66.js";import"./tooltip-rAGXZlY6.js";import"./overlay-D0uIIChk.js";import"./with-longpress-listener-BdUe1dXe.js";import"./dismissible-stack-BWoWS1Vy.js";import"./button-CTEnnZLo.js";function i(t){const n={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
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
`,e.jsx(c,{})]})}function U(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{U as default};
