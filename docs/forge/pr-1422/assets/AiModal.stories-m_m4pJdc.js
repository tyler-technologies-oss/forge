import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-CbV23-8Y.js";import{i,n as a,t as o}from"./ref-DZ35M6As.js";import{t as s}from"./ai-modal-CmoqeVCi.js";import{t as c}from"./button-5s54CFRd.js";var l=t({Demo:()=>p,__namedExportsOrder:()=>m,default:()=>f}),u,d,f,p,m;function h(){return(h=e((()=>{r(),o(),s(),c(),u=`forge-ai-modal`,d=n`<style>
  .modal-story-content {
    padding: var(--forge-spacing-large);
  }
  .modal-story-content :is(h3, p) {
    margin: 0 0 var(--forge-spacing-medium) 0;
  }
</style>`,f={title:`AI/Components/Containers/Modal`,render:e=>{let t=a();function r(){t.value?.open?t.value.close():t.value?.show()}return n`
      ${d}
      <forge-button variant="raised" @click=${r}>Show Modal</forge-button>
      <forge-ai-modal ${i(t)} .open=${e.open} label=${e.label}>
        <div class="modal-story-content">
          <h3>Modal Title</h3>
          <p>This is a basic modal dialog with some sample content.</p>
          <forge-button variant="outlined" @click=${()=>t.value?.close()}> Close Modal </forge-button>
        </div>
      </forge-ai-modal>
    `},component:u,argTypes:{open:{control:`boolean`},label:{control:`text`}},args:{open:!1,label:`AI Assistant`}},p={},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{}`,...p.parameters?.docs?.source}}},m=[`Demo`]})))()}export{p as n,h as r,l as t};