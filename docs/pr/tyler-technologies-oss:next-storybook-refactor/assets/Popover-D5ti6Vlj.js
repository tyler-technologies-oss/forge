import{j as e}from"./jsx-runtime-C6oPbzis.js";import{u as r}from"./index-5VGxZEp3.js";import{M as s,T as a,C as i}from"./index-DXXQJ81I.js";import{C as p}from"./CustomArgTypes-B7JVcFgP.js";import{P as l,D as d,N as h}from"./Popover.stories-ebgM8P8X.js";import"./iframe-DbI9UVdK.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./constants-BNmdJboH.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./chunk-MZXVCX43-CM0pFb8Z.js";import"./v4-CQkTLCs1.js";import"./style-map-CkvVWuL1.js";import"./ref-BHUNCdUQ.js";import"./directive-helpers-DYUueT8w.js";import"./toast-DwnvWKlA.js";import"./index-Co64lOVc.js";import"./button-Dno1hZIV.js";import"./icon-CC1KhrIk.js";import"./base-adapter-UV8LVOHh.js";import"./index-Dh0vMUMR.js";import"./focus-indicator-C5tGHeao.js";import"./utils-_KxxXSob.js";import"./state-layer-UPopKgqP.js";import"./base-button-adapter-BrfkXoGx.js";import"./with-label-aware-DCBgJY4W.js";import"./with-default-aria-YtNT03JH.js";import"./event-utils-CtHj37Lc.js";import"./dialog-Blh03-i6.js";import"./backdrop-7-YdYNH1.js";import"./dismissible-stack-CQalC8SW.js";import"./icon-button-D1qECKOm.js";import"./overlay-Dv66gCFy.js";import"./popover-Cryb0HFa.js";import"./with-longpress-listener-DPSooiU2.js";import"./scaffold-DzZ6zkgi.js";import"./toolbar-DlZaYpaE.js";import"./text-field-CsyGh6_l.js";import"./base-field-BcPgRmD6.js";import"./label-WyQ6wqYc.js";import"./button-toggle-group-C9ERX37v.js";import"./with-form-associated-D_UFFlZ8.js";import"./checkbox-BX3t4RVJ.js";import"./switch-B1K8Df3E.js";import"./tooltip-DN43UyLQ.js";import"./base-field-foundation-Ca89UzZb.js";import"./object-utils-BVOUzLua.js";function n(o){const t={code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:l}),`
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
