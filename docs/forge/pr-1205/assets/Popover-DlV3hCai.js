import{u as r,j as e,M as s,T as a,C as i}from"./blocks-ZCF8jAuh.js";import{C as p}from"./CustomArgTypes-BrNnIXPT.js";import{P as h,D as l,N as d,a as c}from"./Popover.stories-Ciavzh-i.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DAoAvB82.js";import"./iframe-CGF9490j.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-cbnKSSEt.js";import"./style-map-cEBdjqsX.js";import"./directive-CwRn8Fwj.js";import"./ref-9RqS8T1P.js";import"./base-lit-element-BzArp5lX.js";import"./service-adapter-DlT-lJx7.js";import"./toast-dpHRnoIj.js";import"./base-component-DokdPcmx.js";import"./base-adapter-C2s8cO2K.js";import"./dom-utils-D38acdAW.js";import"./tyler-icons-CM84cyec.js";import"./property-h_NQN_ax.js";import"./constants-Ds-UekRh.js";import"./feature-detection-Cxj81Y1H.js";import"./button-X-BaipNf.js";import"./class-map-C-Xl3VxB.js";import"./utils-DU-9AqTO.js";import"./focus-indicator-BuzCXwAm.js";import"./state-layer-BcVD1OXH.js";import"./base-button-BJYE3STx.js";import"./state-CvgusLtP.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-a04gn1ZN.js";import"./button-constants-D5k34xES.js";import"./with-element-internals-CJt7fDtX.js";import"./dismissible-stack-xq-0Rg1q.js";import"./dialog-CGeB4Flg.js";import"./backdrop-e4rWKi0D.js";import"./icon-button-D1wmfd79.js";import"./icon-button-constants-BJvh1yHL.js";import"./overlay-iu-_ABPF.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./live-announcer-DuLqNKxe.js";import"./a11y-BxM9_46k.js";import"./decorators-DIT-4P9h.js";import"./popover-CBkkBxnw.js";import"./with-longpress-listener-D-W76F-r.js";import"./scaffold-C8LskKFX.js";import"./toolbar-D4s_V7c3.js";import"./text-field-V39Mt-6S.js";import"./base-field-D8CxI0Jj.js";import"./label-CtoUkODo.js";import"./button-toggle-group-constants-lDTvG_dF.js";import"./checkbox-constants-BbWb-R-a.js";import"./switch-constants-DiyC_PIB.js";import"./with-label-aware-BP3asw-P.js";import"./tooltip-u84XDAZH.js";import"./base-drawer-C3RB7KRX.js";import"./event-utils-zQ4FLDwK.js";import"./drawer-C4w9_Owc.js";import"./modal-drawer-CG9TO9xg.js";import"./mini-drawer-B5rmf2t_.js";import"./list-EiOoI77I.js";import"./list-item-BwYEQ33V.js";function n(o){const t={code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:h}),`
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
`,e.jsx(p,{})]})}function Te(o={}){const{wrapper:t}={...r(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{Te as default};
