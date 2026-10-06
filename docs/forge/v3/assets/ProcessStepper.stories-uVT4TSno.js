import"./service-adapter-8tADcN_b.js";import"./avatar-BD9OiFwz.js";import"./button-JBPpIXzS.js";import"./checkbox-C8C3ZEET.js";import{b as e}from"./iframe-OKJOnn65.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./inline-message-ZbUKeLM6.js";import"./process-stepper-DWmT4YH7.js";import"./label-value-C0-wovkK.js";import{s,g as b,d as y}from"./utils-DqCQojVn.js";const d="forge-process-stepper",h={title:"Components/Process Stepper",tags:["new"],render:f=>{const g=document.createElement("forge-process-stepper");return y(g,f),[{label:"Application received",state:"completed"},{label:"Fees paid",state:"completed"},{label:"Internal review",state:"current"},{label:"Documents approved",state:"not-started"},{label:"Record issued",state:"not-started"}].forEach(({label:m,state:u})=>{const i=document.createElement("forge-process-step");i.textContent=m,i.state=u,g.appendChild(i)}),g},component:d,subcomponents:{"Process Step":"forge-process-step"},argTypes:{...b({tagName:d,exclude:["steps","selectedStep","compact","progress"]})},parameters:{docs:{toc:{headingSelector:"h2,h3"}}},args:{orientation:"vertical",numbered:!1,readonly:!1}},r={},o={...s,render:()=>e`
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
}`,...l.parameters?.docs?.source}}};const v=["Demo","Horizontal","States","Disabled","WithTitle","WithDetails","Readonly","Numbered"],N=Object.freeze(Object.defineProperty({__proto__:null,Demo:r,Disabled:p,Horizontal:o,Numbered:l,Readonly:n,States:t,WithDetails:c,WithTitle:a,__namedExportsOrder:v,default:h},Symbol.toStringTag,{value:"Module"}));export{r as D,o as H,l as N,N as P,n as R,t as S,a as W,p as a,c as b};
