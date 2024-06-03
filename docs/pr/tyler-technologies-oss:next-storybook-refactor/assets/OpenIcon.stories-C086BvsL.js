import{x as m}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{c as x,g as b,s as f}from"./constants-DsWS7qYA.js";import"./expansion-panel-BnVoTait.js";const n="forge-open-icon",v={title:"Components/Open Icon",render:g=>x(n,g),component:n,parameters:{actions:{disable:!0}},argTypes:{...b({tagName:n,controls:{orientation:{type:"string",control:"select",options:["vertical","horizontal","vertical-half","horizontal-half"]},rotation:{type:"string",control:"select",options:["full","half"]}}})},args:{orientation:"vertical"}},e={},o={...f,render:()=>m`
    <forge-open-icon orientation="horizontal"></forge-open-icon>
    `},r={...f,render:()=>m`
    <forge-expansion-panel>
      <div role="button" tabindex="0" slot="header" style="display: flex; justify-content: space-between; align-items: center;">
        <div>Expansion panel</div>
        <forge-open-icon></forge-open-icon>
      </div>
      <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum error officia iure corporis veritatis ut quod quo libero ea repellendus, consequuntur porro explicabo exercitationem minus pariatur debitis nihil at labore!</div>
    </forge-expansion-panel>
    `};var t,a,i;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:"{}",...(i=(a=e.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};var s,p,l;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
    <forge-open-icon orientation="horizontal"></forge-open-icon>
    \`;
  }
}`,...(l=(p=o.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var c,d,u;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
    <forge-expansion-panel>
      <div role="button" tabindex="0" slot="header" style="display: flex; justify-content: space-between; align-items: center;">
        <div>Expansion panel</div>
        <forge-open-icon></forge-open-icon>
      </div>
      <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum error officia iure corporis veritatis ut quod quo libero ea repellendus, consequuntur porro explicabo exercitationem minus pariatur debitis nihil at labore!</div>
    </forge-expansion-panel>
    \`;
  }
}`,...(u=(d=r.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};const y=["Demo","Horizontal","ExpansionPanel"],q=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,ExpansionPanel:r,Horizontal:o,__namedExportsOrder:y,default:v},Symbol.toStringTag,{value:"Module"}));export{e as D,r as E,o as H,q as O};
