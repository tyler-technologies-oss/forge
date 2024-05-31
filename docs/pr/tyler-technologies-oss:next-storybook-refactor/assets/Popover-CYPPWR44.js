import{j as e}from"./jsx-runtime-D-dl0kK3.js";import{u as r}from"./index-Cs2YLsZS.js";import{M as s,T as a,C as i}from"./index-D1aTH4rQ.js";import{C as p}from"./CustomArgTypes-D7fMkQYH.js";import{P as l,D as d,N as h}from"./Popover.stories-D-75sdA5.js";import"./iframe-D6rJPwlf.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./constants-R2FX_sk2.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./chunk-MZXVCX43-CM0pFb8Z.js";import"./v4-CQkTLCs1.js";import"./style-map-CkvVWuL1.js";import"./ref-BHUNCdUQ.js";import"./directive-helpers-DYUueT8w.js";import"./toast-Q2zDZvRR.js";import"./index-OZgoMCom.js";import"./button-DculpQqj.js";import"./icon-CZkrZTCi.js";import"./base-adapter-qTVGb81X.js";import"./index-Dh0vMUMR.js";import"./focus-indicator-BmwOB_bZ.js";import"./utils-_KxxXSob.js";import"./state-layer-CeQoaxI0.js";import"./base-button-adapter-xQOIlp6K.js";import"./with-label-aware-DCBgJY4W.js";import"./with-default-aria-YPGh02Fz.js";import"./event-utils-CtHj37Lc.js";import"./dialog-BQRYv3i9.js";import"./backdrop-XgzzQ0HQ.js";import"./dismissible-stack-CQalC8SW.js";import"./icon-button-6NwWA6Ck.js";import"./overlay-BOlaL1kU.js";import"./popover-CJx-1uMX.js";import"./with-longpress-listener-DjZ5PCdL.js";import"./scaffold-DtaWDUie.js";import"./toolbar-CdykyXCC.js";import"./text-field-BDhl5amD.js";import"./base-field-Cln3De0E.js";import"./label-CForNPh6.js";import"./button-toggle-group-CZnFcEwc.js";import"./with-form-associated-DeNOuw8p.js";import"./checkbox-DrZFW_2X.js";import"./switch-Doy-eo9e.js";import"./tooltip-4DfVx071.js";import"./base-field-foundation-CUjWUzV4.js";import"./object-utils-BVOUzLua.js";function n(o){const t={code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:l}),`
`,e.jsx(a,{}),`
`,e.jsx(t.p,{children:`Popovers are used to display content on top of other content. They are used to show additional information related to the content that is currently
displayed on the screen, and is typically anchored to a specific element or area on the screen that triggered it to open.`}),`
`,e.jsx(i,{of:d}),`
`,e.jsx(t.h2,{id:"semantics",children:"Semantics"}),`
`,e.jsx(t.p,{children:`Popovers do not have any semantic meaning by default. This means that it's up to the developer to ensure that the content inside the popover is
accessible if it needs to be. This can be done by adding the appropriate ARIA attributes to the popover itself, or the content within it.`}),`
`,e.jsx(t.h2,{id:"popovers-vs-dialogs",children:"Popovers vs Dialogs"}),`
`,e.jsx(t.p,{children:`There is a lot of overlap between popovers and dialogs, and it can be difficult to know when to use one over the other. Here are some guidelines to help
you decide:`}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Popovers"}),` are used to display additional information related to the content that is currently displayed on the screen. They are typically anchored to
a specific element or area on the screen. Popovers are transient and non-modal, meaning that they do not block the user from interacting with the rest
of the page.`]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Dialogs"}),` are used to display content that requires the user's immediate attention. They are typically modal (but can be non-modal), meaning that they
block the user from interacting with the rest of the page until they are dismissed. Dialogs are typically used for things like confirmation messages,
alerts, and forms.`]}),`
`]}),`
`,e.jsx(t.p,{children:`There are some cases where you may need to blur these lines a bit (and you can use either component), especially if the design of your application calls
for it. Just be sure to consider the user experience and accessibility implications.`}),`
`,e.jsx(t.h2,{id:"non-modal-popoverdialog",children:"Non-modal Popover/Dialog"}),`
`,e.jsxs(t.p,{children:[`If you need to create a popover that behaves like a dialog (i.e. it is non-modal and does not block the user from interacting with the rest of the page),
you can use the `,e.jsx(t.code,{children:"<forge-popover>"})," and add the proper ARIA attributes to make it behave like a dialog."]}),`
`,e.jsx(i,{of:h}),`
`,e.jsxs(t.p,{children:["In this example, the popover is presented with the ",e.jsx(t.code,{children:'role="dialog"'})," and ",e.jsx(t.code,{children:'aria-modal="false"'}),` attributes. This tells screen readers that the popover is a
dialog, but it is not modal. This specific example will gracefully handle user entry into a form, by ensuring that the user does not lose valuable data
by accidentally closing the popover.`]}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(p,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"})]})}function de(o={}){const{wrapper:t}={...r(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{de as default};
