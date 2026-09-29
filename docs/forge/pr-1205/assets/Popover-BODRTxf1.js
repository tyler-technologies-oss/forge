import{u as n,j as e,M as s,T as a,C as i}from"./blocks-Ck8GEe5N.js";import{C as p}from"./CustomArgTypes-BL556TU4.js";import{P as m,D as h,N as l,a as d}from"./Popover.stories-DRqXR7Rl.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BieQ8965.js";import"./iframe-BJxToyET.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-UHZ10xki.js";import"./style-map-DdyOA5fx.js";import"./directive-CwRn8Fwj.js";import"./ref-Cg1geG2F.js";import"./async-directive-jA1Mz7ci.js";import"./service-adapter-8tADcN_b.js";import"./toast-BBPNIzAg.js";import"./custom-element-DBARb8MV.js";import"./component-utils-DXwuBG7n.js";import"./core-property-Co8uF8PW.js";import"./tyler-icons-BAsQ94Lf.js";import"./button-BFMR-gG-.js";import"./property-DFrfpKpf.js";import"./class-map-BnEDXcyy.js";import"./utils-C31il88P.js";import"./focus-indicator-DrGqahUv.js";import"./floating-ui.dom-DaMtbvS2.js";import"./base-lit-element-CpHFhxvO.js";import"./feature-detection-iQu3yOww.js";import"./platform-EVTRdOou.js";import"./icon-CxJqbZxZ.js";import"./constants-C55SM-CY.js";import"./create-context-BxR5I8pu.js";import"./state-layer-C_jpB3Dn.js";import"./base-adapter-DoIKtOh1.js";import"./dom-utils-BrrHV3zE.js";import"./base-component-Fg022xRz.js";import"./base-button-TqALiGM0.js";import"./state-Chsbeeao.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-DMYgbTDM.js";import"./button-constants-CBCPGxiy.js";import"./with-element-internals-DyIzLVwy.js";import"./dismissible-stack-DyoP5jNB.js";import"./dialog-DX49i-fZ.js";import"./backdrop-DRDqOFah.js";import"./icon-button-Jr3jBluS.js";import"./icon-button-constants-CCuvYQ62.js";import"./overlay-DJKQ8z9g.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./live-announcer-DuLqNKxe.js";import"./a11y-BxM9_46k.js";import"./decorators-BHnz32Yw.js";import"./popover-CyhOFEuV.js";import"./with-longpress-listener-BZtDEab1.js";import"./scaffold-Bfaw0bF8.js";import"./toolbar-D4eiazkc.js";import"./text-field-Cqx3plho.js";import"./base-field-CvxMEI8-.js";import"./label-D3aYJFzX.js";import"./button-toggle-group-constants-B13jv-HO.js";import"./checkbox-constants-BwwE81dH.js";import"./switch-constants-jYOGPwkc.js";import"./with-label-aware-0QImz1zN.js";import"./tooltip-DAmw-RhN.js";import"./object-utils-CUPteeNI.js";import"./base-drawer-DyN1qGQ4.js";import"./event-utils-zQ4FLDwK.js";import"./drawer-DVzWakGj.js";import"./modal-drawer-BJ5voIVv.js";import"./mini-drawer-zT43CQ5q.js";import"./list-DcLkysYS.js";import"./list-item-CkV3pnHm.js";function r(o){const t={code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:m}),`
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
