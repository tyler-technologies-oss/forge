import{j as e,M as s,T as a,C as i}from"./blocks-B6y53uqq.js";import{useMDXComponents as r}from"./index-Iq9ILhej.js";import{C as p}from"./CustomArgTypes-DEqu4UWS.js";import{P as h,D as l,N as d,a as c}from"./Popover.stories-C4fairR6.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-HlIX8nsI.js";import"./utils-DhPatzMP.js";import"./style-map-CJVXeR4e.js";import"./directive-jorct-Oe.js";import"./ref-DHmNwni-.js";import"./base-lit-element-_81_THYZ.js";import"./service-adapter-CoGDs2_3.js";import"./toast-DqATFgpj.js";import"./base-component-VHVExFFl.js";import"./dom-utils-DrFTp_YE.js";import"./base-adapter-Bv1ZGQ1S.js";import"./tyler-icons-B1nAV5VC.js";import"./index-DTwfV0k0.js";import"./constants-d60dfpEV.js";import"./feature-detection-DlorGArm.js";import"./button-C32nRzKT.js";import"./focus-indicator-DO-4oH1N.js";import"./utils-DU-9AqTO.js";import"./state-layer-DNIS1N8s.js";import"./base-button-core-P_-z6ImB.js";import"./with-label-aware-DpjVJhjv.js";import"./with-default-aria-DhENBwsq.js";import"./a11y-utils-BAVI_s0s.js";import"./dismissible-stack-xq-0Rg1q.js";import"./dialog-DnEdA4Zv.js";import"./backdrop-oZnGSNKb.js";import"./icon-button-kXhWo8t5.js";import"./overlay-CKBuRB0A.js";import"./a11y-BxM9_46k.js";import"./decorators-D7VHZGxl.js";import"./popover-OppO9jQP.js";import"./with-longpress-listener-v9rKrqen.js";import"./scaffold-WBY1Y1UI.js";import"./toolbar-DZNz2UmX.js";import"./text-field-DXuIdBiY.js";import"./base-field-BqEaAztZ.js";import"./label-YoDu1hYe.js";import"./button-toggle-group-C7Z2oquR.js";import"./with-form-associated-5ixz8BLc.js";import"./checkbox-IEt9rg4t.js";import"./switch-D4m-nLTp.js";import"./tooltip-CfnSp6nA.js";import"./base-drawer-BE-Z-VKe.js";import"./event-utils-zQ4FLDwK.js";import"./drawer-CndaJZ5M.js";import"./modal-drawer-DJtc-YF3.js";import"./mini-drawer-DMU3MkON.js";import"./list-2JCez8nQ.js";function n(o){const t={code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:h}),`
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
`,e.jsx(p,{})]})}function me(o={}){const{wrapper:t}={...r(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{me as default};
