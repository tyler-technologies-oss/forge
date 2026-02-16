import{I as f,d}from"./tyler-icons-CBdZU-Tr.js";import{b as e}from"./iframe-B5XvQRU6.js";import{e as b}from"./class-map-IsaJv0mY.js";import"./service-adapter-CffG5Lhq.js";import"./checkbox-CaYb8270.js";import"./index-DTwfV0k0.js";import"./icon-button-CZj7QIrK.js";import"./focus-indicator-BCZS7QTD.js";import"./state-layer-DGD4bZzf.js";import"./label-BZ12QAw3.js";import"./button-Bm8BiMvu.js";import"./button-toggle-group-CMqjJA2E.js";import"./switch-Bz-qPRzf.js";import{s}from"./decorators-D96Mc7ku.js";const m="forge-label";f.define(d);const p={title:"Components/Label",component:m,decorators:[s(`
    .align {
      display: flex;
      align-items: center;
    }
  `)],parameters:{controls:{disable:!0},actions:{disable:!0}}},o={render:()=>e`
    <div class="align">
      <forge-label for="my-checkbox">Label</forge-label>
      <forge-checkbox id="my-checkbox"></forge-checkbox>
    </div>
  `},r={render:()=>e`
    <forge-label class="align">
      <span>Label</span>
      <forge-checkbox></forge-checkbox>
    </forge-label>
  `},a={render:()=>e`
    <forge-radio-group class="align">
      <forge-label legend>Choose an option</forge-label>
      <forge-radio name="default">Option 1</forge-radio>
      <forge-radio name="default">Option 2</forge-radio>
      <forge-radio name="default">Option 3</forge-radio>
    </forge-radio-group>
  `},n={decorators:[s(`
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
    `}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <div class="align">
      <forge-label for="my-checkbox">Label</forge-label>
      <forge-checkbox id="my-checkbox"></forge-checkbox>
    </div>
  \`
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <forge-label class="align">
      <span>Label</span>
      <forge-checkbox></forge-checkbox>
    </forge-label>
  \`
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <forge-radio-group class="align">
      <forge-label legend>Choose an option</forge-label>
      <forge-radio name="default">Option 1</forge-radio>
      <forge-radio name="default">Option 2</forge-radio>
      <forge-radio name="default">Option 3</forge-radio>
    </forge-radio-group>
  \`
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
  render: () => html\`
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
  \`
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  decorators: [storyStyles(\`
    .with-label {
      display: inline-flex;
      align-items: center;
      flex-direction: column;
    }
  \`)],
  render: () => html\`
    <forge-label class="with-label">
      <forge-icon-button>
        <forge-icon name="settings"></forge-icon>
      </forge-icon-button>
      <span>Settings</span>
    </forge-label>
  \`
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
}`,...t.parameters?.docs?.source}}};const h=["IDAssociated","Nested","Legend","AlignedList","WithIconButton","CSSOnly"],N=Object.freeze(Object.defineProperty({__proto__:null,AlignedList:n,CSSOnly:t,IDAssociated:o,Legend:a,Nested:r,WithIconButton:l,__namedExportsOrder:h,default:p},Symbol.toStringTag,{value:"Module"}));export{n as A,t as C,o as I,N as L,r as N,l as W,a};
