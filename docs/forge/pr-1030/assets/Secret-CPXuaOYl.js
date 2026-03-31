import{j as e,M as s,T as c,C as o}from"./blocks-Cz8M_cQD.js";import{useMDXComponents as r}from"./index-DkCd53aZ.js";import{C as a}from"./CustomArgTypes-3PgjXkxS.js";import{S as l,D as p,N as d,B as m}from"./Secret.stories-xdcCCmrm.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-DIse7dWG.js";import"./utils-CAFI_ioD.js";import"./style-map-qHxQrmee.js";import"./directive-jorct-Oe.js";import"./service-adapter-8tADcN_b.js";import"./secret-C26p3UpN.js";import"./live-announcer-DuLqNKxe.js";import"./a11y-BxM9_46k.js";import"./tyler-icons-CJFVxose.js";import"./utils-BfMeZ1UR.js";import"./base-lit-element-DWR2dN0d.js";import"./constants-HtjJ9Nou.js";import"./feature-detection-DaAsmZBy.js";import"./state-QauxyHOM.js";import"./base-DVmwUFg0.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./class-map-OVZxgJKW.js";import"./ref-Dhc4TPKJ.js";import"./a11y-utils-5_BtrjMB.js";import"./dom-utils-_i8W1Ps4.js";import"./utils-DU-9AqTO.js";import"./icon-button-DhxJI1TN.js";import"./base-component-DL0YqY-6.js";import"./base-adapter-BZsNucGb.js";import"./base-button-core-DnkLeCgJ.js";import"./with-label-aware-BQywrHZk.js";import"./with-default-aria-DIbVfoWG.js";import"./focus-indicator-ByV7i1_k.js";import"./state-layer-CK5iHsfr.js";import"./tooltip-C_eok51I.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./with-longpress-listener-DAWyVdEW.js";import"./dismissible-stack-xq-0Rg1q.js";import"./button-BFEOBbvJ.js";function i(n){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:l}),`
`,e.jsx(c,{}),`
`,e.jsx(t.p,{children:"The secret component conceals sensitive content with a blur or dot mask, revealing it on user interaction."}),`
`,e.jsx(o,{of:p}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Note:"}),` Concealed content is still present in the DOM and can be accessed in the page source. The secret component
is useful for preventing shoulder surfing and accidental exposure, but it does not provide security against
determined users. `,e.jsx(t.strong,{children:"The only way to truly secure sensitive information is to not send it to the client at all."})]}),`
`]}),`
`,e.jsx(t.h2,{id:"named-groups",children:"Named Groups"}),`
`,e.jsxs(t.p,{children:["When multiple secrets share the same ",e.jsx(t.code,{children:"name"})," attribute, they act as a radio group where only one can be revealed at a time."]}),`
`,e.jsx(o,{of:d}),`
`,e.jsx(t.h2,{id:"block-layout",children:"Block Layout"}),`
`,e.jsxs(t.p,{children:["By default, the secret component displays inline with surrounding text. Setting it to ",e.jsx(t.code,{children:"block"})," allows it to wrap larger pieces of content like paragraphs or images."]}),`
`,e.jsx(o,{of:m}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(a,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["The component uses ",e.jsx(t.code,{children:'role="group"'})," to semantically group the content and toggle button."]}),`
`,e.jsxs(t.li,{children:["The button uses ",e.jsx(t.code,{children:"aria-expanded"})," to convey whether the secret content is visible."]}),`
`,e.jsxs(t.li,{children:["The button is associated with the group via ",e.jsx(t.code,{children:"aria-controls"}),"."]}),`
`,e.jsx(t.li,{children:"When content is revealed, it's announced to screen readers using a live region."}),`
`,e.jsxs(t.li,{children:["Hidden content is marked with the ",e.jsx(t.code,{children:"inert"})," attribute to prevent keyboard navigation and screen reader access."]}),`
`,e.jsx(t.li,{children:"The button is focusable and can be toggled with the keyboard (Enter or Space). When the secret is open pressing Escape closes it."}),`
`,e.jsx(t.li,{children:"The secret's content can be clicked to reveal it and focus the button."}),`
`]})]})}function te(n={}){const{wrapper:t}={...r(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{te as default};
