import{x as t}from"./iframe-DqfrXlUn.js";import{g as s,c as p,s as a}from"./utils-CNsITwyF.js";import"./service-adapter-CffG5Lhq.js";import"./expansion-panel-BVSc4qx-.js";import"./index-5CPwzmQS.js";const n="forge-open-icon",l={title:"Components/Open Icon",render:i=>p(n,i),component:n,parameters:{actions:{disable:!0}},argTypes:{...s({tagName:n,controls:{orientation:{type:"string",control:"select",options:["vertical","horizontal","vertical-half","horizontal-half"]},rotation:{type:"string",control:"select",options:["full","half"]}}})},args:{orientation:"vertical"}},e={},o={...a,render:()=>t` <forge-open-icon orientation="horizontal"></forge-open-icon> `},r={...a,render:()=>t`
      <forge-expansion-panel>
        <div role="button" tabindex="0" slot="header" style="display: flex; justify-content: space-between; align-items: center;">
          <div>Expansion panel</div>
          <forge-open-icon></forge-open-icon>
        </div>
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum error officia iure corporis veritatis ut quod quo libero ea repellendus, consequuntur
          porro explicabo exercitationem minus pariatur debitis nihil at labore!
        </div>
      </forge-expansion-panel>
    `};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\` <forge-open-icon orientation="horizontal"></forge-open-icon> \`;
  }
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
      <forge-expansion-panel>
        <div role="button" tabindex="0" slot="header" style="display: flex; justify-content: space-between; align-items: center;">
          <div>Expansion panel</div>
          <forge-open-icon></forge-open-icon>
        </div>
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum error officia iure corporis veritatis ut quod quo libero ea repellendus, consequuntur
          porro explicabo exercitationem minus pariatur debitis nihil at labore!
        </div>
      </forge-expansion-panel>
    \`;
  }
}`,...r.parameters?.docs?.source}}};const c=["Demo","Horizontal","ExpansionPanel"],x=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,ExpansionPanel:r,Horizontal:o,__namedExportsOrder:c,default:l},Symbol.toStringTag,{value:"Module"}));export{e as D,r as E,o as H,x as O};
