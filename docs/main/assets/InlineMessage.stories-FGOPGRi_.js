import"./lit-element-CgJqSpuc.js";import{x as r,E as l}from"./lit-html-paDGiEfB.js";import{c as Q,g as C,s as I,b as z,G as M}from"./utils-BotWY70o.js";import"./constants-CFf81ck9.js";import{I as A}from"./icon-FszQmWVN.js";import"./index-BmocOEUj.js";import{n as O}from"./index-ByifSpfC.js";import{o as V}from"./style-map-C9nPWcxA.js";import"./inline-message-CWU9IALL.js";const t="forge-inline-message";A.define(O);const $={title:"Components/Inline Message",render:e=>{const a=Q(t,e);return a.textContent=e.text,a},component:t,parameters:{actions:{disable:!0}},argTypes:{...C({tagName:t,controls:{theme:{control:{type:"select"},options:M}}})},args:{text:"Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation."}},n={},i={...I,render:({text:e})=>r`
      <forge-inline-message>
        <span slot="title">Lorem Ipsum</span>
        <p>${e}</p>
      </forge-inline-message>
    `},s={...I,render:()=>r`
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
    `},o={parameters:{controls:{include:/^--|text|withIcon/}},args:{withIcon:!1},render:({text:e,withIcon:a,..._})=>{const m=z(_),T=m?V(m):l;return r`
      <div class="forge-inline-message" style=${T}>
        ${a?r`<svg class="forge-icon forge-inline-message__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>`:l}
        <div class="forge-inline-message__title">Title</div>
        <div>${e}</div>
      </div>
    `}};var g,c,d;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:"{}",...(d=(c=n.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var p,u,f;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(f=(u=i.parameters)==null?void 0:u.docs)==null?void 0:f.source}}};var v,h,x;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(x=(h=s.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var y,w,S;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(S=(w=o.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};const b=["Demo","WithTitle","Themed","CSSOnly"],N=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:o,Demo:n,Themed:s,WithTitle:i,__namedExportsOrder:b,default:$},Symbol.toStringTag,{value:"Module"}));export{o as C,n as D,N as I,s as T,i as W};
