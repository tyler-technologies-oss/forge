import{u as s,j as e,M as r,T as c,C as o}from"./blocks-C1KGGw7k.js";import{C as l}from"./CustomArgTypes-ColsIvWl.js";import{C as a}from"./CssOnlyInformation-_uFob_9F.js";import{S as d,D as h,N as p,B as m,C as x,a as u}from"./Secret.stories-CzS2M6rm.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-CsSGZsWc.js";import"./utils-GdTrqNrR.js";import"./style-map-T9_Ws2yB.js";import"./directive-jorct-Oe.js";import"./ref-Bi0BJMrw.js";import"./base-lit-element-IVdF9mq4.js";import"./service-adapter-8tADcN_b.js";import"./secret-BV8ZwA5G.js";import"./live-announcer-DuLqNKxe.js";import"./a11y-BxM9_46k.js";import"./tyler-icons-CLRLqkf8.js";import"./utils-CjYv_z18.js";import"./constants-mjcpBxJK.js";import"./feature-detection-DaAsmZBy.js";import"./state-ojdKhgdV.js";import"./base-DVmwUFg0.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./class-map-vEqzEsLM.js";import"./a11y-utils-Cc0M_rsz.js";import"./dom-utils-D0uG6d5z.js";import"./utils-DU-9AqTO.js";import"./icon-button-DAI1ONvZ.js";import"./base-component-CjLGUkBU.js";import"./base-adapter-CWZvffxF.js";import"./base-button-core-dSuMDDpt.js";import"./with-label-aware-BTfOA73Y.js";import"./with-default-aria-B469Hs3U.js";import"./focus-indicator-DoA5AH4q.js";import"./state-layer-CKPcsXao.js";import"./icon-button-constants-CcGPrq8W.js";import"./tooltip-CE7u4Ary.js";import"./overlay-CX_m1mvq.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./with-longpress-listener-D3f6tu0y.js";import"./dismissible-stack-xq-0Rg1q.js";import"./button-B8LR0Yj3.js";import"./button-constants-BCAqtVHo.js";function i(t){const n={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
`,e.jsx(c,{}),`
`,e.jsx(n.p,{children:"The secret component conceals sensitive content with a blur or dot mask, revealing it on user interaction."}),`
`,e.jsx(o,{of:h}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"}),` Concealed content is still present in the DOM and can be accessed in the page source. The secret component
is useful for preventing shoulder surfing and accidental exposure, but it does not provide security against
determined users. `,e.jsx(n.strong,{children:"The only way to truly secure sensitive information is to not send it to the client at all."})]}),`
`]}),`
`,e.jsx(n.h2,{id:"named-groups",children:"Named Groups"}),`
`,e.jsxs(n.p,{children:["When multiple secrets share the same ",e.jsx(n.code,{children:"name"})," attribute, they act as a radio group where only one can be revealed at a time."]}),`
`,e.jsx(o,{of:p}),`
`,e.jsx(n.h2,{id:"block-layout",children:"Block Layout"}),`
`,e.jsxs(n.p,{children:["By default, the secret component displays inline with surrounding text. Setting it to ",e.jsx(n.code,{children:"block"})," allows it to wrap larger pieces of content like paragraphs or images."]}),`
`,e.jsx(o,{of:m}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The component uses ",e.jsx(n.code,{children:'role="group"'})," to semantically group the content and toggle button."]}),`
`,e.jsxs(n.li,{children:["The button uses ",e.jsx(n.code,{children:"aria-expanded"})," to convey whether the secret content is visible."]}),`
`,e.jsxs(n.li,{children:["The button is associated with the group via ",e.jsx(n.code,{children:"aria-controls"}),"."]}),`
`,e.jsx(n.li,{children:"When content is revealed, it's announced to screen readers using a live region."}),`
`,e.jsxs(n.li,{children:["Hidden content is marked with the ",e.jsx(n.code,{children:"inert"})," attribute to prevent keyboard navigation and screen reader access."]}),`
`,e.jsx(n.li,{children:"The button is focusable and can be toggled with the keyboard (Enter or Space). When the secret is open pressing Escape closes it."}),`
`,e.jsx(n.li,{children:"The secret's content can be clicked to reveal it and focus the button."}),`
`]}),`
`,e.jsx(n.h2,{id:"css-only",children:"CSS-Only"}),`
`,e.jsx(n.p,{children:"The secret component is also available as a CSS-only component. When using the CSS-only version, some scripting is still required to toggle the content's visibility."}),`
`,e.jsx(o,{of:x}),`
`,e.jsxs(n.p,{children:["The CSS-only version can also be used in a block layout by applying the ",e.jsx(n.code,{children:"forge-secret--block"})," class and using a text button."]}),`
`,e.jsx(o,{of:u}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," For proper accessibility set the following attributes to the CSS-only version:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'role="group"'})," on the ",e.jsx(n.code,{children:"forge-secret"})," element"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"aria-label"})," or ",e.jsx(n.code,{children:"aria-labelledby"})," on the ",e.jsx(n.code,{children:"forge-secret"})," element"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"inert"})," on the ",e.jsx(n.code,{children:"forge-secret__content"})," element when it's concealed"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'aria-expanded="true"'})," on the button when the content is revealed and ",e.jsx(n.code,{children:'aria-expanded="false"'})," when it's concealed"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"aria-controls"})," on the button referencing the ID of the ",e.jsx(n.code,{children:"forge-secret"})," element"]}),`
`]}),`
`,e.jsx(n.p,{children:"Additionally, consider using a live announcer to have assistive technologies announce when the content is revealed."}),`
`]}),`
`,e.jsx(a,{})]})}function re(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{re as default};
