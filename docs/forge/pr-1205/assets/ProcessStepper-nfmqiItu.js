import{u as i,j as e,M as o,T as a,C as s}from"./blocks-CUjya542.js";import{U as c,C as d}from"./CustomArgTypes-Cbgvurit.js";import{P as l,D as h,H as p,C as x,S as j,N as m,W as u,a as g,b as f,c as b,I as v,d as w}from"./ProcessStepper.stories-DuyIm26G.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DhaEe5HC.js";import"./iframe-BsWNYj34.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-DkXHK9oa.js";import"./service-adapter-8tADcN_b.js";import"./button-CtcS03YF.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./property-DjxtPSwu.js";import"./class-map-Bo5d0TOS.js";import"./directive-CwRn8Fwj.js";import"./utils-C31il88P.js";import"./focus-indicator-Bk7H1xfH.js";import"./floating-ui.dom-DaMtbvS2.js";import"./base-lit-element-uFwdyarG.js";import"./async-directive-CNb4_GPI.js";import"./feature-detection-xOGaFvRv.js";import"./platform-C5RrLkNt.js";import"./icon-BUxeVNUp.js";import"./constants-ffvdo6x3.js";import"./create-context-BxR5I8pu.js";import"./state-layer-gtlkuVuf.js";import"./custom-element-DR9AFpIK.js";import"./core-property-Co8uF8PW.js";import"./base-adapter-DOky_or5.js";import"./dom-utils-BDbRr6KM.js";import"./base-component-BFu9bkgC.js";import"./base-button-B4XSMArk.js";import"./tyler-icons-D62AQmQV.js";import"./state-CbHYH1xk.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-DssnAab5.js";import"./button-constants-DRqTH6Pv.js";import"./checkbox-CLo5fYIE.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./with-form-associated-BZpZ-kob.js";import"./with-element-internals-CFYP_epH.js";import"./with-label-aware-B4Q13qtt.js";import"./checkbox-constants-BJ3elUIK.js";import"./inline-message-ZbUKeLM6.js";import"./process-stepper-HWDRv281.js";import"./provide-CZDhzwTe.js";import"./consume-DtITIqjN.js";import"./context-root-BrWOZWcP.js";import"./live-announcer-DuLqNKxe.js";import"./a11y-BxM9_46k.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./when-CI7b_ccM.js";function r(n){const t={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:l}),`
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
`,e.jsx(t.p,{children:`Process steppers show where a user is within a multi-step process, and allow actions to be completed
directly from each step. Unlike the stepper component, a process step can contain arbitrary
interactive content, so users can complete tasks, acknowledge information, or launch a workflow
without leaving the page.`}),`
`,e.jsx(s,{of:h}),`
`,e.jsx(c,{text:"the stepper component",href:"?path=/docs/components-stepper--docs"}),`
`,e.jsx(t.h2,{id:"orientation",children:"Orientation"}),`
`,e.jsxs(t.p,{children:[`Process steppers are vertical by default, which gives each step room for descriptions, meta
content, and interactive content. Set `,e.jsx(t.code,{children:"orientation"})," to ",e.jsx(t.code,{children:"horizontal"}),` for compact, progress-oriented
processes where steps are distributed evenly across the available width.`]}),`
`,e.jsx(s,{of:p}),`
`,e.jsx(t.h2,{id:"small-screens",children:"Small Screens"}),`
`,e.jsx(t.p,{children:`A horizontal stepper has no room for legible labels side by side on a phone — four steps in a 360px
container leaves roughly 48px each. Below 600px of available width, a horizontal stepper therefore
lays its steps out vertically, which gives every label, description, and action the width it needs.
The progress line stays visible as the vertical rail, so progress is still communicated.`}),`
`,e.jsxs(t.p,{children:[`The switch is driven by the stepper's own width rather than the viewport, so a stepper inside a
narrow column adapts too. The `,e.jsx(t.code,{children:"orientation"})," attribute is unchanged; the read-only ",e.jsx(t.code,{children:"compact"}),` property
reports whether the compact layout is active. A stepper that is already vertical never changes.`]}),`
`,e.jsx(s,{of:x}),`
`,e.jsx(t.h2,{id:"progress",children:"Progress"}),`
`,e.jsxs(t.p,{children:[`A continuous line runs alongside the steps and doubles as the progress indicator: a rail to the
start of the markers when vertical, and a track above them when horizontal. The line is filled
through every step in the `,e.jsx(t.code,{children:"completed"}),", ",e.jsx(t.code,{children:"current"}),", or ",e.jsx(t.code,{children:"in-progress"}),` state, and unfilled for the steps
that follow, so it reads as a progress bar that fills as the process advances.`]}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"progress"})," property returns the fraction of steps that are completed, between 0 and 1."]}),`
`,e.jsx(t.h2,{id:"step-states",children:"Step States"}),`
`,e.jsxs(t.p,{children:["Set the ",e.jsx(t.code,{children:"state"}),` property on each step to communicate its position in the process. The state controls
the marker treatment:`]}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"State"}),e.jsx(t.th,{children:"Marker"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"not-started"})}),e.jsx(t.td,{children:"Dashed outline"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"current"})}),e.jsx(t.td,{children:"Partially filled"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"in-progress"})}),e.jsx(t.td,{children:"Partially filled"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"completed"})}),e.jsx(t.td,{children:"Filled with a check icon"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"optional"})}),e.jsx(t.td,{children:"Dashed outline"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"skipped"})}),e.jsx(t.td,{children:"Dashed outline"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"disabled"})}),e.jsx(t.td,{children:"Dashed outline, reduced opacity"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"waiting"})}),e.jsx(t.td,{children:"Dashed outline"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"blocked"})}),e.jsx(t.td,{children:"Error outline with an exclamation icon"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"error"})}),e.jsx(t.td,{children:"Error outline with an exclamation icon"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"requires-attention"})}),e.jsx(t.td,{children:"Error outline with an exclamation icon"})]})]})]}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:"description"})," property for supporting text under the label, such as ",e.jsx(t.code,{children:"Optional"}),` or the reason
a step is invalid.`]}),`
`,e.jsx(s,{of:j}),`
`,e.jsxs(t.p,{children:["To replace a generated marker entirely, provide your own content in the step's ",e.jsx(t.code,{children:"marker"})," slot."]}),`
`,e.jsx(t.h2,{id:"step-numbers",children:"Step Numbers"}),`
`,e.jsxs(t.p,{children:["Markers are empty by default. Set ",e.jsx(t.code,{children:"numbered"}),` on the stepper to display each step's number inside its
marker. Steps that render an icon marker, such as completed and error steps, continue to show the
icon rather than a number.`]}),`
`,e.jsx(s,{of:m}),`
`,e.jsx(t.h2,{id:"titles",children:"Titles"}),`
`,e.jsxs(t.p,{children:[`The stepper does not render a title of its own. Place a heading at the appropriate level for the
surrounding page before the stepper, and reference it with `,e.jsx(t.code,{children:"aria-labelledby"}),` so the list is named
after it:`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<h3 id="record-progress-title" class="forge-typography--subheading1">Record progress</h3>
<forge-process-stepper aria-labelledby="record-progress-title">...</forge-process-stepper>
`})}),`
`,e.jsx(s,{of:u}),`
`,e.jsx(t.h2,{id:"meta-content",children:"Meta Content"}),`
`,e.jsxs(t.p,{children:["Use a step's ",e.jsx(t.code,{children:"meta"}),` slot for supporting information such as dates or the assigned user. The slot
lays its content out in two columns, so pass a label and a value as separate children to keep values
aligned down the step:`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<forge-process-step state="completed">
  Verbal warning
  <span slot="meta">Started:</span>
  <span slot="meta">01/15/2026</span>
  <span slot="meta">Completed:</span>
  <span slot="meta">01/15/2026</span>
</forge-process-step>
`})}),`
`,e.jsx(t.p,{children:"A single child per row, such as a lone date, occupies the first column."}),`
`,e.jsx(s,{of:g}),`
`,e.jsx(t.h2,{id:"step-content-and-actions",children:"Step Content and Actions"}),`
`,e.jsxs(t.p,{children:["Content placed in a step's ",e.jsx(t.code,{children:"additional-content"}),` slot renders under its meta content, and content in
the `,e.jsx(t.code,{children:"actions"}),` slot renders at the end of the step. Use these slots to let users complete a step in place with
checkboxes, inline form fields, or buttons. Not every step needs content or actions.`]}),`
`,e.jsxs(t.p,{children:["Slotted ",e.jsx(t.code,{children:"<forge-checkbox>"}),", ",e.jsx(t.code,{children:"<forge-radio>"}),", and ",e.jsx(t.code,{children:"<forge-switch>"}),` controls are pulled back by
`,e.jsx(t.code,{children:"--forge-process-step-control-inset"}),` so their visible box lines up with the step's text column
rather than the inset edge of their state layer. Set that property to `,e.jsx(t.code,{children:"0"})," to opt out."]}),`
`,e.jsx(s,{of:f}),`
`,e.jsx(t.h2,{id:"validation-messaging",children:"Validation Messaging"}),`
`,e.jsxs(t.p,{children:["Place validation or warning messaging, such as a ",e.jsx(t.code,{children:"<forge-inline-message>"}),`, in a step's
`,e.jsx(t.code,{children:"additional-content"})," slot."]}),`
`,e.jsx(s,{of:b}),`
`,e.jsx(t.h2,{id:"interactive-steps",children:"Interactive Steps"}),`
`,e.jsx(t.p,{children:`A stepper is read-only by default: a step whose label is plain text simply reports progress. Put a
link or a button in the label to make that step actionable, and the stepper becomes interactive
without a separate variant or attribute.`}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<!-- read-only: reports progress -->
<forge-process-step state="current">Internal review</forge-process-step>

<!-- interactive: navigates -->
<forge-process-step state="completed"><a href="/cart">Cart</a></forge-process-step>

<!-- interactive: performs an action -->
<forge-process-step state="current"><button>Suspension</button></forge-process-step>
`})}),`
`,e.jsxs(t.p,{children:[`Use a link when activating the step navigates, so it keeps the browser behaviour users expect from
a link, and a button when it performs an action in place. A slotted link takes precedence if both
are present. The step reports its state through the read-only `,e.jsx(t.code,{children:"interactive"}),` property, and slotted
controls are reset so the label still reads as text.`]}),`
`,e.jsxs(t.p,{children:["Only the label slot is considered, so a button in the ",e.jsx(t.code,{children:"actions"})," or ",e.jsx(t.code,{children:"additional-content"}),` slots does
not make the step itself interactive. Set `,e.jsx(t.code,{children:"noninteractive"}),` on a step to opt out of the behaviour
entirely.`]}),`
`,e.jsxs(t.p,{children:["Activating an interactive step dispatches a ",e.jsx(t.code,{children:"forge-process-step-select"}),` event from the step and a
`,e.jsx(t.code,{children:"change"})," event from the stepper. Read the activated step from the stepper's ",e.jsx(t.code,{children:"selectedStep"}),`
property:`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-typescript",children:`stepper.addEventListener('change', (event: Event) => {
  const { selectedStep } = event.target as ProcessStepperComponent;
});
`})}),`
`,e.jsxs(t.p,{children:["Because the interactive area is the consumer's own link or button, steps are reachable with ",e.jsx(t.code,{children:"Tab"}),`
and activate with the keys native to that element. A `,e.jsx(t.code,{children:"<forge-focus-indicator>"}),` draws the focus ring
around the label text only, so keyboard focus never outlines the progress line, the label's full
cell, or the step's content, and a `,e.jsx(t.code,{children:"<forge-state-layer>"})," fills the same area on hover and press."]}),`
`,e.jsxs(t.p,{children:[`The ring sits 4px from the label along the inline axis and 2px along the block axis, with rounded
corners. It is a standard focus indicator, so its tokens can be overridden through the
`,e.jsx(t.code,{children:"focus-indicator"})," part:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-css",children:`forge-process-step::part(focus-indicator) {
  --forge-focus-indicator-shape: 8px;
}
`})}),`
`,e.jsx(t.p,{children:`The ring's outline is painted outside its offset, so every gap around the label has to accommodate
the offset plus the outline width for the ring never to touch its neighbours. Three gaps do that
work, and each leaves at least 4px of visible clearance by default:`}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Gap"}),e.jsx(t.th,{children:"Separates the label from"}),e.jsx(t.th,{children:"Default"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"--forge-process-step-sidebar-gap"})}),e.jsx(t.td,{children:"the marker, when vertical"}),e.jsx(t.td,{children:e.jsx(t.code,{children:"12px"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"--forge-process-step-marker-label-gap"})}),e.jsx(t.td,{children:"the marker, when horizontal"}),e.jsx(t.td,{children:e.jsx(t.code,{children:"8px"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"--forge-process-step-label-content-gap"})}),e.jsx(t.td,{children:"the description and content"}),e.jsx(t.td,{children:e.jsx(t.code,{children:"8px"})})]})]})]}),`
`,e.jsx(t.p,{children:`Raising the focus indicator's offset past the gap that separates the label from a neighbour will
make a focused label overlap it, so raise the corresponding gap to match.`}),`
`,e.jsx(s,{of:v}),`
`,e.jsx(t.p,{children:`Interactive steps work the same way in the vertical orientation, where a link or button label sits
beside its marker rather than beneath it.`}),`
`,e.jsx(s,{of:w}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(d,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.p,{children:["Process steppers are rendered as semantic lists with ",e.jsx(t.code,{children:'role="list"'}),` on the stepper and
`,e.jsx(t.code,{children:'role="listitem"'}),` on each step. Each step reports its position and the number of steps, and
`,e.jsx(t.code,{children:'aria-current="step"'})," when in the ",e.jsx(t.code,{children:"current"}),` state. State markers are decorative and marked
`,e.jsx(t.code,{children:'aria-hidden="true"'}),"."]}),`
`,e.jsxs(t.p,{children:["When a stepper only shows part of a longer process, set ",e.jsx(t.code,{children:"aria-posinset"})," and ",e.jsx(t.code,{children:"aria-setsize"}),` on each
step. They take precedence over the step's position in the DOM for the accessibility tree, the
number shown in the marker, and progress announcements.`]}),`
`,e.jsx(t.p,{children:`Each step is a single list item. The interactive area of a clickable step is the consumer's own link
or button, and a step's description, meta content, and slotted content are siblings of it rather
than nested inside it, so interactive content keeps its own semantics.`}),`
`,e.jsx(t.h3,{id:"progress-announcements",children:"Progress Announcements"}),`
`,e.jsxs(t.p,{children:[`Steps announce the position a process has moved to through the shared Forge live announcer, for
example "Step 3 of 5: Internal review". A step announces whenever it moves into the `,e.jsx(t.code,{children:"current"}),` state,
including when a consumer advances the process programmatically, and stays silent on the initial
render so a screen reader is not interrupted when the page loads.`]}),`
`,e.jsx(t.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[`Because the marker is decorative, never rely on it alone to communicate state. Give steps whose
state is not obvious from the label a `,e.jsx(t.code,{children:"description"}),", or a message in the ",e.jsx(t.code,{children:"message"})," slot"]}),`
`,e.jsx(t.li,{children:`Make a step interactive with a link when it navigates and a button when it acts, so it carries the
right semantics and keyboard behaviour for what it does`}),`
`,e.jsxs(t.li,{children:["Provide a heading in the ",e.jsx(t.code,{children:"title"})," slot at the correct level for the surrounding page"]}),`
`,e.jsxs(t.li,{children:["Interactive content placed in the ",e.jsx(t.code,{children:"actions"})," or ",e.jsx(t.code,{children:"additional-content"}),` slots keeps its own semantics
and focus behavior, so label it as you would anywhere else`]}),`
`]})]})}function ke(n={}){const{wrapper:t}={...i(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(r,{...n})}):r(n)}export{ke as default};
