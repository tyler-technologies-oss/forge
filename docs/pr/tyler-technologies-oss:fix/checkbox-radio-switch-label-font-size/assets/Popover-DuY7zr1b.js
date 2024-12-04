import{ae as e,af as a,ag as s,ah as i}from"./index-CWr1otLv.js";import{u as r}from"./index-6hc0jYJf.js";import{C as p}from"./CustomArgTypes-DbtIV9Mo.js";import{P as l,D as d,N as h}from"./Popover.stories-CW9tPrJF.js";import"./iframe-Bxl6NTqi.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";import"./utils-B8wO9gy3.js";import"./lit-element-CgJqSpuc.js";import"./lit-html-paDGiEfB.js";import"./chunk-D5ZWXAHU-CGElDDNX.js";import"./v4-CQkTLCs1.js";import"./style-map-C9nPWcxA.js";import"./directive-CF8sV3Lr.js";import"./ref-DJjbfkOF.js";import"./directive-helpers-DcB0QpIl.js";import"./constants-CFf81ck9.js";import"./toast-eRimfdvt.js";import"./base-adapter-Dh44vCkH.js";import"./index-ByifSpfC.js";import"./button-CVZhEkBO.js";import"./icon-FszQmWVN.js";import"./index-BmocOEUj.js";import"./focus-indicator-DesOnyyZ.js";import"./state-layer-COSQHCpS.js";import"./base-button-adapter-BS886vuU.js";import"./with-label-aware-CjYHyB6d.js";import"./with-default-aria-CAIVLMQ_.js";import"./dialog-DMZjj_XW.js";import"./backdrop-DIWDpEO-.js";import"./dismissible-stack-DVth9mRg.js";import"./icon-button-DxSYWoFH.js";import"./overlay-DUpFUxF7.js";import"./popover-CFhwSXnG.js";import"./with-longpress-listener-B4oujpK4.js";import"./scaffold-CJaNXwdy.js";import"./toolbar-CKT6WFUk.js";import"./text-field-CfFdCGD3.js";import"./base-field-B3G1AUW7.js";import"./label-vvkoxJPJ.js";import"./button-toggle-group-C7b9_lqU.js";import"./with-form-associated-CVqCUEW0.js";import"./checkbox-BavEIv2Q.js";import"./switch-DTtl0JRG.js";import"./tooltip-ClBWJcYu.js";function n(o){const t={code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:l}),`
`,e.jsx(s,{}),`
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
`,e.jsx(p,{})]})}function ae(o={}){const{wrapper:t}={...r(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{ae as default};
