import{I as A}from"./icon-D5yjdXv8.js";import{c as T}from"./index-RsKXMDm2.js";import"./lit-element-CYrSCkDY.js";import{x as e}from"./lit-html-CuBe1DX_.js";import{e as N}from"./class-map-CuXcqkpw.js";import"./feature-detection-CY6TVbRZ.js";import"./checkbox-DwEe44-q.js";import"./index-CiLSBptl.js";import"./icon-button-4fx-LScl.js";import"./focus-indicator-NbLDNrYT.js";import"./state-layer-sxQMIn2c.js";import"./label-BYO0DIp3.js";import"./button-CutPPNni.js";import"./button-toggle-group-C9JpSiFv.js";import"./switch-Clw9p9oC.js";import{s}from"./decorators-CS5VvIVh.js";const W="forge-label";A.define(T);const j={title:"Components/Label",component:W,decorators:[s(`
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
    `},t={parameters:{controls:{include:["block","large"]}},args:{block:!1,large:!1},render:({block:L,large:C})=>{const _=N({"forge-label":!0,"forge-label-block":L,"forge-label--large":C});return e`
      <label class=${_}>
        <span>Check me</span>
        <forge-checkbox></forge-checkbox>
      </label>
      <span class="forge-support-text">Support text</span>
    `}};var c,g,i;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => {
    return html\`
      <div class="align">
        <forge-label for="my-checkbox">Label</forge-label>
        <forge-checkbox id="my-checkbox"></forge-checkbox>
      </div>
    \`;
  }
}`,...(i=(g=r.parameters)==null?void 0:g.docs)==null?void 0:i.source}}};var f,d,b;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => {
    return html\`
      <forge-label class="align">
        <span>Label</span>
        <forge-checkbox></forge-checkbox>
      </forge-label>
    \`;
  }
}`,...(b=(d=o.parameters)==null?void 0:d.docs)==null?void 0:b.source}}};var m,p,u;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(u=(p=n.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var h,x,k;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(k=(x=a.parameters)==null?void 0:x.docs)==null?void 0:k.source}}};var y,S,I;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(I=(S=l.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};var w,v,O;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(O=(v=t.parameters)==null?void 0:v.docs)==null?void 0:O.source}}};const B=["IDAssociated","Nested","Legend","AlignedList","WithIconButton","CSSOnly"],X=Object.freeze(Object.defineProperty({__proto__:null,AlignedList:a,CSSOnly:t,IDAssociated:r,Legend:n,Nested:o,WithIconButton:l,__namedExportsOrder:B,default:j},Symbol.toStringTag,{value:"Module"}));export{a as A,t as C,r as I,X as L,o as N,l as W,n as a};
