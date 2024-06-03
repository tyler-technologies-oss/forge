import{j as e}from"./jsx-runtime-N4H4aXAe.js";import{u as n}from"./index-DJMgF2Rz.js";import{M as s,T as a,C as i}from"./index-5Oxspu_i.js";import{C as p}from"./CustomArgTypes-CUEmoTSH.js";import{P as l,D as d,N as h}from"./Popover.stories-Dd78cLbT.js";import"./iframe-ZSlmDUOh.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./utils-CprCEKh8.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./chunk-MZXVCX43-CM0pFb8Z.js";import"./v4-CQkTLCs1.js";import"./style-map-D0ILlpbs.js";import"./directive-CF8sV3Lr.js";import"./ref-BorTy8X1.js";import"./directive-helpers-DYUueT8w.js";import"./toast-YmZjxQ9v.js";import"./index-W-tNKQGp.js";import"./button-DIahYMuH.js";import"./icon-Cn5siE75.js";import"./base-adapter-CMsBmfZ6.js";import"./constants-Di1oYYV9.js";import"./index-Dh0vMUMR.js";import"./focus-indicator-jd-AY9Jk.js";import"./utils-BJArth1J.js";import"./state-layer-DzrxdbUp.js";import"./base-button-adapter-Cr9F1-bS.js";import"./with-label-aware-DCBgJY4W.js";import"./with-default-aria-wOgqgTGi.js";import"./event-utils-DC3JW7a-.js";import"./dialog-B36BZilC.js";import"./backdrop-BPLpOU6H.js";import"./dismissible-stack-BU50KYzw.js";import"./icon-button-CcYkD_r5.js";import"./overlay-CRRs1KxA.js";import"./popover-Dh31glfv.js";import"./with-longpress-listener-D0chuLy_.js";import"./scaffold-2Da0R44t.js";import"./toolbar-l7xYvrSc.js";import"./text-field-BKuxhRPG.js";import"./base-field-AvFiHmn9.js";import"./label-sj17mrtY.js";import"./button-toggle-group-BikuhhTp.js";import"./with-form-associated-DehBXl_-.js";import"./checkbox-D4e4C5g3.js";import"./switch-z_rlF74_.js";import"./tooltip-DakFJcAJ.js";import"./base-field-foundation-BNB-nXUj.js";import"./object-utils-BVOUzLua.js";function r(o){const t={code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:l}),`
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
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"})]})}function me(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(r,{...o})}):r(o)}export{me as default};
