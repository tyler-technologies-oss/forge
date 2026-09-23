import{u as r,j as e,M as s,T as a,C as i}from"./blocks-fUy4QAFv.js";import{C as p}from"./CustomArgTypes-CagqRkLp.js";import{P as h,D as l,N as d,a as c}from"./Popover.stories-Lfrc1OQJ.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CtUy9-VI.js";import"./iframe-DhPPATOI.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-BUEgyQuR.js";import"./style-map-CcP_kdqL.js";import"./directive-CwRn8Fwj.js";import"./ref-BhDBbNSW.js";import"./base-lit-element-HaqO9pkv.js";import"./service-adapter-gy1PbA1l.js";import"./toast-DIupd_v2.js";import"./base-component-RfQ5fKAq.js";import"./base-adapter-CdkfKU0P.js";import"./dom-utils-Dwl6Rho5.js";import"./icon-DaCKLlYs.js";import"./property-Dg1Vmfps.js";import"./constants-BPFI0b36.js";import"./feature-detection-Q4q-Y4Ic.js";import"./button-D5tK2bf-.js";import"./class-map-CEQgffN4.js";import"./utils-DrKqfkBZ.js";import"./focus-indicator-Cy6URCXv.js";import"./state-layer-D75fz-rw.js";import"./base-button-DXDc4OJ8.js";import"./state-Co1I3z7K.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-CbIWIoQU.js";import"./button-constants-G4LMDyUn.js";import"./with-element-internals-CFSngiIf.js";import"./dismissible-stack-Hc6LlN2C.js";import"./dialog-DGghfkK0.js";import"./backdrop-Cme44_g_.js";import"./icon-button-C2v-Sinx.js";import"./icon-button-constants-CAk_t8Bl.js";import"./overlay-DnA59UKB.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./live-announcer-DuLqNKxe.js";import"./a11y-BxM9_46k.js";import"./decorators-BUCTEMc-.js";import"./popover-B6Lyp91L.js";import"./with-longpress-listener-D8NLSSJF.js";import"./scaffold-BVJBr1z1.js";import"./toolbar-7MtW3mBN.js";import"./text-field-BWtqe7xr.js";import"./base-field-Mwf4T1kF.js";import"./label-D4E_mm-6.js";import"./button-toggle-group-constants-Dk2L7VtD.js";import"./checkbox-constants-CDXOwsBo.js";import"./switch-constants-GNrCf0tQ.js";import"./with-label-aware-Bp1VGc65.js";import"./tooltip-BJ-I3FD9.js";import"./base-drawer-BL5lye2C.js";import"./event-utils-zQ4FLDwK.js";import"./drawer-lU6k92RL.js";import"./modal-drawer-BZ72iO8w.js";import"./mini-drawer-OoNkqIRy.js";import"./list-BQeID-EI.js";import"./list-item-Czcdb5bP.js";function n(o){const t={code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:h}),`
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
`,e.jsx(p,{})]})}function we(o={}){const{wrapper:t}={...r(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{we as default};
