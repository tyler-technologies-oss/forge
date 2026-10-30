import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-B8S20_VI.js";import{_ as i,a,m as o,s}from"./utils-BifgMLEM.js";import{t as c}from"./button-I2ZLPCXL.js";import{n as l}from"./avatar-BowDWKXm.js";import{t as u}from"./checkbox-dbeaKJ_L.js";import{t as d}from"./inline-message-BmqUEiuD.js";import{t as f}from"./label-value-CLHu4LzX.js";import{t as p}from"./process-stepper-I-2M3szU.js";var m=t({Demo:()=>_,Disabled:()=>b,Horizontal:()=>v,Numbered:()=>w,Readonly:()=>C,States:()=>y,WithDetails:()=>S,WithTitle:()=>x,__namedExportsOrder:()=>T,default:()=>g}),h,g,_,v,y,b,x,S,C,w,T;function E(){return(E=e((()=>{l(),c(),u(),d(),p(),f(),r(),o(),h=`forge-process-stepper`,g={title:`Components/Process Stepper`,tags:[`new`],render:e=>{let t=document.createElement(`forge-process-stepper`);return a(t,e),[{label:`Application received`,state:`completed`},{label:`Fees paid`,state:`completed`},{label:`Internal review`,state:`current`},{label:`Documents approved`,state:`not-started`},{label:`Record issued`,state:`not-started`}].forEach(({label:e,state:n})=>{let r=document.createElement(`forge-process-step`);r.textContent=e,r.state=n,t.appendChild(r)}),t},component:h,subcomponents:{"Process Step":`forge-process-step`},argTypes:{...s({tagName:h,exclude:[`steps`,`selectedStep`,`compact`,`progress`]})},parameters:{docs:{toc:{headingSelector:`h2,h3`}}},args:{orientation:`vertical`,numbered:!1,readonly:!1}},_={},v={...i,render:()=>n`
    <forge-process-stepper orientation="horizontal">
      <forge-process-step state="completed">1. Cart</forge-process-step>
      <forge-process-step state="current">2. Shipping</forge-process-step>
      <forge-process-step>3. Payment</forge-process-step>
      <forge-process-step>4. Review</forge-process-step>
    </forge-process-stepper>
  `},y={...i,render:()=>n`
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
  `},b={...i,render:()=>n`
    <forge-process-stepper orientation="horizontal">
      <forge-process-step state="completed">Cart</forge-process-step>
      <forge-process-step state="current">Shipping</forge-process-step>
      <forge-process-step disabled>Payment</forge-process-step>
      <forge-process-step disabled>Review</forge-process-step>
    </forge-process-stepper>
  `},x={...i,render:()=>n`
    <h3 id="record-progress-title" class="forge-typography--subheading1">Record progress</h3>
    <forge-process-stepper orientation="horizontal" aria-labelledby="record-progress-title">
      <forge-process-step state="completed"> Application received </forge-process-step>
      <forge-process-step state="completed">Fees paid</forge-process-step>
      <forge-process-step state="completed">Internal review</forge-process-step>
      <forge-process-step state="current">Documents approved</forge-process-step>
      <forge-process-step>Record issued</forge-process-step>
    </forge-process-stepper>
  `},S={...i,render:()=>n`
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
  `},C={...i,render:()=>n`
    <forge-process-stepper orientation="horizontal" readonly>
      <forge-process-step state="completed">Cart</forge-process-step>
      <forge-process-step state="current">Shipping</forge-process-step>
      <forge-process-step>Payment</forge-process-step>
      <forge-process-step>Review</forge-process-step>
    </forge-process-stepper>
  `},w={...i,render:()=>n`
    <forge-process-stepper orientation="horizontal" numbered>
      <forge-process-step state="completed">Application received</forge-process-step>
      <forge-process-step state="current">Internal review</forge-process-step>
      <forge-process-step>Documents approved</forge-process-step>
      <forge-process-step>Record issued</forge-process-step>
    </forge-process-stepper>
  `},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-process-stepper orientation="horizontal">
      <forge-process-step state="completed">1. Cart</forge-process-step>
      <forge-process-step state="current">2. Shipping</forge-process-step>
      <forge-process-step>3. Payment</forge-process-step>
      <forge-process-step>4. Review</forge-process-step>
    </forge-process-stepper>
  \`
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-process-stepper orientation="horizontal">
      <forge-process-step state="completed">Cart</forge-process-step>
      <forge-process-step state="current">Shipping</forge-process-step>
      <forge-process-step disabled>Payment</forge-process-step>
      <forge-process-step disabled>Review</forge-process-step>
    </forge-process-stepper>
  \`
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-process-stepper orientation="horizontal" readonly>
      <forge-process-step state="completed">Cart</forge-process-step>
      <forge-process-step state="current">Shipping</forge-process-step>
      <forge-process-step>Payment</forge-process-step>
      <forge-process-step>Review</forge-process-step>
    </forge-process-stepper>
  \`
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-process-stepper orientation="horizontal" numbered>
      <forge-process-step state="completed">Application received</forge-process-step>
      <forge-process-step state="current">Internal review</forge-process-step>
      <forge-process-step>Documents approved</forge-process-step>
      <forge-process-step>Record issued</forge-process-step>
    </forge-process-stepper>
  \`
}`,...w.parameters?.docs?.source}}},T=[`Demo`,`Horizontal`,`States`,`Disabled`,`WithTitle`,`WithDetails`,`Readonly`,`Numbered`]})))()}export{m as a,S as c,w as i,x as l,b as n,C as o,v as r,y as s,_ as t,E as u};