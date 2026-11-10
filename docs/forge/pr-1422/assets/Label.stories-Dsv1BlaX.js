import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-CbV23-8Y.js";import{t as i}from"./class-map-DEew1OiS.js";import{t as a}from"./class-map-8zp5OV2u.js";import{o,t as s}from"./icon-DTOjPWy9.js";import{en as c,t as l}from"./tyler-icons-kuH1S-j5.js";import{t as u}from"./icon-button-D4UjEleU.js";import{n as d,t as f}from"./decorators--PUUPG6T.js";import{t as p}from"./label-CeVuqqtG.js";import{t as m}from"./checkbox-D4Wj087h.js";var h=t({AlignedList:()=>x,CSSOnly:()=>C,IDAssociated:()=>v,Legend:()=>b,Nested:()=>y,WithIconButton:()=>S,__namedExportsOrder:()=>w,default:()=>_}),g,_,v,y,b,x,S,C,w;function T(){return(T=e((()=>{s(),l(),r(),a(),m(),u(),p(),f(),g=`forge-label`,o.define(c),_={title:`Components/Label`,component:g,decorators:[d(`
    .align {
      display: flex;
      align-items: center;
    }
  `)],parameters:{controls:{disable:!0},actions:{disable:!0}}},v={render:()=>n`
    <div class="align">
      <forge-label for="my-checkbox">Label</forge-label>
      <forge-checkbox id="my-checkbox"></forge-checkbox>
    </div>
  `},y={render:()=>n`
    <forge-label class="align">
      <span>Label</span>
      <forge-checkbox></forge-checkbox>
    </forge-label>
  `},b={render:()=>n`
    <forge-radio-group class="align">
      <forge-label legend>Choose an option</forge-label>
      <forge-radio name="default">Option 1</forge-radio>
      <forge-radio name="default">Option 2</forge-radio>
      <forge-radio name="default">Option 3</forge-radio>
    </forge-radio-group>
  `},x={decorators:[d(`
    .grid {
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      width: fit-content;

      forge-label {
        width: 100%;
      }
    }
  `)],render:()=>n`
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
  `},S={decorators:[d(`
    .with-label {
      display: inline-flex;
      align-items: center;
      flex-direction: column;
    }
  `)],render:()=>n`
    <forge-label class="with-label">
      <forge-icon-button>
        <forge-icon name="settings"></forge-icon>
      </forge-icon-button>
      <span>Settings</span>
    </forge-label>
  `},C={parameters:{controls:{include:[`block`,`large`]}},args:{block:!1,large:!1},render:({block:e,large:t})=>{let r=i({"forge-label":!0,"forge-label-block":e,"forge-label--large":t});return n`
      <label class=${r}>
        <span>Check me</span>
        <forge-checkbox></forge-checkbox>
      </label>
      <span class="forge-support-text">Support text</span>
    `}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <div class="align">
      <forge-label for="my-checkbox">Label</forge-label>
      <forge-checkbox id="my-checkbox"></forge-checkbox>
    </div>
  \`
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <forge-label class="align">
      <span>Label</span>
      <forge-checkbox></forge-checkbox>
    </forge-label>
  \`
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <forge-radio-group class="align">
      <forge-label legend>Choose an option</forge-label>
      <forge-radio name="default">Option 1</forge-radio>
      <forge-radio name="default">Option 2</forge-radio>
      <forge-radio name="default">Option 3</forge-radio>
    </forge-radio-group>
  \`
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w=[`IDAssociated`,`Nested`,`Legend`,`AlignedList`,`WithIconButton`,`CSSOnly`]})))()}export{b as a,T as c,h as i,C as n,y as o,v as r,S as s,x as t};