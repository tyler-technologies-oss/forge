import"./service-adapter-8tADcN_b.js";import"./button-DH6t8nYG.js";import"./checkbox-B-mT5VdM.js";import{b as e}from"./iframe-3UUTJgvy.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./inline-message-BKecgmUf.js";import"./process-stepper-BB2stbFs.js";import{s,g as w,d as P}from"./utils-BUwrw5lO.js";const{action:h}=__STORYBOOK_MODULE_ACTIONS__,b=h("change"),S=h("forge-process-step-select"),u="forge-process-stepper",A={title:"Components/Process Stepper",tags:["new"],render:v=>{const d=document.createElement("forge-process-stepper");return P(d,v),[{label:"Application received",state:"completed"},{label:"Fees paid",state:"completed"},{label:"Internal review",state:"current"},{label:"Documents approved",state:"not-started"},{label:"Record issued",state:"not-started"}].forEach(({label:y,state:x})=>{const m=document.createElement("forge-process-step");m.textContent=y,m.state=x,d.appendChild(m)}),d},component:u,subcomponents:{"Process Step":"forge-process-step"},argTypes:{...w({tagName:u,exclude:["steps","compact","progress"]})},parameters:{docs:{toc:{headingSelector:"h2,h3"}}},args:{orientation:"vertical",numbered:!1}},r={},o={...s,render:()=>e`
    <forge-process-stepper orientation="horizontal">
      <forge-process-step state="completed">1. Cart</forge-process-step>
      <forge-process-step state="current">2. Shipping</forge-process-step>
      <forge-process-step>3. Payment</forge-process-step>
      <forge-process-step>4. Review</forge-process-step>
    </forge-process-stepper>
  `},t={...s,render:()=>e`
    <forge-process-stepper orientation="horizontal">
      <forge-process-step state="completed" description="Optional">First step</forge-process-step>
      <forge-process-step state="current">Second step</forge-process-step>
      <forge-process-step>Third step</forge-process-step>
      <forge-process-step state="error" description="Example invalid step">Fourth step</forge-process-step>
      <forge-process-step>Fifth step</forge-process-step>
    </forge-process-stepper>
  `},p={...s,render:()=>e`
    <h3 id="record-progress-title" class="forge-typography--subheading1">Record progress</h3>
    <forge-process-stepper orientation="horizontal" numbered aria-labelledby="record-progress-title">
      <forge-process-step state="completed">
        Application received
        <span slot="meta">Jul 17, 2026</span>
      </forge-process-step>
      <forge-process-step state="completed">Fees paid</forge-process-step>
      <forge-process-step state="completed">Internal review</forge-process-step>
      <forge-process-step>Documents approved</forge-process-step>
      <forge-process-step>Record issued</forge-process-step>
    </forge-process-stepper>
  `},n={...s,render:()=>e`
    <forge-process-stepper numbered>
      <forge-process-step state="completed">
        Application received
        <span slot="meta">Jul 17, 2026</span>
      </forge-process-step>
      <forge-process-step state="completed">Fees paid</forge-process-step>
      <forge-process-step state="completed">Internal review</forge-process-step>
      <forge-process-step>Documents approved</forge-process-step>
      <forge-process-step>Record issued</forge-process-step>
    </forge-process-stepper>
  `},a={...s,render:()=>e`
    <h3 id="stage-progress-title" class="forge-typography--subheading1">Stage progress</h3>
    <forge-process-stepper aria-labelledby="stage-progress-title">
      <forge-process-step state="completed">
        Verbal warning
        <span slot="meta">Started:</span>
        <span slot="meta">01/15/2026</span>
        <span slot="meta">Completed:</span>
        <span slot="meta">01/15/2026</span>
      </forge-process-step>
      <forge-process-step state="current">
        Suspension
        <span slot="meta">Started:</span>
        <span slot="meta">02/03/2026</span>
        <forge-checkbox slot="additional-content"><label>Issue suspension notice</label></forge-checkbox>
        <forge-checkbox slot="additional-content"><label>Schedule meeting with union rep</label></forge-checkbox>
        <forge-checkbox slot="additional-content"><label>Document meeting notes</label></forge-checkbox>
        <forge-button slot="actions" variant="outlined">Advance to next stage</forge-button>
      </forge-process-step>
      <forge-process-step>Termination review</forge-process-step>
    </forge-process-stepper>
  `},c={...s,render:()=>e`
    <forge-process-stepper>
      <forge-process-step state="completed">Submit documents</forge-process-step>
      <forge-process-step state="error">
        Plan review
        <forge-inline-message slot="additional-content" theme="error">Two required documents are missing.</forge-inline-message>
      </forge-process-step>
      <forge-process-step>Permit issued</forge-process-step>
    </forge-process-stepper>
  `},g={...s,render:()=>e`
    <forge-process-stepper orientation="horizontal" @change=${b} @forge-process-step-select=${S}>
      <forge-process-step state="completed"><button>Cart</button></forge-process-step>
      <forge-process-step state="current"><button>Shipping</button></forge-process-step>
      <forge-process-step><button>Payment</button></forge-process-step>
      <forge-process-step><button>Review</button></forge-process-step>
    </forge-process-stepper>
  `},i={...s,render:()=>e`
    <forge-process-stepper @change=${b} @forge-process-step-select=${S}>
      <forge-process-step state="completed"><a href="#application">Application received</a></forge-process-step>
      <forge-process-step state="current" description="Assigned to J. Rivera"><a href="#review">Internal review</a></forge-process-step>
      <forge-process-step><a href="#inspection">Site inspection</a></forge-process-step>
      <forge-process-step><a href="#decision">Decision</a></forge-process-step>
    </forge-process-stepper>
  `},l={...s,render:()=>e`
    <forge-process-stepper orientation="horizontal" numbered>
      <forge-process-step state="completed">Application received</forge-process-step>
      <forge-process-step state="current">Internal review</forge-process-step>
      <forge-process-step>Documents approved</forge-process-step>
      <forge-process-step>Record issued</forge-process-step>
    </forge-process-stepper>
  `},f={...s,render:()=>e`
    <div style="max-inline-size: 360px">
      <forge-process-stepper orientation="horizontal" numbered>
        <forge-process-step state="completed">Cart</forge-process-step>
        <forge-process-step state="completed">Shipping</forge-process-step>
        <forge-process-step state="current">
          Payment
          <span slot="meta">Started:</span>
          <span slot="meta">02/03/2026</span>
          <forge-checkbox slot="additional-content"><label>Save this card</label></forge-checkbox>
          <forge-button slot="actions" variant="outlined">Advance to next stage</forge-button>
        </forge-process-step>
        <forge-process-step>Review</forge-process-step>
      </forge-process-stepper>
    </div>
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
    <forge-process-stepper orientation="horizontal">
      <forge-process-step state="completed" description="Optional">First step</forge-process-step>
      <forge-process-step state="current">Second step</forge-process-step>
      <forge-process-step>Third step</forge-process-step>
      <forge-process-step state="error" description="Example invalid step">Fourth step</forge-process-step>
      <forge-process-step>Fifth step</forge-process-step>
    </forge-process-stepper>
  \`
}`,...t.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <h3 id="record-progress-title" class="forge-typography--subheading1">Record progress</h3>
    <forge-process-stepper orientation="horizontal" numbered aria-labelledby="record-progress-title">
      <forge-process-step state="completed">
        Application received
        <span slot="meta">Jul 17, 2026</span>
      </forge-process-step>
      <forge-process-step state="completed">Fees paid</forge-process-step>
      <forge-process-step state="completed">Internal review</forge-process-step>
      <forge-process-step>Documents approved</forge-process-step>
      <forge-process-step>Record issued</forge-process-step>
    </forge-process-stepper>
  \`
}`,...p.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-process-stepper numbered>
      <forge-process-step state="completed">
        Application received
        <span slot="meta">Jul 17, 2026</span>
      </forge-process-step>
      <forge-process-step state="completed">Fees paid</forge-process-step>
      <forge-process-step state="completed">Internal review</forge-process-step>
      <forge-process-step>Documents approved</forge-process-step>
      <forge-process-step>Record issued</forge-process-step>
    </forge-process-stepper>
  \`
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <h3 id="stage-progress-title" class="forge-typography--subheading1">Stage progress</h3>
    <forge-process-stepper aria-labelledby="stage-progress-title">
      <forge-process-step state="completed">
        Verbal warning
        <span slot="meta">Started:</span>
        <span slot="meta">01/15/2026</span>
        <span slot="meta">Completed:</span>
        <span slot="meta">01/15/2026</span>
      </forge-process-step>
      <forge-process-step state="current">
        Suspension
        <span slot="meta">Started:</span>
        <span slot="meta">02/03/2026</span>
        <forge-checkbox slot="additional-content"><label>Issue suspension notice</label></forge-checkbox>
        <forge-checkbox slot="additional-content"><label>Schedule meeting with union rep</label></forge-checkbox>
        <forge-checkbox slot="additional-content"><label>Document meeting notes</label></forge-checkbox>
        <forge-button slot="actions" variant="outlined">Advance to next stage</forge-button>
      </forge-process-step>
      <forge-process-step>Termination review</forge-process-step>
    </forge-process-stepper>
  \`
}`,...a.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-process-stepper>
      <forge-process-step state="completed">Submit documents</forge-process-step>
      <forge-process-step state="error">
        Plan review
        <forge-inline-message slot="additional-content" theme="error">Two required documents are missing.</forge-inline-message>
      </forge-process-step>
      <forge-process-step>Permit issued</forge-process-step>
    </forge-process-stepper>
  \`
}`,...c.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-process-stepper orientation="horizontal" @change=\${changeAction} @forge-process-step-select=\${selectAction}>
      <forge-process-step state="completed"><button>Cart</button></forge-process-step>
      <forge-process-step state="current"><button>Shipping</button></forge-process-step>
      <forge-process-step><button>Payment</button></forge-process-step>
      <forge-process-step><button>Review</button></forge-process-step>
    </forge-process-stepper>
  \`
}`,...g.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-process-stepper @change=\${changeAction} @forge-process-step-select=\${selectAction}>
      <forge-process-step state="completed"><a href="#application">Application received</a></forge-process-step>
      <forge-process-step state="current" description="Assigned to J. Rivera"><a href="#review">Internal review</a></forge-process-step>
      <forge-process-step><a href="#inspection">Site inspection</a></forge-process-step>
      <forge-process-step><a href="#decision">Decision</a></forge-process-step>
    </forge-process-stepper>
  \`
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-process-stepper orientation="horizontal" numbered>
      <forge-process-step state="completed">Application received</forge-process-step>
      <forge-process-step state="current">Internal review</forge-process-step>
      <forge-process-step>Documents approved</forge-process-step>
      <forge-process-step>Record issued</forge-process-step>
    </forge-process-stepper>
  \`
}`,...l.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="max-inline-size: 360px">
      <forge-process-stepper orientation="horizontal" numbered>
        <forge-process-step state="completed">Cart</forge-process-step>
        <forge-process-step state="completed">Shipping</forge-process-step>
        <forge-process-step state="current">
          Payment
          <span slot="meta">Started:</span>
          <span slot="meta">02/03/2026</span>
          <forge-checkbox slot="additional-content"><label>Save this card</label></forge-checkbox>
          <forge-button slot="actions" variant="outlined">Advance to next stage</forge-button>
        </forge-process-step>
        <forge-process-step>Review</forge-process-step>
      </forge-process-stepper>
    </div>
  \`
}`,...f.parameters?.docs?.source}}};const C=["Demo","Horizontal","States","WithTitle","WithMeta","WithStepContent","WithMessage","Interactive","InteractiveVertical","Numbered","Compact"],E=Object.freeze(Object.defineProperty({__proto__:null,Compact:f,Demo:r,Horizontal:o,Interactive:g,InteractiveVertical:i,Numbered:l,States:t,WithMessage:c,WithMeta:n,WithStepContent:a,WithTitle:p,__namedExportsOrder:C,default:A},Symbol.toStringTag,{value:"Module"}));export{f as C,r as D,o as H,g as I,l as N,E as P,t as S,p as W,n as a,a as b,c,i as d};
