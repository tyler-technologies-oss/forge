import{x as t}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{m as w}from"./index-ByifSpfC.js";import{I as S}from"./icon-DHpZ4R73.js";import"./constants-DjE6emXm.js";import"./label-BzpargFq.js";import"./index-Dh0vMUMR.js";import"./button-CoZ69e4-.js";import"./focus-indicator-BpCDYqsq.js";import"./state-layer-DkOkOFSZ.js";import"./button-toggle-group-pGGDU2pF.js";import"./checkbox-Dsowcwzy.js";import"./icon-button-B5lcHsAP.js";import"./switch-DwfRMwQ7.js";import{s as l}from"./decorators-EVhofM2Q.js";const v="forge-label";S.define(w);const L={title:"Components/Label",component:v,decorators:[l(`
    .align {
      display: flex;
      align-items: center;
    }
  `)],parameters:{controls:{disable:!0},actions:{disable:!0}}},e={render:()=>t`
      <div class="align">
        <forge-label for="my-checkbox">Label</forge-label>
        <forge-checkbox id="my-checkbox"></forge-checkbox>
      </div>
    `},o={render:()=>t`
      <forge-label class="align">
        <span>Label</span>
        <forge-checkbox></forge-checkbox>
      </forge-label>
    `},r={render:()=>t`
      <forge-radio-group class="align">
        <forge-label legend>Choose an option</forge-label>
        <forge-radio name="default">Option 1</forge-radio>
        <forge-radio name="default">Option 2</forge-radio>
        <forge-radio name="default">Option 3</forge-radio>
      </forge-radio-group>
    `},n={decorators:[l(`
    .grid {
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      width: fit-content;

      forge-label {
        width: 100%;
      }
    }
  `)],render:()=>t`
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
    `},a={decorators:[l(`
    .with-label {
      display: inline-flex;
      align-items: center;
      flex-direction: column;
    }
  `)],render:()=>t`
      <forge-label class="with-label">
        <forge-icon-button>
          <forge-icon name="settings"></forge-icon>
        </forge-icon-button>
        <span>Settings</span>
      </forge-label>
    `};var i,c,s;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => {
    return html\`
      <div class="align">
        <forge-label for="my-checkbox">Label</forge-label>
        <forge-checkbox id="my-checkbox"></forge-checkbox>
      </div>
    \`;
  }
}`,...(s=(c=e.parameters)==null?void 0:c.docs)==null?void 0:s.source}}};var g,f,d;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => {
    return html\`
      <forge-label class="align">
        <span>Label</span>
        <forge-checkbox></forge-checkbox>
      </forge-label>
    \`;
  }
}`,...(d=(f=o.parameters)==null?void 0:f.docs)==null?void 0:d.source}}};var b,m,p;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => {
    return html\`
      <forge-radio-group class="align">
        <forge-label legend>Choose an option</forge-label>
        <forge-radio name="default">Option 1</forge-radio>
        <forge-radio name="default">Option 2</forge-radio>
        <forge-radio name="default">Option 3</forge-radio>
      </forge-radio-group>
    \`;
  }
}`,...(p=(m=r.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var u,h,x;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(x=(h=n.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var k,y,I;a.parameters={...a.parameters,docs:{...(k=a.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(I=(y=a.parameters)==null?void 0:y.docs)==null?void 0:I.source}}};const O=["IDAssociated","Nested","Legend","AlignedList","WithIconButton"],q=Object.freeze(Object.defineProperty({__proto__:null,AlignedList:n,IDAssociated:e,Legend:r,Nested:o,WithIconButton:a,__namedExportsOrder:O,default:L},Symbol.toStringTag,{value:"Module"}));export{n as A,e as I,q as L,o as N,a as W,r as a};
