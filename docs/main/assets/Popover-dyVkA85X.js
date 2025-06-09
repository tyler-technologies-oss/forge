import{j as e,M as s,T as a,C as i}from"./blocks-aTY5qnRS.js";import{useMDXComponents as r}from"./index-CnSPdVAl.js";import{C as p}from"./CustomArgTypes-IQXKtdNT.js";import{P as h,D as l,N as d,a as c}from"./Popover.stories-CuT-Hjf9.js";import"./iframe-Bj_xTPxc.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-RWz8ScHn.js";import"./style-map-HqdbLfNa.js";import"./directive-CJw_OlP2.js";import"./ref-x9LH6zt0.js";import"./feature-detection-CY6TVbRZ.js";import"./toast-r2jOHawb.js";import"./constants-NErMj_Tj.js";import"./base-adapter-Ch0oiIsw.js";import"./icon-Bh1zyXYd.js";import"./index-CiLSBptl.js";import"./button-CLmfPElC.js";import"./focus-indicator-Cgfkaa3d.js";import"./utils-CRxrUqQD.js";import"./state-layer-BVsNuAhs.js";import"./base-button-adapter-BF7s-Uk_.js";import"./with-label-aware-DkCFYjRm.js";import"./with-default-aria-srFr2cNz.js";import"./a11y-utils-DGb1vALN.js";import"./dialog-BAjKLc2i.js";import"./backdrop-Bv12Tb1U.js";import"./dismissible-stack-BdWcv7_4.js";import"./icon-button-CuEKyh48.js";import"./overlay-CmLQVoKV.js";import"./decorators-sGwgh0yQ.js";import"./popover-BUd5kSDj.js";import"./with-longpress-listener-BDlFima-.js";import"./scaffold-BjMvQLbF.js";import"./toolbar-CJj-iw1_.js";import"./text-field-DcY_OPg2.js";import"./base-field-CF9KCSOy.js";import"./label-iMGwTRlg.js";import"./button-toggle-group-5BDyeLck.js";import"./with-form-associated-9Gj0jfo_.js";import"./checkbox-CF9fzMIR.js";import"./switch-ZI6WyDhE.js";import"./tooltip-DJb4FXvJ.js";import"./base-drawer-C68FwRuM.js";import"./event-utils-zQ4FLDwK.js";import"./drawer-DpoxQTjp.js";import"./modal-drawer-XYvP5Fib.js";import"./mini-drawer-uH-d4rqn.js";import"./list-DCzhHkfW.js";function n(o){const t={code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:h}),`
`,e.jsx(a,{}),`
`,e.jsx(t.p,{children:`Popovers are used to display content on top of other content. They are used to show additional information related to the content that is currently
displayed on the screen, and is typically anchored to a specific element or area on the screen that triggered it to open.`}),`
`,e.jsx(i,{of:l}),`
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
`,e.jsx(i,{of:d}),`
`,e.jsxs(t.p,{children:["In this example, the popover is presented with the ",e.jsx(t.code,{children:'role="dialog"'})," and ",e.jsx(t.code,{children:'aria-modal="false"'}),` attributes. This tells screen readers that the popover is a
dialog, but it is not modal. This specific example will gracefully handle user entry into a form, by ensuring that the user does not lose valuable data
by accidentally closing the popover.`]}),`
`,e.jsx(t.h2,{id:"distinct-popovers",children:"Distinct Popovers"}),`
`,e.jsxs(t.p,{children:["In some cases, typically when using the ",e.jsx(t.code,{children:'"hover"'}),` trigger type, you may want to ensure that the popover is distinct from other popovers on the page meaning
that it can be the only popover within a specific group that is open at a time. This can be achieved by using the `,e.jsx(t.code,{children:"distinct"}),` attribute on
the `,e.jsx(t.code,{children:"<forge-popover>"})," element. While you can use the ",e.jsx(t.code,{children:"distinct"}),` attribute on any popover, this will cause it to use a "default" group. It is most commonly
used with a specific name or group to scope the distinct behavior to a specific set of popovers.`]}),`
`,e.jsx(i,{of:c}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(p,{})]})}function ae(o={}){const{wrapper:t}={...r(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{ae as default};
