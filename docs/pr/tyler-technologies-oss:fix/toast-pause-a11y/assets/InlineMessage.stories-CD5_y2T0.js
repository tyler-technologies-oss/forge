import{x as r,E as l}from"./iframe-D_kG7m72.js";import{g as p,s as g,G as u,c as f,a as v}from"./utils-SiGUGHhj.js";import"./service-adapter-CffG5Lhq.js";import{I as h,s as x}from"./icon-kuXwuZAY.js";import"./index-5CPwzmQS.js";import{o as y}from"./style-map-a9Ce98P3.js";import"./inline-message-e4Sp2zCL.js";const t="forge-inline-message";h.define(x);const w={title:"Components/Inline Message",render:e=>{const a=f(t,e);return a.textContent=e.text,a},component:t,parameters:{actions:{disable:!0}},argTypes:{...p({tagName:t,controls:{theme:{control:{type:"select"},options:u}}})},args:{text:"Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation."}},n={},i={...g,render:({text:e})=>r`
      <forge-inline-message>
        <span slot="title">Lorem Ipsum</span>
        <p>${e}</p>
      </forge-inline-message>
    `},s={...g,render:()=>r`
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
    `},o={parameters:{controls:{include:/^--|text|withIcon/}},args:{withIcon:!1},render:({text:e,withIcon:a,...c})=>{const m=v(c),d=m?y(m):l;return r`
      <div class="forge-inline-message" style=${d}>
        ${a?r`<svg class="forge-icon forge-inline-message__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>`:l}
        <div class="forge-inline-message__title">Title</div>
        <div>${e}</div>
      </div>
    `}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"{}",...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: /^--|text|withIcon/
    }
  },
  args: {
    withIcon: false
  },
  render: ({
    text,
    withIcon,
    ...args
  }) => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    return html\`
      <div class="forge-inline-message" style=\${style}>
        \${withIcon ? html\`<svg class="forge-icon forge-inline-message__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>\` : nothing}
        <div class="forge-inline-message__title">Title</div>
        <div>\${text}</div>
      </div>
    \`;
  }
}`,...o.parameters?.docs?.source}}};const S=["Demo","WithTitle","Themed","CSSOnly"],A=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:o,Demo:n,Themed:s,WithTitle:i,__namedExportsOrder:S,default:w},Symbol.toStringTag,{value:"Module"}));export{o as C,n as D,A as I,s as T,i as W};
