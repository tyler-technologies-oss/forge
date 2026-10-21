import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-CuAvrKn_.js";import{_ as a,l as o,m as s,n as c,o as l,s as u}from"./utils-Cppiha4b.js";import{o as d,t as f}from"./icon-DzM2_TPc.js";import{_t as p,t as m}from"./tyler-icons-CLXzO0Q_.js";import{r as h,t as g}from"./style-map-C_WKUe4Y.js";import{t as _}from"./inline-message-BmqUEiuD.js";var v=t({CSSOnly:()=>w,Demo:()=>x,Themed:()=>C,WithTitle:()=>S,__namedExportsOrder:()=>T,default:()=>b}),y,b,x,S,C,w,T;function E(){return(E=e((()=>{i(),s(),f(),m(),g(),_(),y=`forge-inline-message`,d.define(p),b={title:`Components/Inline Message`,render:e=>{let t=l(y,e);return t.textContent=e.text,t},component:y,parameters:{actions:{disable:!0}},argTypes:{...u({tagName:y,controls:{theme:{control:{type:`select`},options:c}}})},args:{text:`Qui nulla anim sunt eiusmod eiusmod id esse veniam proident ea adipisicing ad exercitation.`}},x={},S={...a,render:({text:e})=>n`
    <forge-inline-message>
      <span slot="title">Lorem Ipsum</span>
      <p>${e}</p>
    </forge-inline-message>
  `},C={...a,render:()=>n`
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
  `},w={parameters:{controls:{include:/^--|text|withIcon/}},args:{withIcon:!1},render:({text:e,withIcon:t,...i})=>{let a=o(i),s=a?h(a):r;return n`
      <div class="forge-inline-message" style=${s}>
        ${t?n`<svg class="forge-icon forge-inline-message__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>`:r}
        <div class="forge-inline-message__title">Title</div>
        <div>${e}</div>
      </div>
    `}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: ({
    text
  }) => html\`
    <forge-inline-message>
      <span slot="title">Lorem Ipsum</span>
      <p>\${text}</p>
    </forge-inline-message>
  \`
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},T=[`Demo`,`WithTitle`,`Themed`,`CSSOnly`]})))()}export{S as a,C as i,x as n,E as o,v as r,w as t};