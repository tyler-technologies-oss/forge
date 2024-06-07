import{j as e}from"./jsx-runtime-Bqif4dE5.js";import{u as r}from"./index-uKPDgVDN.js";import{M as s,T as a,C as i}from"./index-BcNwXz3c.js";import{C as p}from"./CustomArgTypes-yCsBXd_R.js";import{P as l,D as d,N as h}from"./Popover.stories-B25aPCRe.js";import"./iframe-BCsXuNY6.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./utils-D8HxbzAZ.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./chunk-MZXVCX43-CM0pFb8Z.js";import"./v4-CQkTLCs1.js";import"./style-map-D0ILlpbs.js";import"./directive-CF8sV3Lr.js";import"./ref-BorTy8X1.js";import"./directive-helpers-DYUueT8w.js";import"./constants-BMnwgo1j.js";import"./toast-D3y3loY4.js";import"./base-adapter-CfNZnrSk.js";import"./index-CWt9cj6R.js";import"./button-CvtGTUrx.js";import"./icon-CiIDkczu.js";import"./index-Dh0vMUMR.js";import"./focus-indicator-WHVXAnYX.js";import"./state-layer-CoXZFfb6.js";import"./base-button-adapter-Bnq3CNpx.js";import"./with-label-aware-DCBgJY4W.js";import"./with-default-aria-CsT0RfQJ.js";import"./event-utils-DC3JW7a-.js";import"./dialog-DQZDuNnn.js";import"./backdrop-Cvi97NEF.js";import"./dismissible-stack-BU50KYzw.js";import"./icon-button-HggojrXv.js";import"./overlay-BEOKbUF9.js";import"./popover-BDS33NIt.js";import"./with-longpress-listener-3qRvv-1T.js";import"./scaffold-BBmmvCn_.js";import"./toolbar-ByH3IRVo.js";import"./text-field-wTYbmQEV.js";import"./base-field-GHyn4Nfz.js";import"./label-D6-42vki.js";import"./button-toggle-group-5oeOUIjG.js";import"./with-form-associated-D4BmhIcm.js";import"./checkbox-D7eDHrDc.js";import"./switch-CcHPf55S.js";import"./tooltip-th-W76HF.js";import"./base-field-core-DEpwP67f.js";function n(o){const t={code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:l}),`
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
`,e.jsx(p,{})]})}function de(o={}){const{wrapper:t}={...r(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{de as default};
