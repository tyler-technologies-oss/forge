import{u as i,j as e,M as o,T as a,C as s}from"./blocks-XFXxCHax.js";import{C as d}from"./CustomArgTypes-CWzbzuQH.js";import{P as c,D as l,H as h,S as p,a as m,N as x,W as j,b as u,R as f}from"./ProcessStepper.stories-CrQs9eZG.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BFW4bN8h.js";import"./iframe-oAO0QRyC.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-BUadP3tW.js";import"./service-adapter-8tADcN_b.js";import"./avatar-CAfCJU7j.js";import"./property-CsZj1UFS.js";import"./state-CcYvR2OD.js";import"./style-map-Bp4U-jrn.js";import"./directive-CwRn8Fwj.js";import"./class-map-DX-Fvzp4.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./base-lit-element-BfYfGFH_.js";import"./async-directive-B0mdDXAn.js";import"./button-CSrhRaCz.js";import"./utils-C31il88P.js";import"./focus-indicator-DF5CnxaH.js";import"./floating-ui.dom-DaMtbvS2.js";import"./feature-detection-xOGaFvRv.js";import"./platform-C5RrLkNt.js";import"./icon-BNaE2C0t.js";import"./constants-ffvdo6x3.js";import"./create-context-BxR5I8pu.js";import"./state-layer-gtlkuVuf.js";import"./custom-element-DR9AFpIK.js";import"./core-property-Co8uF8PW.js";import"./base-adapter-DOky_or5.js";import"./dom-utils-BDbRr6KM.js";import"./base-component-BFu9bkgC.js";import"./base-button-CPl2ikJN.js";import"./tyler-icons-_o7MAz4c.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-DssnAab5.js";import"./button-constants-DRqTH6Pv.js";import"./checkbox-hjKXV30y.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./with-form-associated-BZpZ-kob.js";import"./with-element-internals-CFYP_epH.js";import"./with-label-aware-B4Q13qtt.js";import"./checkbox-constants-BJ3elUIK.js";import"./inline-message-ZbUKeLM6.js";import"./process-stepper-DMlSiHXa.js";import"./provide-CZDhzwTe.js";import"./consume-DtITIqjN.js";import"./context-root-BrWOZWcP.js";import"./live-announcer-DuLqNKxe.js";import"./a11y-BxM9_46k.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./if-defined-BmytRQ9-.js";import"./when-CI7b_ccM.js";import"./label-value-C0-wovkK.js";function r(n){const t={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:c}),`
`,`
`,e.jsx("style",{children:`
@media (max-width: 820px) {
  .sbdocs-content table {
    table-layout: fixed;
    width: 100%;
  }

  .sbdocs-content table :is(th, td, code, span, a) {
    overflow-wrap: anywhere;
    white-space: normal;
  }
}
`}),`
`,e.jsx(a,{}),`
`,e.jsx(t.p,{children:`Process steppers show where a user is within a multi-step process. Additional details and subtasks
may be presented directly within each step.`}),`
`,e.jsx(s,{of:l}),`
`,e.jsx(t.h2,{id:"orientation",children:"Orientation"}),`
`,e.jsxs(t.p,{children:[`Process steppers are vertical by default, which gives each step room for details and
interactive content. Set `,e.jsx(t.code,{children:"orientation"})," to ",e.jsx(t.code,{children:"horizontal"}),` for compact, progress-oriented
processes where steps are distributed evenly across the available width.`]}),`
`,e.jsx(s,{of:h}),`
`,e.jsx(t.h3,{id:"responsive-layout",children:"Responsive Layout"}),`
`,e.jsx(t.p,{children:`A horizontal stepper has no room for legible labels side by side in a small container — four steps
in a 360px container leaves roughly 48px each. Below 600px of available width, a horizontal stepper
therefore lays its steps out vertically, which gives every label and its details the width it needs.
The progress line stays visible as a vertical rail.`}),`
`,e.jsxs(t.p,{children:[`The switch is driven by the stepper's own width rather than the viewport, so a stepper inside a
narrow column adapts too. The `,e.jsx(t.code,{children:"orientation"})," attribute is unchanged; the read-only ",e.jsx(t.code,{children:"compact"}),` property
reports whether the compact layout is active. A stepper that is already vertical never changes.`]}),`
`,e.jsx(t.h2,{id:"step-states",children:"Step States"}),`
`,e.jsxs(t.p,{children:["Set the ",e.jsx(t.code,{children:"state"}),` property on each step to communicate its position in the process. The state controls
the marker treatment:`]}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"State"}),e.jsx(t.th,{children:"Marker"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"not-started"})}),e.jsx(t.td,{children:"Dashed outline"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"current"})}),e.jsx(t.td,{children:"Filled with a check icon, and the step is the current step in the process"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"in-progress"})}),e.jsx(t.td,{children:"Partially filled"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"completed"})}),e.jsx(t.td,{children:"Filled with a check icon"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"critical"})}),e.jsx(t.td,{children:"Error outline with an exclamation icon"})]})]})]}),`
`,e.jsx(s,{of:p}),`
`,e.jsx(t.h3,{id:"progress-track",children:"Progress Track"}),`
`,e.jsx(t.p,{children:`The progress track appears to the left of a vertical process stepper or above a horizontal process
stepper, indicating the user's current position in the process. Each step up to and including the
step with the "current" state has its portion of the track filled. If no step is marked current the
track remains entirely unfilled.`}),`
`,e.jsx(t.h3,{id:"disabled-steps",children:"Disabled Steps"}),`
`,e.jsxs(t.p,{children:["Set the ",e.jsx(t.code,{children:"disabled"})," property on a step to dim it and prevent interaction."]}),`
`,e.jsx(s,{of:m}),`
`,e.jsx(t.h3,{id:"support-text",children:"Support Text"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:"support text"})," slot for additional context under the label, such as ",e.jsx(t.code,{children:"Optional"}),` or a short
description of of the error on an invalid step.`]}),`
`,e.jsx(t.h3,{id:"custom-markers",children:"Custom Markers"}),`
`,e.jsxs(t.p,{children:["To replace a generated marker entirely, provide your own content in the step's ",e.jsx(t.code,{children:"marker"})," slot."]}),`
`,e.jsx(t.h2,{id:"step-numbers",children:"Step Numbers"}),`
`,e.jsxs(t.p,{children:["Markers render only an icon by default. Set ",e.jsx(t.code,{children:"numbered"}),` on the stepper to display each step's number
inside its marker. Steps that render a filled icon, such as completed and critical steps, continue
to show the icon rather than a number.`]}),`
`,e.jsx(s,{of:x}),`
`,e.jsx(t.h2,{id:"titles",children:"Titles"}),`
`,e.jsxs(t.p,{children:[`The stepper does not render a title of its own. Place a heading at the appropriate level for the
surrounding page before the stepper, and reference it with `,e.jsx(t.code,{children:"aria-labelledby"}),` so the list is named
after it:`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<h3 id="record-progress-title" class="forge-typography--subheading1">Record progress</h3>
<forge-process-stepper aria-labelledby="record-progress-title">...</forge-process-stepper>
`})}),`
`,e.jsx(s,{of:j}),`
`,e.jsx(t.h2,{id:"details",children:"Details"}),`
`,e.jsxs(t.p,{children:["Use a step's ",e.jsx(t.code,{children:"detail"}),` slot for supporting information such as dates or the assigned user. The
`,e.jsx(t.code,{children:"detail"})," slot may also contain subtasks or related actions."]}),`
`,e.jsx(s,{of:u}),`
`,e.jsx(t.h2,{id:"interactive-steps",children:"Interactive Steps"}),`
`,e.jsxs(t.p,{children:["Every step renders a button in its shadow DOM, with the slotted label as its content. Set ",e.jsx(t.code,{children:"href"}),` on a
step to render a link instead.`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<!-- Performs an action -->
<forge-process-step state="current">Suspension</forge-process-step>

<!-- Navigates -->
<forge-process-step state="completed" href="/cart">Cart</forge-process-step>
`})}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:"href"}),` when activating the step navigates, so it keeps the browser behaviour users expect from
a link, and leave it unset when the step performs an action in place. Set `,e.jsx(t.code,{children:"disabled"}),` to dim the step
and prevent interaction. A disabled link is rendered without its `,e.jsx(t.code,{children:"href"})," and with ",e.jsx(t.code,{children:'aria-disabled="true"'}),"."]}),`
`,e.jsxs(t.p,{children:["Only the default slot is placed in the button or link, so a button in the ",e.jsx(t.code,{children:"details"}),` slot does not
make the step itself interactive.`]}),`
`,e.jsxs(t.p,{children:["Activating a step dispatches a ",e.jsx(t.code,{children:"forge-process-step-select"}),` event from the step and a
`,e.jsx(t.code,{children:"change"})," event from the stepper. Read the activated step from the stepper's ",e.jsx(t.code,{children:"selectedStep"}),`
property:`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-typescript",children:`stepper.addEventListener('change', (event: Event) => {
  const { selectedStep } = event.target as ProcessStepperComponent;
});
`})}),`
`,e.jsx(t.h2,{id:"read-only",children:"Read Only"}),`
`,e.jsxs(t.p,{children:["Set ",e.jsx(t.code,{children:"readonly"}),` on the stepper to use it as a non-interactive indicator of progress. Steps in a
read-only stepper render only their label, without a button or link, so they are not focusable and
cannot be activated. `,e.jsx(t.code,{children:"href"})," and ",e.jsx(t.code,{children:"disabled"})," have no visible effect on a read-only step."]}),`
`,e.jsx(s,{of:f}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(d,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.p,{children:["Process steppers are rendered as semantic lists with ",e.jsx(t.code,{children:'role="list"'}),` on the stepper and
`,e.jsx(t.code,{children:'role="listitem"'}),` on each step. Each step reports its position and the number of steps, and
`,e.jsx(t.code,{children:'aria-current="step"'})," when its state is ",e.jsx(t.code,{children:"current"}),`. State markers are decorative and marked
`,e.jsx(t.code,{children:'aria-hidden="true"'}),"."]}),`
`,e.jsxs(t.p,{children:["When a stepper only shows part of a longer process, set ",e.jsx(t.code,{children:"aria-posinset"})," and ",e.jsx(t.code,{children:"aria-setsize"}),` on each
step. They take precedence over the step's position in the DOM for the accessibility tree, the
number shown in the marker, and progress announcements.`]}),`
`,e.jsx(t.p,{children:`Each step is a single list item. The interactive area of a step is a native button or link, and a
step's details content is a sibling of it rather than nested inside it, so interactive content keeps
its own semantics.`}),`
`,e.jsx(t.h3,{id:"progress-announcements",children:"Progress Announcements"}),`
`,e.jsxs(t.p,{children:[`Steps announce the position a process has moved to through the shared Forge live announcer, for
example "Step 3 of 5: Internal review". A step announces whenever its state is set to `,e.jsx(t.code,{children:"current"}),`,
including when a consumer advances the process programmatically, and stays silent on the initial
render so a screen reader is not interrupted when the page loads.`]}),`
`,e.jsx(t.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[`Because the marker is decorative, never rely on it alone to communicate state. Give steps whose
state is not obvious from the label supporting text in the `,e.jsx(t.code,{children:"details"})," slot"]}),`
`,e.jsxs(t.li,{children:["Set ",e.jsx(t.code,{children:"href"}),` when a step navigates and leave it unset when it acts, so it carries the
right semantics and keyboard behaviour for what it does`]}),`
`,e.jsxs(t.li,{children:[`Provide a heading alongside the process stepper and asssociate it with the stepper using
`,e.jsx(t.code,{children:"aria-labelledby"})]}),`
`,e.jsxs(t.li,{children:["Interactive content placed in the ",e.jsx(t.code,{children:"details"}),` slot keeps its own semantics
and focus behavior, so label it as you would anywhere else`]}),`
`]})]})}function ke(n={}){const{wrapper:t}={...i(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(r,{...n})}):r(n)}export{ke as default};
