import{j as e,M as s,T as c,C as i}from"./blocks-DPEqPgsx.js";import{useMDXComponents as r}from"./index-CAEdcElO.js";import{C as a}from"./CustomArgTypes-C40uNcmf.js";import{S as p,D as l,N as m,B as d}from"./Secret.stories-fnKNQkdr.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-AHc4in5d.js";import"./utils-BnVlj7nJ.js";import"./style-map-CATDRJFa.js";import"./directive-jorct-Oe.js";import"./service-adapter-8tADcN_b.js";import"./secret-uql-xzZO.js";import"./live-announcer-DuLqNKxe.js";import"./a11y-BxM9_46k.js";import"./tyler-icons-CM60tYwf.js";import"./utils-BfMeZ1UR.js";import"./base-lit-element-Cr3ehu9y.js";import"./constants-HtjJ9Nou.js";import"./feature-detection-DaAsmZBy.js";import"./state-C_k2r8tG.js";import"./base-DVmwUFg0.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./class-map-BKv7dvU7.js";import"./ref-CddWsTta.js";import"./a11y-utils-5_BtrjMB.js";import"./dom-utils-_i8W1Ps4.js";import"./utils-DU-9AqTO.js";import"./icon-button-DwS1xu2e.js";import"./base-component-DL0YqY-6.js";import"./base-adapter-BZsNucGb.js";import"./base-button-core-Div7KqVi.js";import"./with-label-aware-BQywrHZk.js";import"./with-default-aria-DIbVfoWG.js";import"./focus-indicator-DdOir_sZ.js";import"./state-layer-CK5iHsfr.js";import"./tooltip-C_eok51I.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./with-longpress-listener-DAWyVdEW.js";import"./dismissible-stack-xq-0Rg1q.js";import"./button-DBXgo8js.js";function n(o){const t={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:p}),`
`,e.jsx(c,{}),`
`,e.jsx(t.p,{children:"The secret component conceals sensitive content with a blur or dot mask, revealing it on user interaction."}),`
`,e.jsx(i,{of:l}),`
`,e.jsx(t.h2,{id:"named-groups",children:"Named Groups"}),`
`,e.jsxs(t.p,{children:["When multiple secrets share the same ",e.jsx(t.code,{children:"name"})," attribute, they act as a radio group where only one can be revealed at a time."]}),`
`,e.jsx(i,{of:m}),`
`,e.jsx(t.h2,{id:"block-layout",children:"Block Layout"}),`
`,e.jsxs(t.p,{children:["By default, the secret component displays inline with surrounding text. Setting it to ",e.jsx(t.code,{children:"block"})," allows it to wrap larger pieces of content like paragraphs or images."]}),`
`,e.jsx(i,{of:d}),`
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
`]})]})}function te(o={}){const{wrapper:t}={...r(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{te as default};
