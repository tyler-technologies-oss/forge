import"./service-adapter-8tADcN_b.js";import"./avatar-DosdD1FJ.js";import"./button-C0j7tAEZ.js";import"./checkbox-B1TSJwlE.js";import{b as e}from"./iframe-QHnGQDtP.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./inline-message-ZbUKeLM6.js";import"./process-stepper-G8j88njp.js";import"./label-value-C0-wovkK.js";import{s,g as y,d as h}from"./utils-BRc3IP6u.js";const{action:f}=__STORYBOOK_MODULE_ACTIONS__;f("change");f("forge-process-step-select");const d="forge-process-stepper",v={title:"Components/Process Stepper",tags:["new"],render:m=>{const g=document.createElement("forge-process-stepper");return h(g,m),[{label:"Application received",state:"completed"},{label:"Fees paid",state:"completed"},{label:"Internal review",state:"current"},{label:"Documents approved",state:"not-started"},{label:"Record issued",state:"not-started"}].forEach(({label:u,state:b})=>{const i=document.createElement("forge-process-step");i.textContent=u,i.state=b,g.appendChild(i)}),g},component:d,subcomponents:{"Process Step":"forge-process-step"},argTypes:{...y({tagName:d,exclude:["steps","selectedStep","compact","progress"]})},parameters:{docs:{toc:{headingSelector:"h2,h3"}}},args:{orientation:"vertical",numbered:!1,readonly:!1}},r={},o={...s,render:()=>e`
    <forge-process-stepper orientation="horizontal">
      <forge-process-step state="completed">1. Cart</forge-process-step>
      <forge-process-step state="current">2. Shipping</forge-process-step>
      <forge-process-step>3. Payment</forge-process-step>
      <forge-process-step>4. Review</forge-process-step>
    </forge-process-stepper>
  `},t={...s,render:()=>e`
    <forge-process-stepper>
      <forge-process-step state="current">Current</forge-process-step>
      <forge-process-step state="completed"> Completed </forge-process-step>
      <forge-process-step state="in-progress">In progress</forge-process-step>
      <forge-process-step state="not-started"
        >Not started
        <span slot="support-text">Optional</span>
      </forge-process-step>
      <forge-process-step state="critical">
        Critical
        <span slot="support-text">Error</span>
      </forge-process-step>
    </forge-process-stepper>
  `},p={...s,render:()=>e`
    <forge-process-stepper orientation="horizontal">
      <forge-process-step state="completed">Cart</forge-process-step>
      <forge-process-step state="current">Shipping</forge-process-step>
      <forge-process-step disabled>Payment</forge-process-step>
      <forge-process-step disabled>Review</forge-process-step>
    </forge-process-stepper>
  `},a={...s,render:()=>e`
    <h3 id="record-progress-title" class="forge-typography--subheading1">Record progress</h3>
    <forge-process-stepper orientation="horizontal" aria-labelledby="record-progress-title">
      <forge-process-step state="completed"> Application received </forge-process-step>
      <forge-process-step state="completed">Fees paid</forge-process-step>
      <forge-process-step state="completed">Internal review</forge-process-step>
      <forge-process-step state="current">Documents approved</forge-process-step>
      <forge-process-step>Record issued</forge-process-step>
    </forge-process-stepper>
  `},c={...s,render:()=>e`
    <forge-process-stepper>
      <forge-process-step state="completed">
        Application received
        <forge-label-value slot="detail" inline style="display: block;">
          <span slot="label">Received</span>
          <span slot="value">Jul 17, 2026</span>
        </forge-label-value>
        <forge-label-value slot="detail" inline style="display: block;">
          <span slot="label">Received by</span>
          <span slot="value">J. Rivera</span>
        </forge-label-value>
      </forge-process-step>
      <forge-process-step state="completed">
        Fees paid
        <forge-checkbox slot="detail" readonly style="display: block;">Subtask one</forge-checkbox>
        <forge-checkbox slot="detail" readonly style="display: block;">Subtask two</forge-checkbox>
        <forge-checkbox slot="detail" readonly style="display: block;">Subtask three</forge-checkbox>
      </forge-process-step>
      <forge-process-step state="completed">
        Internal review
        <forge-button slot="detail" variant="outlined">Review</forge-button>
      </forge-process-step>
      <forge-process-step state="current">Documents approved</forge-process-step>
      <forge-process-step>Record issued</forge-process-step>
    </forge-process-stepper>
  `},n={...s,render:()=>e`
    <forge-process-stepper orientation="horizontal" readonly>
      <forge-process-step state="completed">Cart</forge-process-step>
      <forge-process-step state="current">Shipping</forge-process-step>
      <forge-process-step>Payment</forge-process-step>
      <forge-process-step>Review</forge-process-step>
    </forge-process-stepper>
  `},l={...s,render:()=>e`
    <forge-process-stepper orientation="horizontal" numbered>
      <forge-process-step state="completed">Application received</forge-process-step>
      <forge-process-step state="current">Internal review</forge-process-step>
      <forge-process-step>Documents approved</forge-process-step>
      <forge-process-step>Record issued</forge-process-step>
    </forge-process-stepper>
  `};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-process-stepper orientation="horizontal">
      <forge-process-step state="completed">1. Cart</forge-process-step>
      <forge-process-step state="current">2. Shipping</forge-process-step>
      <forge-process-step>3. Payment</forge-process-step>
      <forge-process-step>4. Review</forge-process-step>
    </forge-process-stepper>
  \`
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-process-stepper>
      <forge-process-step state="current">Current</forge-process-step>
      <forge-process-step state="completed"> Completed </forge-process-step>
      <forge-process-step state="in-progress">In progress</forge-process-step>
      <forge-process-step state="not-started"
        >Not started
        <span slot="support-text">Optional</span>
      </forge-process-step>
      <forge-process-step state="critical">
        Critical
        <span slot="support-text">Error</span>
      </forge-process-step>
    </forge-process-stepper>
  \`
}`,...t.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-process-stepper orientation="horizontal">
      <forge-process-step state="completed">Cart</forge-process-step>
      <forge-process-step state="current">Shipping</forge-process-step>
      <forge-process-step disabled>Payment</forge-process-step>
      <forge-process-step disabled>Review</forge-process-step>
    </forge-process-stepper>
  \`
}`,...p.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <h3 id="record-progress-title" class="forge-typography--subheading1">Record progress</h3>
    <forge-process-stepper orientation="horizontal" aria-labelledby="record-progress-title">
      <forge-process-step state="completed"> Application received </forge-process-step>
      <forge-process-step state="completed">Fees paid</forge-process-step>
      <forge-process-step state="completed">Internal review</forge-process-step>
      <forge-process-step state="current">Documents approved</forge-process-step>
      <forge-process-step>Record issued</forge-process-step>
    </forge-process-stepper>
  \`
}`,...a.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-process-stepper>
      <forge-process-step state="completed">
        Application received
        <forge-label-value slot="detail" inline style="display: block;">
          <span slot="label">Received</span>
          <span slot="value">Jul 17, 2026</span>
        </forge-label-value>
        <forge-label-value slot="detail" inline style="display: block;">
          <span slot="label">Received by</span>
          <span slot="value">J. Rivera</span>
        </forge-label-value>
      </forge-process-step>
      <forge-process-step state="completed">
        Fees paid
        <forge-checkbox slot="detail" readonly style="display: block;">Subtask one</forge-checkbox>
        <forge-checkbox slot="detail" readonly style="display: block;">Subtask two</forge-checkbox>
        <forge-checkbox slot="detail" readonly style="display: block;">Subtask three</forge-checkbox>
      </forge-process-step>
      <forge-process-step state="completed">
        Internal review
        <forge-button slot="detail" variant="outlined">Review</forge-button>
      </forge-process-step>
      <forge-process-step state="current">Documents approved</forge-process-step>
      <forge-process-step>Record issued</forge-process-step>
    </forge-process-stepper>
  \`
}`,...c.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-process-stepper orientation="horizontal" readonly>
      <forge-process-step state="completed">Cart</forge-process-step>
      <forge-process-step state="current">Shipping</forge-process-step>
      <forge-process-step>Payment</forge-process-step>
      <forge-process-step>Review</forge-process-step>
    </forge-process-stepper>
  \`
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-process-stepper orientation="horizontal" numbered>
      <forge-process-step state="completed">Application received</forge-process-step>
      <forge-process-step state="current">Internal review</forge-process-step>
      <forge-process-step>Documents approved</forge-process-step>
      <forge-process-step>Record issued</forge-process-step>
    </forge-process-stepper>
  \`
}`,...l.parameters?.docs?.source}}};const S=["Demo","Horizontal","States","Disabled","WithTitle","WithDetails","Readonly","Numbered"],E=Object.freeze(Object.defineProperty({__proto__:null,Demo:r,Disabled:p,Horizontal:o,Numbered:l,Readonly:n,States:t,WithDetails:c,WithTitle:a,__namedExportsOrder:S,default:v},Symbol.toStringTag,{value:"Module"}));export{r as D,o as H,l as N,E as P,n as R,t as S,a as W,p as a,c as b};
