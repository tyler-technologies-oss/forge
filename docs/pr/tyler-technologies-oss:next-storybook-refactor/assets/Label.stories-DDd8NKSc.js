import{x as a}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{j as w}from"./index-Dh2cEqRr.js";import{I as S}from"./icon-V4IE3JYq.js";import"./label-D62slEY0.js";import"./index-Dh0vMUMR.js";import"./button-BDRrw9v7.js";import"./focus-indicator-By3BQe1w.js";import"./state-layer-b0IlkqgO.js";import"./button-toggle-group-D0JifxTm.js";import"./checkbox-BZl9IGGg.js";import"./icon-button-FC5ZAhze.js";import"./switch-DljXu9M_.js";import{s as I}from"./decorators-B79PnA5z.js";const L="forge-label";S.define(w);const O={title:"Components/Label",component:L,parameters:{controls:{disable:!0},actions:{disable:!0}}},e={render:()=>a`
      <forge-label for="my-checkbox">Label</forge-label>
      <forge-checkbox id="my-checkbox"></forge-checkbox>
    `},o={render:()=>a`
      <forge-label for="my-checkbox">
        <span>Label</span>
        <forge-checkbox id="my-checkbox"></forge-checkbox>
      </forge-label>
    `},r={render:()=>a`
      <forge-radio-group>
        <forge-label legend>Choose an option</forge-label>
        <forge-radio name="default">Option 1</forge-radio>
        <forge-radio name="default">Option 2</forge-radio>
        <forge-radio name="default">Option 3</forge-radio>
      </forge-radio-group>
    `},n={decorators:[I(`
    .grid {
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      width: fit-content;

      forge-label {
        width: 100%;
      }
    }
  `)],render:()=>a`
      <div class="grid">
        <forge-label for="one">Item One</forge-label>
        <forge-checkbox id="one"></forge-checkbox>
        <forge-label for="two">Item Two with a longer label</forge-label>
        <forge-checkbox id="two"></forge-checkbox>
        <forge-label for="three">Item Three</forge-label>
        <forge-checkbox id="three"></forge-checkbox>
        <forge-label for="four">Item Four</forge-label>
        <forge-checkbox id="four"></forge-checkbox>
        <forge-label for="five">Item 5</forge-label>
        <forge-checkbox id="five"></forge-checkbox>
      </div>
    `},t={decorators:[I(`
    .with-label {
      display: inline-flex;
      align-items: center;
      flex-direction: column;
    }
  `)],render:()=>a`
      <forge-label class="with-label">
        <forge-icon-button>
          <forge-icon name="settings"></forge-icon>
        </forge-icon-button>
        <span>Settings</span>
      </forge-label>
    `};var l,c,i;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => {
    return html\`
      <forge-label for="my-checkbox">Label</forge-label>
      <forge-checkbox id="my-checkbox"></forge-checkbox>
    \`;
  }
}`,...(i=(c=e.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var f,g,s;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => {
    return html\`
      <forge-label for="my-checkbox">
        <span>Label</span>
        <forge-checkbox id="my-checkbox"></forge-checkbox>
      </forge-label>
    \`;
  }
}`,...(s=(g=o.parameters)==null?void 0:g.docs)==null?void 0:s.source}}};var d,b,m;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => {
    return html\`
      <forge-radio-group>
        <forge-label legend>Choose an option</forge-label>
        <forge-radio name="default">Option 1</forge-radio>
        <forge-radio name="default">Option 2</forge-radio>
        <forge-radio name="default">Option 3</forge-radio>
      </forge-radio-group>
    \`;
  }
}`,...(m=(b=r.parameters)==null?void 0:b.docs)==null?void 0:m.source}}};var p,h,u;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  decorators: [storyStyles(\`
    .grid {
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      width: fit-content;

      forge-label {
        width: 100%;
      }
    }
  \`)],
  render: () => {
    return html\`
      <div class="grid">
        <forge-label for="one">Item One</forge-label>
        <forge-checkbox id="one"></forge-checkbox>
        <forge-label for="two">Item Two with a longer label</forge-label>
        <forge-checkbox id="two"></forge-checkbox>
        <forge-label for="three">Item Three</forge-label>
        <forge-checkbox id="three"></forge-checkbox>
        <forge-label for="four">Item Four</forge-label>
        <forge-checkbox id="four"></forge-checkbox>
        <forge-label for="five">Item 5</forge-label>
        <forge-checkbox id="five"></forge-checkbox>
      </div>
    \`;
  }
}`,...(u=(h=n.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};var x,k,y;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  decorators: [storyStyles(\`
    .with-label {
      display: inline-flex;
      align-items: center;
      flex-direction: column;
    }
  \`)],
  render: () => {
    return html\`
      <forge-label class="with-label">
        <forge-icon-button>
          <forge-icon name="settings"></forge-icon>
        </forge-icon-button>
        <span>Settings</span>
      </forge-label>
    \`;
  }
}`,...(y=(k=t.parameters)==null?void 0:k.docs)==null?void 0:y.source}}};const v=["IDAssociated","Nested","Legend","AlignedList","WithIconButton"],R=Object.freeze(Object.defineProperty({__proto__:null,AlignedList:n,IDAssociated:e,Legend:r,Nested:o,WithIconButton:t,__namedExportsOrder:v,default:O},Symbol.toStringTag,{value:"Module"}));export{n as A,e as I,R as L,o as N,t as W,r as a};
