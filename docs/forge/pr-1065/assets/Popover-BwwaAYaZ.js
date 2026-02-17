import{j as e,M as s,T as a,C as i}from"./blocks-Cd8ovbmU.js";import{useMDXComponents as r}from"./index-mNNAnFaW.js";import{C as p}from"./CustomArgTypes-C8P1X2rG.js";import{P as h,D as l,N as d,a as c}from"./Popover.stories-CqvDKb0K.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-pqTvACNP.js";import"./utils-Cntew3lg.js";import"./style-map-BBm1Uuz6.js";import"./directive-jorct-Oe.js";import"./ref-BeKtLWVo.js";import"./service-adapter-CffG5Lhq.js";import"./toast-LD-5tkSc.js";import"./base-component-DDNjpQtJ.js";import"./feature-detection-DBWkqjAp.js";import"./base-adapter-j11ZPrFD.js";import"./tyler-icons-CBdZU-Tr.js";import"./index-DTwfV0k0.js";import"./button-DIUHasWh.js";import"./focus-indicator-B_dAHUd_.js";import"./property-lhIUG2P8.js";import"./base-lit-element-DAd-9Gma.js";import"./utils-DU-9AqTO.js";import"./state-layer-DGD4bZzf.js";import"./base-button-core-CMCUVN-D.js";import"./with-label-aware-Ef9Lm0aI.js";import"./with-default-aria-BJTWd1sB.js";import"./a11y-utils-Bk90r5kb.js";import"./dismissible-stack-xq-0Rg1q.js";import"./dialog-CGP43TQA.js";import"./backdrop-CaFxRXEM.js";import"./icon-button-B_qVG_it.js";import"./overlay-B2P-gJmC.js";import"./decorators-BLo25MQo.js";import"./popover-D2EVteKl.js";import"./with-longpress-listener-BpF482dW.js";import"./scaffold-CspBWUuL.js";import"./toolbar-DM62Euqg.js";import"./text-field-gs39rriO.js";import"./base-field-CdA0iQoJ.js";import"./label-Blmy9e6R.js";import"./button-toggle-group-CH9NiA1W.js";import"./with-form-associated-BAum3q-z.js";import"./checkbox-Dv_UGdzf.js";import"./switch-CicCqkci.js";import"./tooltip-DxbQteKS.js";import"./base-drawer-CNdRFpRQ.js";import"./event-utils-zQ4FLDwK.js";import"./drawer-D79-TANn.js";import"./modal-drawer-DO8CNRCC.js";import"./mini-drawer-CPIvZj6f.js";import"./list-a6IB0DPO.js";function n(o){const t={code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:h}),`
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
`,e.jsx(p,{})]})}function de(o={}){const{wrapper:t}={...r(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{de as default};
