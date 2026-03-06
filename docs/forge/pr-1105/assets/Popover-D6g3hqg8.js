import{j as e,M as s,T as a,C as i}from"./blocks-DMVEWOyl.js";import{useMDXComponents as r}from"./index-LGoYPsEU.js";import{C as p}from"./CustomArgTypes-D2eQa72R.js";import{P as h,D as l,N as d,a as c}from"./Popover.stories-CAWmUT8i.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-C07_izNT.js";import"./utils-B3m7KQiq.js";import"./style-map-DKtD9blK.js";import"./directive-jorct-Oe.js";import"./ref-CW9FHhmW.js";import"./base-lit-element-Bqgryvb_.js";import"./service-adapter-8tADcN_b.js";import"./toast-D7w5g0A3.js";import"./base-component-DKBBFC2R.js";import"./dom-utils-DBb1ZGPZ.js";import"./base-adapter-Ca-TK4Oz.js";import"./tyler-icons-fP-z9z1i.js";import"./index-DTwfV0k0.js";import"./constants-HtjJ9Nou.js";import"./feature-detection-DaAsmZBy.js";import"./button-BHFcZZh0.js";import"./focus-indicator-CXn9rWMK.js";import"./utils-DU-9AqTO.js";import"./state-layer-BsCfz34t.js";import"./base-button-core-DZQiiZ0T.js";import"./with-label-aware-BQywrHZk.js";import"./with-default-aria-QS4QwZJb.js";import"./a11y-utils-ZQk7jpnB.js";import"./dismissible-stack-xq-0Rg1q.js";import"./dialog-C9AF9uqq.js";import"./backdrop-B9sZOcNp.js";import"./icon-button-DM1nATYu.js";import"./overlay-Bcsgewax.js";import"./live-announcer-DuLqNKxe.js";import"./a11y-BxM9_46k.js";import"./decorators-kT1b_Rs3.js";import"./popover-DSGvC3fA.js";import"./with-longpress-listener-DAWyVdEW.js";import"./scaffold-Lrq4JV9O.js";import"./toolbar-DtwiO902.js";import"./text-field-BXpA3LZ6.js";import"./base-field-CEekToEX.js";import"./label-C6FUeE-w.js";import"./button-toggle-group-fHeSNXzP.js";import"./with-form-associated-nT7v4ZFs.js";import"./checkbox-gX6kE-qO.js";import"./switch-CK2cqgnY.js";import"./tooltip-D8EeGsiQ.js";import"./base-drawer-iGLMTyCj.js";import"./event-utils-zQ4FLDwK.js";import"./drawer-C-0etnGZ.js";import"./modal-drawer-DEEX0WZG.js";import"./mini-drawer-rL418fzY.js";import"./list-D_-uWQM4.js";function n(o){const t={code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:h}),`
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
`,e.jsx(p,{})]})}function ue(o={}){const{wrapper:t}={...r(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{ue as default};
