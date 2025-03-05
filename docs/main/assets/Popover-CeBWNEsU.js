import{j as e,M as s,T as a,C as i}from"./index-DYFiR1Oc.js";import{useMDXComponents as r}from"./index-jRlMj4U3.js";import{C as p}from"./CustomArgTypes-CzWkx1Yb.js";import{P as l,D as d,N as h}from"./Popover.stories-CbQPGExg.js";import"./iframe-C35_pVGS.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";import"./utils-BbKlM6X4.js";import"./lit-element-JplMEnZc.js";import"./lit-html-paDGiEfB.js";import"./index-Cf3axooF.js";import"./v4-CQkTLCs1.js";import"./style-map-C9nPWcxA.js";import"./directive-CF8sV3Lr.js";import"./ref-DJjbfkOF.js";import"./directive-helpers-DcB0QpIl.js";import"./feature-detection-DRCh51Sa.js";import"./toast-DiR1B_6L.js";import"./constants-9n5_0r7k.js";import"./base-adapter-B6TJxM93.js";import"./index-ByifSpfC.js";import"./button-DaDzbT7D.js";import"./icon-DB7kP3Ec.js";import"./index-BmocOEUj.js";import"./focus-indicator-DzT8BbE-.js";import"./state-layer-IxmMcKDT.js";import"./base-button-adapter-CyoupZ7K.js";import"./with-label-aware-OEbK3wHg.js";import"./with-default-aria-B0dk5gj8.js";import"./a11y-utils-DJ_tX8xT.js";import"./dialog-DJHwpo_v.js";import"./backdrop-CpAR1sZH.js";import"./dismissible-stack-C80072oY.js";import"./icon-button-Cj-mvUQ9.js";import"./overlay-es9tef1H.js";import"./popover-CUMSy1gT.js";import"./with-longpress-listener-BdUe1dXe.js";import"./scaffold-D66s8WNO.js";import"./toolbar-DrgqBcwu.js";import"./text-field-C35tonN9.js";import"./base-field-62l2GfBK.js";import"./label-BV_ZyirU.js";import"./button-toggle-group-BMa49BMk.js";import"./with-form-associated-Bje5Hee1.js";import"./checkbox-DKABHoWa.js";import"./switch-BXC-NkYO.js";import"./tooltip-BEr6TQlq.js";function n(o){const t={code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:l}),`
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
`,e.jsx(p,{})]})}function se(o={}){const{wrapper:t}={...r(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{se as default};
