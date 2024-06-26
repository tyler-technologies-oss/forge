import{x as f}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{c as h,g as y,s as x,G as v}from"./utils-Dtr3SQvK.js";import"./constants-ngK8be3i.js";import{I as Q}from"./icon-DHVNhAh1.js";import"./index-Dh0vMUMR.js";import{n as S}from"./index-CIZ3m0iD.js";import"./inline-message-BC1NC9bN.js";const s="forge-inline-message";Q.define(S);const I={title:"Components/Inline Message",render:o=>{const a=h(s,o);return a.textContent=o.text,a},component:s,parameters:{actions:{disable:!0}},argTypes:{...y({tagName:s,controls:{theme:{control:{type:"select"},options:v}}})},args:{text:"Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation."}},e={},n={...x,render:({text:o})=>f`
      <forge-inline-message>
        <span slot="title">Lorem Ipsum</span>
        <p>${o}</p>
      </forge-inline-message>
    `},i={...x,render:()=>f`
      <div style="display: flex; gap: 16px; flex-direction: column">
        <forge-inline-message theme="error">
          <forge-icon slot="icon" name="info"></forge-icon>
          <p>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</p>
        </forge-inline-message>

        <forge-inline-message theme="warning">
          <forge-icon slot="icon" name="info"></forge-icon>
          <p>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</p>
        </forge-inline-message>

        <forge-inline-message theme="success">
          <forge-icon slot="icon" name="info"></forge-icon>
          <p>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</p>
        </forge-inline-message>

        <forge-inline-message theme="info">
          <forge-icon slot="icon" name="info"></forge-icon>
          <p>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</p>
        </forge-inline-message>

        <forge-inline-message theme="info-secondary">
          <forge-icon slot="icon" name="info"></forge-icon>
          <p>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</p>
        </forge-inline-message>
      </div>
    `};var r,t,m;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:"{}",...(m=(t=e.parameters)==null?void 0:t.docs)==null?void 0:m.source}}};var d,c,g;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: ({
    text
  }) => {
    return html\`
      <forge-inline-message>
        <span slot="title">Lorem Ipsum</span>
        <p>\${text}</p>
      </forge-inline-message>
    \`;
  }
}`,...(g=(c=n.parameters)==null?void 0:c.docs)==null?void 0:g.source}}};var l,p,u;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
      <div style="display: flex; gap: 16px; flex-direction: column">
        <forge-inline-message theme="error">
          <forge-icon slot="icon" name="info"></forge-icon>
          <p>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</p>
        </forge-inline-message>

        <forge-inline-message theme="warning">
          <forge-icon slot="icon" name="info"></forge-icon>
          <p>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</p>
        </forge-inline-message>

        <forge-inline-message theme="success">
          <forge-icon slot="icon" name="info"></forge-icon>
          <p>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</p>
        </forge-inline-message>

        <forge-inline-message theme="info">
          <forge-icon slot="icon" name="info"></forge-icon>
          <p>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</p>
        </forge-inline-message>

        <forge-inline-message theme="info-secondary">
          <forge-icon slot="icon" name="info"></forge-icon>
          <p>Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.</p>
        </forge-inline-message>
      </div>
    \`;
  }
}`,...(u=(p=i.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};const T=["Demo","WithTitle","Themed"],D=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,Themed:i,WithTitle:n,__namedExportsOrder:T,default:I},Symbol.toStringTag,{value:"Module"}));export{e as D,D as I,i as T,n as W};
