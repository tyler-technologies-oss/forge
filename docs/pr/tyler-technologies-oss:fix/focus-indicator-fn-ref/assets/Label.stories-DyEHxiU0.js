import{I as f,c as d}from"./icon-kuXwuZAY.js";import{x as e}from"./iframe-DhhXTQKZ.js";import{e as b}from"./class-map-BTQG__GG.js";import"./service-adapter-CffG5Lhq.js";import"./checkbox-1O6NCaxN.js";import"./index-5CPwzmQS.js";import"./icon-button-xusnSt9i.js";import"./focus-indicator-qzjj8NA2.js";import"./state-layer-gAgMwMHF.js";import"./label-BWkMCoLl.js";import"./button-BFRc56Z0.js";import"./button-toggle-group-CQH7gGy1.js";import"./switch-D8X9vPwv.js";import{s}from"./decorators-BrcrxnMY.js";const m="forge-label";f.define(d);const p={title:"Components/Label",component:m,decorators:[s(`
    .align {
      display: flex;
      align-items: center;
    }
  `)],parameters:{controls:{disable:!0},actions:{disable:!0}}},r={render:()=>e`
      <div class="align">
        <forge-label for="my-checkbox">Label</forge-label>
        <forge-checkbox id="my-checkbox"></forge-checkbox>
      </div>
    `},o={render:()=>e`
      <forge-label class="align">
        <span>Label</span>
        <forge-checkbox></forge-checkbox>
      </forge-label>
    `},n={render:()=>e`
      <forge-radio-group class="align">
        <forge-label legend>Choose an option</forge-label>
        <forge-radio name="default">Option 1</forge-radio>
        <forge-radio name="default">Option 2</forge-radio>
        <forge-radio name="default">Option 3</forge-radio>
      </forge-radio-group>
    `},a={decorators:[s(`
    .grid {
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      width: fit-content;

      forge-label {
        width: 100%;
      }
    }
  `)],render:()=>e`
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
    `},l={decorators:[s(`
    .with-label {
      display: inline-flex;
      align-items: center;
      flex-direction: column;
    }
  `)],render:()=>e`
      <forge-label class="with-label">
        <forge-icon-button>
          <forge-icon name="settings"></forge-icon>
        </forge-icon-button>
        <span>Settings</span>
      </forge-label>
    `},t={parameters:{controls:{include:["block","large"]}},args:{block:!1,large:!1},render:({block:c,large:g})=>{const i=b({"forge-label":!0,"forge-label-block":c,"forge-label--large":g});return e`
      <label class=${i}>
        <span>Check me</span>
        <forge-checkbox></forge-checkbox>
      </label>
      <span class="forge-support-text">Support text</span>
    `}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => {
    return html\`
      <div class="align">
        <forge-label for="my-checkbox">Label</forge-label>
        <forge-checkbox id="my-checkbox"></forge-checkbox>
      </div>
    \`;
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => {
    return html\`
      <forge-label class="align">
        <span>Label</span>
        <forge-checkbox></forge-checkbox>
      </forge-label>
    \`;
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['block', 'large']
    }
  },
  args: {
    block: false,
    large: false
  },
  render: ({
    block,
    large
  }) => {
    const classes = classMap({
      'forge-label': true,
      'forge-label-block': block,
      'forge-label--large': large
    });
    return html\`
      <label class=\${classes}>
        <span>Check me</span>
        <forge-checkbox></forge-checkbox>
      </label>
      <span class="forge-support-text">Support text</span>
    \`;
  }
}`,...t.parameters?.docs?.source}}};const u=["IDAssociated","Nested","Legend","AlignedList","WithIconButton","CSSOnly"],N=Object.freeze(Object.defineProperty({__proto__:null,AlignedList:a,CSSOnly:t,IDAssociated:r,Legend:n,Nested:o,WithIconButton:l,__namedExportsOrder:u,default:p},Symbol.toStringTag,{value:"Module"}));export{a as A,t as C,r as I,N as L,o as N,l as W,n as a};
