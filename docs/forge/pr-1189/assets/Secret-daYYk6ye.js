import{u as s,j as e,M as r,T as c,C as o}from"./blocks-DrDFpA5a.js";import{C as l}from"./CustomArgTypes-7S9_USdX.js";import{C as a}from"./CssOnlyInformation-C_9NPJHz.js";import{S as d,D as h,N as p,B as m,C as x,a as u}from"./Secret.stories-DP88nV5_.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Cylg7AIw.js";import"./iframe-CYwqMFpx.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-BUEgyQuR.js";import"./style-map-iGxuQpg8.js";import"./directive-CwRn8Fwj.js";import"./ref-CbKdd-hM.js";import"./base-lit-element-CB18vL01.js";import"./service-adapter-gy1PbA1l.js";import"./secret-BbAvbCcd.js";import"./live-announcer-DuLqNKxe.js";import"./a11y-BxM9_46k.js";import"./icon-Tt8SKUgI.js";import"./property-ClMzaqJT.js";import"./constants-BPFI0b36.js";import"./feature-detection-Q4q-Y4Ic.js";import"./state-XTwHIerW.js";import"./base-button-Dsy3QO0_.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-CbIWIoQU.js";import"./dom-utils-Dwl6Rho5.js";import"./utils-DrKqfkBZ.js";import"./focus-indicator-ujSflWoB.js";import"./state-layer-D75fz-rw.js";import"./base-component-RfQ5fKAq.js";import"./base-adapter-CdkfKU0P.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./class-map-BU8lYIPj.js";import"./icon-button-DFwZyKlJ.js";import"./icon-button-constants-CAk_t8Bl.js";import"./tooltip-DctRAECl.js";import"./overlay-Cs0NPCFb.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./with-longpress-listener-D8NLSSJF.js";import"./dismissible-stack-Hc6LlN2C.js";import"./with-element-internals-CFSngiIf.js";import"./button-DHU_VBE6.js";import"./button-constants-G4LMDyUn.js";function i(t){const n={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
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
`,e.jsx(a,{})]})}function ce(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{ce as default};
