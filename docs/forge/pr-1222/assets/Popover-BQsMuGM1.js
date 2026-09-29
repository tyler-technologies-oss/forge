import{u as n,j as e,M as s,T as a,C as i}from"./blocks-NGx9a7zD.js";import{C as p}from"./CustomArgTypes-CCPKm7o2.js";import{P as m,D as h,N as l,a as d}from"./Popover.stories-BKOSyQhn.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BdLFNaKL.js";import"./iframe-CcCZn8Qo.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-BR1rLwc_.js";import"./style-map-BI7mT4Mo.js";import"./directive-CwRn8Fwj.js";import"./ref-CSqaho8F.js";import"./async-directive-O3ujTdIx.js";import"./service-adapter-8tADcN_b.js";import"./toast-K5Pp21nd.js";import"./custom-element-DR9AFpIK.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./core-property-Co8uF8PW.js";import"./tyler-icons-BSgf1RSL.js";import"./button-CifGyQIr.js";import"./property-Bfub1J69.js";import"./class-map-DV-Grsb7.js";import"./utils-C31il88P.js";import"./focus-indicator-CwT8THhK.js";import"./floating-ui.dom-DaMtbvS2.js";import"./base-lit-element-DZFbmyxG.js";import"./feature-detection-xOGaFvRv.js";import"./platform-C5RrLkNt.js";import"./icon-BIdGKJqZ.js";import"./constants-Bm8g2CKk.js";import"./state-layer-CZIH5add.js";import"./base-adapter-DOky_or5.js";import"./dom-utils-BDbRr6KM.js";import"./base-component-BFu9bkgC.js";import"./base-button-0U9gGSw9.js";import"./state-DhE3q6av.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-DssnAab5.js";import"./button-constants-B9P9oolT.js";import"./with-element-internals-DsIdl_YT.js";import"./dismissible-stack-DyoP5jNB.js";import"./dialog-DrWomsTl.js";import"./backdrop-C9lBlb_d.js";import"./icon-button-DuRpLS_m.js";import"./icon-button-constants-DWfjKRvV.js";import"./overlay-DNJ2GsC-.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./live-announcer-DuLqNKxe.js";import"./a11y-BxM9_46k.js";import"./decorators-cY3SrXK4.js";import"./popover-d2r_ayMy.js";import"./with-longpress-listener-C31eKfZf.js";import"./scaffold-ua4VSBPI.js";import"./toolbar-B_F4fpMR.js";import"./text-field-D815X8jF.js";import"./base-field-BYB1dcoa.js";import"./label-BhaR9I0r.js";import"./button-toggle-group-constants-CgEdCLCn.js";import"./checkbox-constants-BhAYnngS.js";import"./switch-constants-BnzCn4Xq.js";import"./with-label-aware-CQV8oFwb.js";import"./tooltip-BTtmmlI8.js";import"./object-utils-CUPteeNI.js";import"./base-drawer-L9q0-_V8.js";import"./event-utils-zQ4FLDwK.js";import"./drawer-6XaMN4pJ.js";import"./modal-drawer-B7CU3QM4.js";import"./mini-drawer-Dj8wQkgb.js";import"./list-0iJnd8Jh.js";import"./list-item-P9WX-v0r.js";function r(o){const t={code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:m}),`
`,e.jsx(a,{}),`
`,e.jsx(t.p,{children:`Popovers are used to display content on top of other content. They are used to show additional information related to the content that is currently
displayed on the screen, and is typically anchored to a specific element or area on the screen that triggered it to open.`}),`
`,e.jsx(i,{of:h}),`
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
`,e.jsx(i,{of:l}),`
`,e.jsxs(t.p,{children:["In this example, the popover is presented with the ",e.jsx(t.code,{children:'role="dialog"'})," and ",e.jsx(t.code,{children:'aria-modal="false"'}),` attributes. This tells screen readers that the popover is a
dialog, but it is not modal. This specific example will gracefully handle user entry into a form, by ensuring that the user does not lose valuable data
by accidentally closing the popover.`]}),`
`,e.jsx(t.h2,{id:"distinct-popovers",children:"Distinct Popovers"}),`
`,e.jsxs(t.p,{children:["In some cases, typically when using the ",e.jsx(t.code,{children:'"hover"'}),` trigger type, you may want to ensure that the popover is distinct from other popovers on the page meaning
that it can be the only popover within a specific group that is open at a time. This can be achieved by using the `,e.jsx(t.code,{children:"distinct"}),` attribute on
the `,e.jsx(t.code,{children:"<forge-popover>"})," element. While you can use the ",e.jsx(t.code,{children:"distinct"}),` attribute on any popover, this will cause it to use a "default" group. It is most commonly
used with a specific name or group to scope the distinct behavior to a specific set of popovers.`]}),`
`,e.jsx(i,{of:d}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(p,{})]})}function Re(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(r,{...o})}):r(o)}export{Re as default};
