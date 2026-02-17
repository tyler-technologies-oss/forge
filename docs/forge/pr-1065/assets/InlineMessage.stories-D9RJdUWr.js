import{A as l,b as r}from"./iframe-BZH4nlqj.js";import{s as g,b as p,g as u,c as f,G as v}from"./utils-Cntew3lg.js";import"./service-adapter-CffG5Lhq.js";import{I as h,s as x}from"./tyler-icons-CBdZU-Tr.js";import"./index-DTwfV0k0.js";import{o as y}from"./style-map-CtAn6EL2.js";import"./inline-message-kV-z6eDt.js";const t="forge-inline-message";h.define(x);const w={title:"Components/Inline Message",render:e=>{const a=f(t,e);return a.textContent=e.text,a},component:t,parameters:{actions:{disable:!0}},argTypes:{...u({tagName:t,controls:{theme:{control:{type:"select"},options:v}}})},args:{text:"Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation."}},n={},i={...g,render:({text:e})=>r`
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
  `},o={parameters:{controls:{include:/^--|text|withIcon/}},args:{withIcon:!1},render:({text:e,withIcon:a,...c})=>{const m=p(c),d=m?y(m):l;return r`
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
  }) => html\`
    <forge-inline-message>
      <span slot="title">Lorem Ipsum</span>
      <p>\${text}</p>
    </forge-inline-message>
  \`
}`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
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
  \`
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
}`,...o.parameters?.docs?.source}}};const S=["Demo","WithTitle","Themed","CSSOnly"],M=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:o,Demo:n,Themed:s,WithTitle:i,__namedExportsOrder:S,default:w},Symbol.toStringTag,{value:"Module"}));export{o as C,n as D,M as I,s as T,i as W};
