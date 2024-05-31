import{j as e}from"./jsx-runtime-CKcumnq7.js";import{u as r}from"./index-M4rjfSsN.js";import{M as s,T as a,C as i}from"./index-CjrY8o6-.js";import{C as p}from"./CustomArgTypes-D02txSFl.js";import{P as l,D as d,N as h}from"./Popover.stories-C4_Y4Zw9.js";import"./iframe-CYXyxrje.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./constants-Ds_Uvk97.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./chunk-MZXVCX43-CM0pFb8Z.js";import"./v4-CQkTLCs1.js";import"./style-map-CkvVWuL1.js";import"./ref-BHUNCdUQ.js";import"./directive-helpers-DYUueT8w.js";import"./toast-C6I-cpJw.js";import"./index-CsmkSriH.js";import"./button-DW0aIXKQ.js";import"./icon-DvTdPf-7.js";import"./base-adapter-BevgLcPl.js";import"./index-Dh0vMUMR.js";import"./focus-indicator-f9GJik4v.js";import"./utils-_KxxXSob.js";import"./state-layer-CvtwhWgg.js";import"./base-button-adapter-BBPlSPGT.js";import"./with-label-aware-DCBgJY4W.js";import"./with-default-aria-ClHkbshF.js";import"./event-utils-CtHj37Lc.js";import"./dialog-BYZ415ke.js";import"./backdrop-ClYq43FG.js";import"./dismissible-stack-CQalC8SW.js";import"./icon-button-DFQDfzrF.js";import"./overlay-g_05lOO3.js";import"./popover-DwRi4sRl.js";import"./with-longpress-listener-Yj0BFMDC.js";import"./scaffold-BJNJ51_H.js";import"./toolbar-CIHufYA6.js";import"./text-field-ChmOhgPO.js";import"./base-field-B2EYpsqa.js";import"./label-CyT64Z98.js";import"./with-form-associated-DAKsZBcz.js";import"./checkbox-D__IHhAJ.js";import"./switch-K7T10jln.js";import"./tooltip-QHNUkaAT.js";import"./base-field-foundation-DJFlSb2V.js";import"./object-utils-BVOUzLua.js";function n(o){const t={code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:l}),`
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
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"})]})}function le(o={}){const{wrapper:t}={...r(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{le as default};