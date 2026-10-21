import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-Bcs6hT4V.js";import{n as c,o as l,t as u}from"./CustomArgTypes-3XqZyV8V.js";import{a as d,c as f,i as p,l as m,n as h,o as g,r as _,s as v,t as y,u as b}from"./ProcessStepper.stories-BvC1ObzE.js";function x(e){let n={code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(s,{of:d}),`
`,`
`,(0,C.jsx)(`style`,{children:`
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
`,(0,C.jsx)(o,{}),`
`,(0,C.jsx)(n.p,{children:`Process steppers show where a user is within a multi-step process. Additional details and subtasks
may be presented directly within each step.`}),`
`,(0,C.jsx)(a,{of:y}),`
`,(0,C.jsx)(n.h2,{id:`orientation`,children:`Orientation`}),`
`,(0,C.jsxs)(n.p,{children:[`Process steppers are vertical by default, which gives each step room for details and
interactive content. Set `,(0,C.jsx)(n.code,{children:`orientation`}),` to `,(0,C.jsx)(n.code,{children:`horizontal`}),` for compact, progress-oriented
processes where steps are distributed evenly across the available width.`]}),`
`,(0,C.jsx)(a,{of:_}),`
`,(0,C.jsx)(n.h3,{id:`responsive-layout`,children:`Responsive Layout`}),`
`,(0,C.jsx)(n.p,{children:`A horizontal stepper has no room for legible labels side by side in a small container — four steps
in a 360px container leaves roughly 48px each. Below 600px of available width, a horizontal stepper
therefore lays its steps out vertically, which gives every label and its details the width it needs.
The progress line stays visible as a vertical rail.`}),`
`,(0,C.jsxs)(n.p,{children:[`The switch is driven by the stepper's own width rather than the viewport, so a stepper inside a
narrow column adapts too. The `,(0,C.jsx)(n.code,{children:`orientation`}),` attribute is unchanged; the read-only `,(0,C.jsx)(n.code,{children:`compact`}),` property
reports whether the compact layout is active. A stepper that is already vertical never changes.`]}),`
`,(0,C.jsx)(n.h2,{id:`step-states`,children:`Step States`}),`
`,(0,C.jsxs)(n.p,{children:[`Set the `,(0,C.jsx)(n.code,{children:`state`}),` property on each step to communicate its position in the process. The state controls
the marker treatment:`]}),`
`,(0,C.jsxs)(n.table,{children:[(0,C.jsx)(n.thead,{children:(0,C.jsxs)(n.tr,{children:[(0,C.jsx)(n.th,{children:`State`}),(0,C.jsx)(n.th,{children:`Marker`})]})}),(0,C.jsxs)(n.tbody,{children:[(0,C.jsxs)(n.tr,{children:[(0,C.jsx)(n.td,{children:(0,C.jsx)(n.code,{children:`not-started`})}),(0,C.jsx)(n.td,{children:`Dashed outline`})]}),(0,C.jsxs)(n.tr,{children:[(0,C.jsx)(n.td,{children:(0,C.jsx)(n.code,{children:`current`})}),(0,C.jsx)(n.td,{children:`Filled with a check icon, and the step is the current step in the process`})]}),(0,C.jsxs)(n.tr,{children:[(0,C.jsx)(n.td,{children:(0,C.jsx)(n.code,{children:`in-progress`})}),(0,C.jsx)(n.td,{children:`Partially filled`})]}),(0,C.jsxs)(n.tr,{children:[(0,C.jsx)(n.td,{children:(0,C.jsx)(n.code,{children:`completed`})}),(0,C.jsx)(n.td,{children:`Filled with a check icon`})]}),(0,C.jsxs)(n.tr,{children:[(0,C.jsx)(n.td,{children:(0,C.jsx)(n.code,{children:`critical`})}),(0,C.jsx)(n.td,{children:`Error outline with an exclamation icon`})]})]})]}),`
`,(0,C.jsx)(a,{of:v}),`
`,(0,C.jsx)(n.h3,{id:`progress-track`,children:`Progress Track`}),`
`,(0,C.jsx)(n.p,{children:`The progress track appears to the left of a vertical process stepper or above a horizontal process
stepper, indicating the user's current position in the process. Each step up to and including the
step with the "current" state has its portion of the track filled. If no step is marked current the
track remains entirely unfilled.`}),`
`,(0,C.jsx)(n.h3,{id:`disabled-steps`,children:`Disabled Steps`}),`
`,(0,C.jsxs)(n.p,{children:[`Set the `,(0,C.jsx)(n.code,{children:`disabled`}),` property on a step to dim it and prevent interaction.`]}),`
`,(0,C.jsx)(a,{of:h}),`
`,(0,C.jsx)(n.h3,{id:`support-text`,children:`Support Text`}),`
`,(0,C.jsxs)(n.p,{children:[`Use the `,(0,C.jsx)(n.code,{children:`support text`}),` slot for additional context under the label, such as `,(0,C.jsx)(n.code,{children:`Optional`}),` or a short
description of of the error on an invalid step.`]}),`
`,(0,C.jsx)(n.h3,{id:`custom-markers`,children:`Custom Markers`}),`
`,(0,C.jsxs)(n.p,{children:[`To replace a generated marker entirely, provide your own content in the step's `,(0,C.jsx)(n.code,{children:`marker`}),` slot.`]}),`
`,(0,C.jsx)(n.h2,{id:`step-numbers`,children:`Step Numbers`}),`
`,(0,C.jsxs)(n.p,{children:[`Markers render only an icon by default. Set `,(0,C.jsx)(n.code,{children:`numbered`}),` on the stepper to display each step's number
inside its marker. Steps that render a filled icon, such as completed and critical steps, continue
to show the icon rather than a number.`]}),`
`,(0,C.jsx)(a,{of:p}),`
`,(0,C.jsx)(n.h2,{id:`titles`,children:`Titles`}),`
`,(0,C.jsxs)(n.p,{children:[`The stepper does not render a title of its own. Place a heading at the appropriate level for the
surrounding page before the stepper, and reference it with `,(0,C.jsx)(n.code,{children:`aria-labelledby`}),` so the list is named
after it:`]}),`
`,(0,C.jsx)(n.pre,{children:(0,C.jsx)(n.code,{className:`language-html`,children:`<h3 id="record-progress-title" class="forge-typography--subheading1">Record progress</h3>
<forge-process-stepper aria-labelledby="record-progress-title">...</forge-process-stepper>
`})}),`
`,(0,C.jsx)(a,{of:m}),`
`,(0,C.jsx)(n.h2,{id:`details`,children:`Details`}),`
`,(0,C.jsxs)(n.p,{children:[`Use a step's `,(0,C.jsx)(n.code,{children:`detail`}),` slot for supporting information such as dates or the assigned user. The
`,(0,C.jsx)(n.code,{children:`detail`}),` slot may also contain subtasks or related actions.`]}),`
`,(0,C.jsx)(a,{of:f}),`
`,(0,C.jsx)(n.h2,{id:`interactive-steps`,children:`Interactive Steps`}),`
`,(0,C.jsxs)(n.p,{children:[`Every step renders a button in its shadow DOM, with the slotted label as its content. Set `,(0,C.jsx)(n.code,{children:`href`}),` on a
step to render a link instead.`]}),`
`,(0,C.jsx)(n.pre,{children:(0,C.jsx)(n.code,{className:`language-html`,children:`<!-- Performs an action -->
<forge-process-step state="current">Suspension</forge-process-step>

<!-- Navigates -->
<forge-process-step state="completed" href="/cart">Cart</forge-process-step>
`})}),`
`,(0,C.jsxs)(n.p,{children:[`Use `,(0,C.jsx)(n.code,{children:`href`}),` when activating the step navigates, so it keeps the browser behaviour users expect from
a link, and leave it unset when the step performs an action in place. Set `,(0,C.jsx)(n.code,{children:`disabled`}),` to dim the step
and prevent interaction. A disabled link is rendered without its `,(0,C.jsx)(n.code,{children:`href`}),` and with `,(0,C.jsx)(n.code,{children:`aria-disabled="true"`}),`.`]}),`
`,(0,C.jsxs)(n.p,{children:[`Only the default slot is placed in the button or link, so a button in the `,(0,C.jsx)(n.code,{children:`details`}),` slot does not
make the step itself interactive.`]}),`
`,(0,C.jsxs)(n.p,{children:[`Activating a step dispatches a `,(0,C.jsx)(n.code,{children:`forge-process-step-select`}),` event from the step and a
`,(0,C.jsx)(n.code,{children:`change`}),` event from the stepper. Read the activated step from the stepper's `,(0,C.jsx)(n.code,{children:`selectedStep`}),`
property:`]}),`
`,(0,C.jsx)(n.pre,{children:(0,C.jsx)(n.code,{className:`language-typescript`,children:`stepper.addEventListener('change', (event: Event) => {
  const { selectedStep } = event.target as ProcessStepperComponent;
});
`})}),`
`,(0,C.jsx)(n.h2,{id:`read-only`,children:`Read Only`}),`
`,(0,C.jsxs)(n.p,{children:[`Set `,(0,C.jsx)(n.code,{children:`readonly`}),` on the stepper to use it as a non-interactive indicator of progress. Steps in a
read-only stepper render only their label, without a button or link, so they are not focusable and
cannot be activated. `,(0,C.jsx)(n.code,{children:`href`}),` and `,(0,C.jsx)(n.code,{children:`disabled`}),` have no visible effect on a read-only step.`]}),`
`,(0,C.jsx)(a,{of:g}),`
`,(0,C.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,C.jsx)(u,{}),`
`,(0,C.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,C.jsxs)(n.p,{children:[`Process steppers are rendered as semantic lists with `,(0,C.jsx)(n.code,{children:`role="list"`}),` on the stepper and
`,(0,C.jsx)(n.code,{children:`role="listitem"`}),` on each step. Each step reports its position and the number of steps, and
`,(0,C.jsx)(n.code,{children:`aria-current="step"`}),` when its state is `,(0,C.jsx)(n.code,{children:`current`}),`. State markers are decorative and marked
`,(0,C.jsx)(n.code,{children:`aria-hidden="true"`}),`.`]}),`
`,(0,C.jsxs)(n.p,{children:[`When a stepper only shows part of a longer process, set `,(0,C.jsx)(n.code,{children:`aria-posinset`}),` and `,(0,C.jsx)(n.code,{children:`aria-setsize`}),` on each
step. They take precedence over the step's position in the DOM for the accessibility tree, the
number shown in the marker, and progress announcements.`]}),`
`,(0,C.jsx)(n.p,{children:`Each step is a single list item. The interactive area of a step is a native button or link, and a
step's details content is a sibling of it rather than nested inside it, so interactive content keeps
its own semantics.`}),`
`,(0,C.jsx)(n.h3,{id:`progress-announcements`,children:`Progress Announcements`}),`
`,(0,C.jsxs)(n.p,{children:[`Steps announce the position a process has moved to through the shared Forge live announcer, for
example "Step 3 of 5: Internal review". A step announces whenever its state is set to `,(0,C.jsx)(n.code,{children:`current`}),`,
including when a consumer advances the process programmatically, and stays silent on the initial
render so a screen reader is not interrupted when the page loads.`]}),`
`,(0,C.jsx)(n.h3,{id:`best-practices`,children:`Best Practices`}),`
`,(0,C.jsxs)(n.ul,{children:[`
`,(0,C.jsxs)(n.li,{children:[`Because the marker is decorative, never rely on it alone to communicate state. Give steps whose
state is not obvious from the label supporting text in the `,(0,C.jsx)(n.code,{children:`details`}),` slot`]}),`
`,(0,C.jsxs)(n.li,{children:[`Set `,(0,C.jsx)(n.code,{children:`href`}),` when a step navigates and leave it unset when it acts, so it carries the
right semantics and keyboard behaviour for what it does`]}),`
`,(0,C.jsxs)(n.li,{children:[`Provide a heading alongside the process stepper and asssociate it with the stepper using
`,(0,C.jsx)(n.code,{children:`aria-labelledby`})]}),`
`,(0,C.jsxs)(n.li,{children:[`Interactive content placed in the `,(0,C.jsx)(n.code,{children:`details`}),` slot keeps its own semantics
and focus behavior, so label it as you would anywhere else`]}),`
`]})]})}function S(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,C.jsx)(n,{...e,children:(0,C.jsx)(x,{...e})}):x(e)}var C;function w(){return(w=e((()=>{C=r(),n(),i(),c(),l(),b()})))()}w();export{S as default};