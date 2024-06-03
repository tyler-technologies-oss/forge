import{j as e}from"./jsx-runtime-crLg0hz4.js";import{u as s}from"./index-CZ2QFZCc.js";import{M as r,T as a,C as i}from"./index-KlXqu8cq.js";import{C as d}from"./CustomArgTypes-3ju-zpvx.js";import{B as l,D as c,T as m,C as h}from"./Banner.stories-CiGrDihw.js";import"./iframe-C_2JhCym.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./constants-CYeMfgsl.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./index-Dd7dh6lc.js";import"./icon-Cl4LFQNy.js";import"./base-adapter-BhMU2jjH.js";import"./index-Dh0vMUMR.js";import"./icon-button-DHRKLwKL.js";import"./base-button-adapter-By6KisQg.js";import"./with-label-aware-DCBgJY4W.js";import"./with-default-aria-HK1DN-B0.js";import"./event-utils-gODbtzKd.js";import"./focus-indicator-Cam4qI9V.js";import"./utils-_KxxXSob.js";import"./state-layer-02o5UE3p.js";import"./tooltip-COJUfLm7.js";import"./overlay-Dg3gyJj4.js";import"./with-longpress-listener-C7tRQ3Nu.js";import"./dismissible-stack-DXt6aUkq.js";import"./button-Cmiqf2xE.js";function o(n){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:l}),`
`,e.jsx(a,{}),`
`,e.jsx(t.p,{children:"The banner component is intended to be used as a way to deliver a short but important message to the user. It has a high degree of emphasis and should not be used for general messaging. If you need to show less important messages, or messages scoped to a more specific section of your page, you should consider using the inline message component. instead."}),`
`,e.jsx(t.p,{children:"This component supports built-in predefined themes. It can be configured to be either static or dismissible. It can contain a button to trigger whatever action you need."}),`
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
